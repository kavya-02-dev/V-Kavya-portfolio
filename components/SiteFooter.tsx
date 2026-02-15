'use client';
import { useState } from 'react';
import Link from 'next/link';
import { personalInfo } from '@/lib/data';

function LinkedInConnect() {
  const [modal, setModal] = useState(false);
  const [step, setStep] = useState<'consent'|'done'>('consent');

  const open = () => { setStep('consent'); setModal(true); };
  const allow = () => {
    window.open('https://www.linkedin.com/in/kavya-v-02u', '_blank', 'noopener,noreferrer');
    setStep('done');
    setTimeout(() => { setModal(false); setStep('consent'); }, 3500);
  };

  return (
    <>
      <button
        onClick={open}
        className="group flex items-center gap-3 px-6 py-3.5 rounded-xl border transition-all duration-300 hover:-translate-y-0.5"
        style={{ borderColor: 'rgba(10,102,194,0.4)', background: 'rgba(10,102,194,0.08)' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#0a66c2">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        <div className="text-left">
          <div className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">Connect via LinkedIn</div>
          <div className="text-[10px] text-slate-500">Opens Kavya's profile</div>
        </div>
        <span className="ml-auto text-slate-600 group-hover:text-blue-400 transition-colors text-xs">→</span>
      </button>

      {modal && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-void/90 backdrop-blur-xl" onClick={() => setModal(false)} />
          <div className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
            style={{ background: 'rgba(10,14,23,0.98)' }}>

            {step === 'consent' ? (
              <>
                {/* LinkedIn-style header */}
                <div className="px-6 py-4 flex items-center gap-3" style={{ background: '#0a66c2' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <div>
                    <div className="text-white font-semibold text-sm">LinkedIn</div>
                    <div className="text-blue-200 text-[10px]">kavya-v-02u</div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-display font-bold text-white text-lg mb-1">Connect with Kavya V</h3>
                  <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                    Send a connection request on LinkedIn. No data is collected by this portfolio — LinkedIn manages all permissions.
                  </p>

                  <div className="mb-5 p-4 rounded-xl bg-white/4 border border-white/8 space-y-2">
                    <div className="text-[9px] font-mono text-slate-600 uppercase tracking-wider mb-2">What happens</div>
                    {['✓ LinkedIn profile opens in new tab','✓ You send a connection request directly','✓ No data collected on this site','✓ LinkedIn controls all permissions'].map(s => (
                      <div key={s} className="text-xs text-slate-300">{s}</div>
                    ))}
                  </div>

                  <div className="mb-5 rounded-lg border border-plasma/20 p-3 bg-plasma/5">
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      <span className="text-plasma">🔒 Ethical note:</span> This portfolio does not implement LinkedIn OAuth or store your data. The button opens Kavya's public profile.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setModal(false)}
                      className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-slate-400 hover:border-white/20 hover:text-white transition-all">
                      Cancel
                    </button>
                    <button onClick={allow}
                      className="flex-1 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:brightness-110"
                      style={{ background: '#0a66c2' }}>
                      Open LinkedIn →
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-10 text-center">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="font-display text-xl font-bold text-white mb-2">Opening LinkedIn!</h3>
                <p className="text-slate-400 text-sm">Head to the new tab and hit Connect.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default function SiteFooter() {
  const socials = [
    { href: personalInfo.linkedin, icon: '💼', label: 'LinkedIn' },
    { href: personalInfo.github, icon: '💻', label: 'GitHub' },
    { href: personalInfo.leetcode, icon: '⚡', label: 'LeetCode' },
    { href: personalInfo.credly, icon: '🏅', label: 'Credly' },
    { href: `mailto:${personalInfo.email}`, icon: '📧', label: 'Email' },
  ];

  return (
    <footer className="border-t border-white/5 mt-20">
      {/* Connect CTA band */}
      <div data-contact-cta className="max-w-5xl mx-auto px-6 py-16 text-center">
        <p className="text-xs font-mono text-plasma uppercase tracking-widest mb-3">// Let's Connect</p>
        <h2 className="font-display text-4xl font-bold text-white mb-4">Open to great conversations.</h2>
        <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
          Roles, collaborations, security audits, or just saying hello — all welcome.
        </p>

        <div className="flex flex-wrap gap-4 justify-center items-center">
          <LinkedInConnect />
          <Link href="/contact"
            className="group flex items-center gap-3 px-6 py-3.5 rounded-xl border border-plasma/40 hover:bg-plasma/10 transition-all duration-300 hover:-translate-y-0.5"
            data-contact-cta>
            <span className="text-sm font-semibold text-plasma">Send a message</span>
            <span className="text-plasma text-xs group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <a href={`mailto:${personalInfo.email}`}
            className="text-sm text-slate-500 hover:text-slate-300 font-mono transition-colors">
            {personalInfo.email}
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-6 py-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-white text-sm">V Kavya</span>
            <span className="text-slate-700">·</span>
            <span className="text-xs text-slate-600 font-mono">AI × Security × Full-Stack</span>
          </div>

          {/* Social icons row */}
          <div className="flex items-center gap-3">
            {socials.filter(s => s.href).map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                title={s.label}
                className="text-slate-600 hover:text-slate-300 transition-colors text-sm">
                {s.icon}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] text-slate-700 font-mono">
              🔒 No cookies · No tracking beyond Analytics
            </span>
            <span className="text-[10px] text-slate-700 font-mono">
              🥚 Find all 10 eggs
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
