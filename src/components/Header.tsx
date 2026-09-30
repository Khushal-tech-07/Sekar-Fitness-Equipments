import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  FileText, 
  Phone, 
  ChevronDown,
  Dumbbell,
  LogIn,
  UserPlus,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  totalCartItems: number;
  totalEstimatedAmount: number;
  onOpenCart: () => void;
  onOpenEnquiries: () => void;
  onOpenFirebaseInfo?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalCartItems,
  totalEstimatedAmount,
  onOpenCart,
  onOpenEnquiries
}) => {
  const { 
    user, 
    loading, 
    signInWithGoogle, 
    logout, 
    openAuthModal 
  } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Catalog', href: '#catalog' },
    { label: 'Combos', href: '#combos' },
    { label: 'Benches & Racks', href: '#benches-machines' },
    { label: 'Factory Video', href: '#video-tour' },
    { label: 'Showroom & Location', href: '#location' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 transition-all">
      {/* Top Announcement Bar for Critical Policies */}
      <div className="bg-amber-500 text-zinc-950 text-xs font-semibold px-4 py-1.5 flex flex-wrap items-center justify-between tracking-wide">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="font-bold uppercase tracking-wider text-[11px] bg-zinc-950 text-amber-400 px-1.5 py-0.5 rounded">
            Chennai Factory
          </span>
          <span className="truncate">
            Direct Factory Prices · 100% Advance Payment Required for Dispatch · Transportation Cost Extra
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs font-mono-num font-bold">
          <a 
            href="https://wa.me/916381914335?text=Hello%20Sekar%20Fitness%2C%20I%20am%20inquiring%20about%20gym%20equipment%20from%20your%20website" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 hover:text-black transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>+91 63819 14335</span>
          </a>
        </div>
      </div>

      {/* Main 3-Zone Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="flex items-center gap-2.5 text-zinc-100 hover:text-white group shrink-0">
          <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-zinc-950 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Dumbbell className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white leading-tight">
              SEKAR <span className="text-amber-400 font-bold">FITNESS</span>
            </span>
            <span className="text-[10px] text-zinc-400 font-medium tracking-wider uppercase">
              Equipments · Chennai
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-zinc-300">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Cart Drawer Action & Firebase Login / Sign In Options */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Cart / Estimate Drawer Trigger Button */}
          <button
            onClick={onOpenCart}
            aria-label="View Quotation Cart"
            className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-100 transition-all hover:border-amber-500/50"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <div className="flex items-center gap-1 text-xs font-semibold">
              <span className="hidden sm:inline text-zinc-400">Estimate:</span>
              <span className="font-mono-num text-amber-400 font-bold">
                ₹{totalEstimatedAmount.toLocaleString('en-IN')}
              </span>
            </div>
            {totalCartItems > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-zinc-950 text-[11px] font-bold flex items-center justify-center font-mono-num">
                {totalCartItems}
              </span>
            )}
          </button>

          {/* REAL FIREBASE AUTH CONTROLS */}
          {loading ? (
            <div className="w-20 h-9 rounded-lg bg-zinc-800 animate-pulse" />
          ) : user ? (
            /* Logged in state: User Avatar + Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pl-2 pr-2.5 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-amber-500/60 transition-colors text-left"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User Profile'}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-amber-500/50"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center font-bold text-xs">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-semibold text-zinc-200 max-w-[90px] truncate leading-tight">
                    {user.displayName?.split(' ')[0] || user.email?.split('@')[0]}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-zinc-900 border border-zinc-700 shadow-2xl p-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-zinc-800 mb-1">
                    <p className="font-semibold text-zinc-100 truncate">{user.displayName || 'Customer'}</p>
                    <p className="text-zinc-400 truncate text-[11px]">{user.email || 'No email associated'}</p>
                    <div className="mt-1 flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>{user.providerId === 'google.com' ? 'Google Authenticated' : 'Firebase Email Account'}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onOpenEnquiries();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-800 hover:text-amber-400 text-left transition-colors"
                  >
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>My Past Enquiries & Quotes</span>
                  </button>

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 text-left transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Logged Out: Real Login & Sign In Options */
            <div className="flex items-center gap-1.5">
              
              {/* Option 1: Log In (Email/Password or Account) */}
              <button
                onClick={() => openAuthModal('signin')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold transition-all active:scale-95"
              >
                <LogIn className="w-3.5 h-3.5 text-zinc-400" />
                <span>Log In</span>
              </button>

              {/* Option 2: Sign Up / Register */}
              <button
                onClick={() => openAuthModal('signup')}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-semibold transition-all active:scale-95"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </button>

              {/* Option 3: Google One-Click Sign In Button */}
              <button
                onClick={() => signInWithGoogle()}
                title="Sign in instantly with Google"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-zinc-100 text-zinc-900 text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.97 0 12s.46 3.83 1.26 5.42l4.02-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span className="hidden lg:inline">Sign In with Google</span>
                <span className="lg:hidden">Google</span>
              </button>

            </div>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-zinc-800 bg-zinc-950 px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-amber-400"
            >
              {link.label}
            </a>
          ))}

          {/* Mobile Auth actions if logged out */}
          {!user && (
            <div className="pt-2 border-t border-zinc-800 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('signin');
                }}
                className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-semibold text-zinc-200"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('signup');
                }}
                className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-amber-500 text-zinc-950 text-xs font-bold"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register</span>
              </button>
            </div>
          )}

          <div className="pt-2 border-t border-zinc-800 flex flex-col gap-2">
            <a
              href="https://wa.me/916381914335?text=Hello%20Sekar%20Fitness%2C%20I%20want%20to%20place%20an%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp Factory Line: +91 63819 14335</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
