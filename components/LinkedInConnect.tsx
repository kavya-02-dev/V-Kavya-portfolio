'use client';

import { useState } from 'react';

interface LinkedInUser {
  name: string;
  picture?: string;
  headline?: string;
}

export default function LinkedInConnect() {
  const [user, setUser] = useState<LinkedInUser | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState<'prompt' | 'consent' | 'welcome'>('prompt');

  // Simulate the ethical LinkedIn OAuth flow
  // In production: redirect to /api/auth/linkedin which handles real OAuth
  const handleConnect = () => {
    setStep('consent');
    setShowModal(true);
  };

  const handleAllow = () => {
    // Redirect to LinkedIn profile — the honest, ethical approach
    // Real LinkedIn Login requires a registered app at LinkedIn Developer Portal
    window.open('https://www.linkedin.com/in/kavya-v-02u', '_blank', 'noopener,noreferrer');
    setStep('welcome');
    setUser({ name: 'Visitor', headline: 'Thanks for connecting!' });
    setTimeout(() => setShowModal(false), 4000);
  };

  const handleCancel = () => {
    setShowModal(false);
    setStep('prompt');
  };

  return (
    <>
      {/* The Connect Button */}
      <button
        onClick={handleConnect}
        className="group flex items-center gap-3 px-6 py-3.5 rounded-xl border border-[#0a66c2]/40 bg-[#0a66c2]/10 hover:bg-[#0a66c2]/20 hover:border-[#0a66c2]/60 transition-all duration-300 hover:-translate-y-0.5"
      >
        {/* LinkedIn Icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#0a66c2">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.999 23.227 23.999 22.271V1.729C23.999.774 23.2 0 22.222 0h.003z"/>
        </svg>
        <div className="text-left">
          <div className="text-sm font-semibold text-white">Connect via LinkedIn</div>
          <div className="text-[10px] text-slate-400">View profile & connect</div>
        </div>
        <span className="ml-auto text-slate-500 group-hover:text-[#0a66c2] transition-colors text-sm">→</span>
      </button>

      {/* Consent Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-void/90 backdrop-blur-xl" onClick={handleCancel} />
          <div className="relative z-10 w-full max-w-sm glass-card rounded-2xl border border-white/10 overflow-hidden">

            {step === 'consent' && (
              <div>
                {/* LinkedIn header */}
                <div className="bg-[#0a66c2] px-6 py-4 flex items-center gap-3">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.999 23.227 23.999 22.271V1.729C23.999.774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-white font-semibold">LinkedIn</span>
                </div>

                <div className="p-6">
                  <h3 className="font-display font-bold text-white text-lg mb-1">Connect with Kavya V</h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    This will open Kavya's LinkedIn profile in a new tab where you can send a connection request directly.
                  </p>

                  {/* What happens */}
                  <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/8 space-y-2">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">What happens next</div>
                    {[
                      '✓ LinkedIn profile opens in new tab',
                      '✓ You can send a connection request',
                      '✓ No data collected without your consent',
                      '✓ LinkedIn controls all permissions',
                    ].map((s) => (
                      <div key={s} className="text-xs text-slate-300">{s}</div>
                    ))}
                  </div>

                  {/* Ethical notice */}
                  <div className="mb-5 p-3 rounded-lg bg-plasma/5 border border-plasma/20">
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      <span className="text-plasma">🔒 Ethical note:</span> This portfolio does not implement LinkedIn OAuth or collect your LinkedIn data. This button simply opens Kavya's profile for you to connect directly.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleCancel}
                      className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-slate-400 hover:border-white/20 hover:text-white transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAllow}
                      className="flex-1 py-2.5 rounded-xl font-semibold text-sm text-white transition-all"
                      style={{ background: '#0a66c2' }}
                    >
                      Open LinkedIn →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 'welcome' && (
              <div className="p-8 text-center">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="font-display text-xl font-bold text-white mb-2">Opening LinkedIn!</h3>
                <p className="text-slate-400 text-sm">Head over to the new tab to connect with Kavya.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
