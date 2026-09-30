import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut as firebaseSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  where 
} from 'firebase/firestore';
import { auth, db, googleProvider, isFirebaseConfigured } from '../firebase';
import { SavedEnquiry } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid,
      email: auth?.currentUser?.email,
      emailVerified: auth?.currentUser?.emailVerified,
      isAnonymous: auth?.currentUser?.isAnonymous,
      tenantId: auth?.currentUser?.tenantId,
      providerInfo: auth?.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface AppUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  emailVerified?: boolean;
  providerId?: string;
  isDemo?: boolean;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (name: string, email: string, pass: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  isFirebaseConfigured: boolean;
  savedEnquiries: SavedEnquiry[];
  saveEnquiry: (enquiry: Omit<SavedEnquiry, 'id' | 'timestamp' | 'dateStr' | 'userId' | 'userEmail'>) => Promise<SavedEnquiry>;
  removeEnquiry: (id: string) => Promise<void>;
  authError: string | null;
  clearAuthError: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: (initialMode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
  authModalMode: 'signin' | 'signup';
  setAuthModalMode: (mode: 'signin' | 'signup') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_ENQUIRIES_KEY = 'sekar_fitness_enquiries';

// Helper to format friendly error messages
export const getFriendlyAuthErrorMessage = (error: any): string => {
  const code = error?.code || '';
  switch (code) {
    case 'auth/user-not-found':
      return 'No account found with this email. Please check or sign up.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password. Please verify your credentials.';
    case 'auth/email-already-in-use':
      return 'This email address is already registered. Please log in instead.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in popup was closed before completing.';
    case 'auth/cancelled-popup-request':
      return 'Only one sign in window can be active at a time.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    default:
      return error?.message || 'Authentication failed. Please try again.';
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [savedEnquiries, setSavedEnquiries] = useState<SavedEnquiry[]>([]);

  // Modal control
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  const openAuthModal = (initialMode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(initialMode);
    setAuthError(null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthError(null);
  };

  // 1. Initial Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        const appUser: AppUser = {
          uid: fbUser.uid,
          displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Fitness Member',
          email: fbUser.email,
          photoURL: fbUser.photoURL,
          emailVerified: fbUser.emailVerified,
          providerId: fbUser.providerData[0]?.providerId || 'password',
          isDemo: false,
        };
        setUser(appUser);

        // Store or update profile in Firestore users collection
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          await setDoc(userDocRef, {
            userId: fbUser.uid,
            email: fbUser.email || '',
            displayName: appUser.displayName,
            photoURL: fbUser.photoURL || '',
            createdAt: new Date().toISOString()
          }, { merge: true });
        } catch (err) {
          console.warn('Could not sync user profile to Firestore:', err);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Real-time Enquiries Listener
  useEffect(() => {
    if (user && !user.isDemo) {
      const q = query(
        collection(db, 'enquiries'),
        where('userId', '==', user.uid)
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const remoteEnquiries: SavedEnquiry[] = [];
          snapshot.forEach((d) => {
            const data = d.data();
            remoteEnquiries.push({
              id: data.id || d.id,
              timestamp: data.timestamp || Date.now(),
              dateStr: data.dateStr || '',
              customerName: data.customerName || '',
              customerPhone: data.customerPhone || '',
              deliveryLocation: data.deliveryLocation || '',
              notes: data.notes || '',
              totalEstimatedAmount: data.totalEstimatedAmount || 0,
              userId: data.userId,
              userEmail: data.userEmail,
              items: data.items || []
            });
          });
          setSavedEnquiries(remoteEnquiries);
        },
        (error) => {
          console.error('Error fetching real-time enquiries:', error);
          // Fallback to local storage
          loadLocalEnquiries();
        }
      );

      return () => unsubscribe();
    } else {
      loadLocalEnquiries();
    }
  }, [user]);

  const loadLocalEnquiries = () => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_ENQUIRIES_KEY);
      if (stored) {
        setSavedEnquiries(JSON.parse(stored));
      } else {
        setSavedEnquiries([]);
      }
    } catch (e) {
      console.error('Error loading stored enquiries:', e);
    }
  };

  const persistLocalEnquiries = (updated: SavedEnquiry[]) => {
    setSavedEnquiries(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_ENQUIRIES_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error persisting enquiries locally:', e);
    }
  };

  // Sign In with Google Popup
  const signInWithGoogle = async () => {
    setAuthError(null);
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      closeAuthModal();
    } catch (error: any) {
      console.error('Google Sign In Error:', error);
      setAuthError(getFriendlyAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  // Sign In with Email and Password
  const signInWithEmail = async (email: string, pass: string) => {
    setAuthError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), pass);
      closeAuthModal();
    } catch (error: any) {
      console.error('Email Sign In Error:', error);
      setAuthError(getFriendlyAuthErrorMessage(error));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign Up / Register with Email and Password
  const signUpWithEmail = async (name: string, email: string, pass: string) => {
    setAuthError(null);
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      if (name.trim()) {
        await updateProfile(cred.user, {
          displayName: name.trim()
        });
      }
      closeAuthModal();
    } catch (error: any) {
      console.error('Email Sign Up Error:', error);
      setAuthError(getFriendlyAuthErrorMessage(error));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Password Reset Email
  const sendPasswordReset = async (email: string) => {
    setAuthError(null);
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
    } catch (error: any) {
      console.error('Password reset error:', error);
      setAuthError(getFriendlyAuthErrorMessage(error));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign Out
  const logout = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
    } catch (error: any) {
      console.error('Firebase Sign Out Error:', error);
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  // Save enquiry to Firestore and LocalStorage
  const saveEnquiry = async (
    enquiryData: Omit<SavedEnquiry, 'id' | 'timestamp' | 'dateStr' | 'userId' | 'userEmail'>
  ): Promise<SavedEnquiry> => {
    const now = new Date();
    const id = 'SFE-' + Math.floor(100000 + Math.random() * 900000);
    const dateStr = now.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newEnquiry: SavedEnquiry = {
      ...enquiryData,
      id,
      timestamp: Date.now(),
      dateStr,
      userId: user?.uid,
      userEmail: user?.email || undefined
    };

    // 1. Save to Firestore if user is logged in
    if (user?.uid) {
      try {
        const enquiryDocRef = doc(db, 'enquiries', id);
        await setDoc(enquiryDocRef, newEnquiry);
      } catch (err) {
        console.warn('Could not save enquiry to Firestore, caching locally:', err);
      }
    }

    // 2. Always persist locally as backup
    const updated = [newEnquiry, ...savedEnquiries.filter(e => e.id !== id)];
    persistLocalEnquiries(updated);

    return newEnquiry;
  };

  // Remove enquiry from Firestore & LocalStorage
  const removeEnquiry = async (id: string) => {
    if (user?.uid) {
      try {
        const enquiryDocRef = doc(db, 'enquiries', id);
        await deleteDoc(enquiryDocRef);
      } catch (err) {
        console.warn('Could not delete from Firestore:', err);
      }
    }
    const updated = savedEnquiries.filter(e => e.id !== id);
    persistLocalEnquiries(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        sendPasswordReset,
        logout,
        isFirebaseConfigured,
        savedEnquiries,
        saveEnquiry,
        removeEnquiry,
        authError,
        clearAuthError: () => setAuthError(null),
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode,
        setAuthModalMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
