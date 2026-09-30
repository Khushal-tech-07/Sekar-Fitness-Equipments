import React from 'react';
import { X, ShieldCheck, Terminal, Copy, Check, ExternalLink } from 'lucide-react';
import { isFirebaseConfigured } from '../firebase';

interface FirebaseSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FirebaseSetupModal: React.FC<FirebaseSetupModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const envSnippet = `# Firebase Web Configuration for Vercel / Vite
VITE_FIREBASE_API_KEY="AIzaSyYourFirebaseApiKey"
VITE_FIREBASE_AUTH_DOMAIN="your-app.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-app"
VITE_FIREBASE_STORAGE_BUCKET="your-app.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="1234567890"
VITE_FIREBASE_APP_ID="1:1234567890:web:abcdef123456"

# Next.js equivalents (if deploying as Next.js App)
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyYourFirebaseApiKey"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-app.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-app"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-app.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1234567890"
NEXT_PUBLIC_FIREBASE_APP_ID="1:1234567890:web:abcdef123456"`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(envSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 bg-zinc-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">
                Firebase & Vercel Deployment Configuration
              </h3>
              <p className="text-xs text-zinc-400">
                Setup guide for live Google Authentication and production hosting
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh] text-xs">
          
          {/* Status badge */}
          <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
            isFirebaseConfigured
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
              : 'bg-zinc-900 border-zinc-800 text-zinc-300'
          }`}>
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${isFirebaseConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="font-semibold">
                Status: {isFirebaseConfigured ? 'Live Firebase Client Configured' : 'Preview Mode (Demo Google Auth Active)'}
              </span>
            </div>
            {!isFirebaseConfigured && (
              <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-amber-400 font-mono">
                Safe Fallback Active
              </span>
            )}
          </div>

          {/* Steps for Vercel Deployment */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Vercel Deployment Checklist
            </h4>
            
            <ol className="space-y-2.5 text-zinc-300 list-decimal list-inside leading-relaxed">
              <li>
                <strong>Firebase Console:</strong> Create a project at{' '}
                <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">
                  console.firebase.google.com
                </a>
                . In <em>Authentication &gt; Sign-in method</em>, enable <strong>Google</strong>.
              </li>
              <li>
                <strong>Authorized Domains:</strong> Under Authentication Settings, add your Vercel project domain (e.g. <code>*.vercel.app</code>) to Authorized Domains.
              </li>
              <li>
                <strong>Environment Variables:</strong> In Vercel Project Settings &gt; Environment Variables, paste your Firebase config values shown below.
              </li>
            </ol>
          </div>

          {/* Environment Variable Box */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-zinc-400">
              <span className="font-mono text-[11px]">.env / Vercel Environment Variables</span>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 text-[11px] text-amber-400 hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Template'}</span>
              </button>
            </div>

            <pre className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[11px] overflow-x-auto leading-relaxed">
              {envSnippet}
            </pre>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
};
