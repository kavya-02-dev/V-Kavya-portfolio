'use client';

import Link from 'next/link';
import { personalInfo } from '@/lib/data';

export default function CTASection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Decorative element */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border border-plasma/20 animate-spin-slow" />
            <div className="absolute inset-2 rounded-full border border-plasma/10 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
            <div className="absolute inset-0 flex items-center justify-center text-3xl">🚀</div>
          </div>
        </div>

        <p className="text-xs font-mono text-plasma uppercase tracking-widest mb-4">// Let's Connect</p>
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Want to build something
          <br />
          <span className="plasma-text">meaningful together?</span>
        </h2>
        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
          I'm open to full-time SWE roles, internships, and interesting collaborations.
          I usually reply within 24 hours.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/contact"
            className="px-8 py-4 rounded-xl font-semibold text-void transition-all hover:shadow-plasma hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #00f5d4, #4cc9f0)' }}
          >
            Get In Touch →
          </Link>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-xl font-medium text-slate-300 border border-white/10 hover:border-white/30 hover:text-white transition-all"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
