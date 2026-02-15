'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePortfolioStore } from '@/lib/store';
import { personalInfo, modeContent } from '@/lib/data';
import CartoonScene from '@/components/three/CartoonScene';

const ROTATING_WORDS = [
  'Full-Stack Dev', 'Security Expert', 'AI Engineer',
  'Cloud Engineer', 'GDGoC Lead (2024-2025)',
];

// Social link icons
function SocialLink({
  href, label, icon, color,
}: { href: string; label: string; icon: React.ReactNode; color: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="group flex items-center gap-2 px-3 py-2 rounded-xl border border-white/8 glass-card hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5"
    >
      <span className="text-slate-400 group-hover:text-white transition-colors text-sm">{icon}</span>
      <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors font-mono hidden sm:inline">
        {label}
      </span>
    </a>
  );
}

export default function HeroSection() {
  const { securityMode, userMode, setModeModalOpen } = usePortfolioStore();
  const [wordIndex, setWordIndex] = useState(0);
  const [displayWord, setDisplayWord] = useState(ROTATING_WORDS[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(ROTATING_WORDS[0].length);

  useEffect(() => {
    const word = ROTATING_WORDS[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < word.length) {
        setDisplayWord(word.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      } else if (!isDeleting && charIndex === word.length) {
        setTimeout(() => setIsDeleting(true), 1600);
      } else if (isDeleting && charIndex > 0) {
        setDisplayWord(word.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      } else {
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
      }
    }, isDeleting ? 55 : 95);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  const heroTagline = userMode ? modeContent[userMode].heroTagline : personalInfo.tagline;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-gradient-radial from-plasma/5 via-transparent to-transparent" />

      {/* Orbit rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        {[64, 96, 125].map((r, i) => (
          <div
            key={r}
            className="orbit-ring absolute top-1/2 left-1/2"
            style={{
              width: r * 4, height: r * 4,
              marginLeft: -r * 2, marginTop: -r * 2,
              borderColor: `rgba(0,245,212,${0.08 - i * 0.02})`,
              animation: `spin ${12 + i * 6}s linear infinite ${i % 2 === 1 ? 'reverse' : ''}`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* ─── LEFT: Text ─────────────────────────────── */}
        <div className="relative z-10">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-plasma/30 bg-plasma/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-plasma animate-pulse" />
            <span className="text-xs font-mono text-plasma tracking-wider">{personalInfo.availability}</span>
          </div>

          {/* Profile photo + name row */}
          <div className="flex items-center gap-4 mb-5">
            <div className="relative shrink-0">
              <div
                className="w-16 h-16 rounded-2xl overflow-hidden border-2"
                style={{ borderColor: securityMode ? '#ff4d6d' : '#00f5d4' }}
              >
                <Image
                  src={personalInfo.photo}
                  alt="Kavya V"
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    // Fallback if photo not found yet
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                {/* Fallback avatar */}
                <div
                  className="absolute inset-0 flex items-center justify-center text-2xl font-display font-bold"
                  style={{ background: 'linear-gradient(135deg, #00f5d4, #4cc9f0)', color: '#030508' }}
                >
                  K
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-plasma rounded-full border-2 border-void" />
            </div>

            <div>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-white leading-none">
                V <span className="plasma-text">Kavya</span>
              </h1>
              <p className="text-xs text-slate-500 font-mono mt-1">📍 {personalInfo.location}</p>
            </div>
          </div>

          {/* Typewriter role */}
          <div className="text-2xl lg:text-3xl font-display font-semibold text-slate-300 mb-4 h-10">
            {displayWord}
            <span className="plasma-text blink ml-0.5">|</span>
          </div>

          {/* Tagline */}
          <p className="text-slate-400 text-lg max-w-lg leading-relaxed mb-8">{heroTagline}</p>

          {/* Domain pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {personalInfo.domains.map((d) => (
              <span key={d} className="text-xs font-mono px-3 py-1.5 rounded-full border border-white/10 text-slate-400">
                {d}
              </span>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-2 mb-8">
            <SocialLink
              href={personalInfo.linkedin}
              label="LinkedIn"
              color="#4cc9f0"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              }
            />
            <SocialLink
              href={personalInfo.github}
              label="GitHub"
              color="#a78bfa"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              }
            />
            <SocialLink
              href={personalInfo.leetcode}
              label="LeetCode"
              color="#ffd166"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.483 0a1.374 1.374 0 00-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 00-1.209 2.104 5.35 5.35 0 00-.125.513 5.527 5.527 0 00.062 2.362 5.83 5.83 0 00.349 1.017 5.938 5.938 0 00 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 00-1.951-.003l-2.396 2.392a3.021 3.021 0 01-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 01.066-.523 2.545 2.545 0 01.619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 00-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0013.483 0zm-2.866 12.815a1.38 1.38 0 00-1.38 1.382 1.38 1.38 0 001.38 1.382H20.79a1.38 1.38 0 001.38-1.382 1.38 1.38 0 00-1.38-1.382z"/>
                </svg>
              }
            />
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/work"
              className="group px-8 py-3.5 rounded-xl font-semibold text-void transition-all duration-300 hover:shadow-plasma hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #00f5d4, #4cc9f0)' }}
            >
              View My Work
              <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-xl font-medium text-plasma border border-plasma/40 hover:bg-plasma/10 transition-all duration-300"
            >
              Let's Talk
            </Link>
            <button
              onClick={() => setModeModalOpen(true)}
              className="text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-4"
            >
              Customize view →
            </button>
          </div>

          {/* Quick stats */}
          <div className="flex gap-8 mt-10 pt-8 border-t border-white/5">
            {[
              { val: '500+', lab: 'DSA Problems' },
              { val: '700+', lab: 'Students Led' },
              { val: '#65', lab: 'Global CTF' },
            ].map((s) => (
              <div key={s.lab}>
                <div className="font-display font-bold text-xl text-white">{s.val}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.lab}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── RIGHT: Cartoon Robot ───────────────────── */}
        <div className="relative h-[540px] lg:h-[620px]">
          <CartoonScene securityMode={securityMode} />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-30">
        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-plasma to-transparent" />
      </div>
    </section>
  );
}
