'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { personalInfo, experiences, certifications, honors } from '@/lib/data';

const CertBadges3D = dynamic(() => import('@/components/three/CertBadges3D'), {
  ssr: false,
  loading: () => (
    <div className="h-80 flex items-center justify-center">
      <div className="text-xs font-mono text-slate-600 animate-pulse">Loading 3D badges...</div>
    </div>
  ),
});

export default function AboutPage() {
  return (
    <main className="pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6">

        {/* ── HERO INTRO ───────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <p className="text-xs font-mono text-plasma uppercase tracking-widest mb-4">// About</p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Engineer.<br />
              <span className="plasma-text">Defender.</span><br />
              Builder.
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">{personalInfo.bio}</p>

            {/* Social links */}
            <div className="flex flex-wrap gap-3">
              {[
                { href: personalInfo.linkedin, label: 'LinkedIn', icon: '💼', color: '#4cc9f0' },
                { href: personalInfo.github, label: 'GitHub', icon: '💻', color: '#a78bfa' },
                { href: personalInfo.leetcode, label: 'LeetCode', icon: '⚡', color: '#ffd166' },
                { href: `mailto:${personalInfo.email}`, label: 'Email', icon: '📧', color: '#00f5d4' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card border border-white/8 hover:border-white/20 transition-all hover:-translate-y-0.5"
                >
                  <span>{s.icon}</span>
                  <span className="text-sm text-slate-300">{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Profile photo */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-plasma/30 via-electric-blue/20 to-ember/20 blur-2xl" />
              <div className="relative w-72 h-72 rounded-3xl overflow-hidden border-2 border-plasma/40 glass-card">
                <Image
                  src="/kavya.png"
                  alt="Kavya V"
                  fill
                  className="object-cover"
                  priority
                />
                
              </div>

              {/* Floating badges on photo */}
              <div className="absolute -top-4 -right-4 glass-card rounded-xl px-3 py-2 border border-plasma/30 animate-float">
                <div className="text-[10px] font-mono text-plasma">B.E. CSE</div>
                <div className="text-[9px] text-slate-500">Ramco Institute · 8.53 CGPA</div>
              </div>
              <div className="absolute -bottom-4 -left-4 glass-card rounded-xl px-3 py-2 border border-ember/30 animate-float-delayed">
                <div className="text-[10px] font-mono text-ember">ApoorvCTF</div>
                <div className="text-[9px] text-slate-500">Global Rank #65</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── QUICK INFO ───────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {[
            { label: 'Education', val: 'B.E. Computer Science', sub: 'Ramco Institute of Technology' },
            { label: 'CGPA', val: '8.53 / 10', sub: 'Anna University' },
            { label: 'Location', val: personalInfo.location, sub: 'Open to Remote & Relocation' },
            { label: 'Status', val: personalInfo.availability, sub: 'Full-time · Internship · Freelance' },
          ].map((item) => (
            <div key={item.label} className="glass-card rounded-xl p-4 border border-white/5">
              <div className="text-[10px] font-mono text-slate-600 uppercase tracking-wider mb-1">{item.label}</div>
              <div className="text-white font-medium text-sm">{item.val}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>

        {/* ── WHAT I BELIEVE ───────────────────────────────── */}
        <div className="mb-24">
          <p className="text-xs font-mono text-plasma uppercase tracking-widest mb-8">// Core Beliefs</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'Tech Serves Purpose', desc: 'Every line of code should make someone\'s life better. Performance and usability are non-negotiable — beauty and function must coexist.', color: '#00f5d4' },
              { icon: '🛡️', title: 'Security is Non-Negotiable', desc: 'Security isn\'t a feature you bolt on. It\'s the foundation. I think in threat models before I write endpoints.', color: '#ff4d6d' },
              { icon: '🌱', title: 'Impact on Environment', desc: 'Technology can and should serve nature. From tree management systems to sustainable AI — I build for the planet too.', color: '#a78bfa' },
            ].map((p) => (
              <div key={p.title} className="glass-card rounded-2xl p-6 border border-white/5 hover-lift">
                <span className="text-3xl">{p.icon}</span>
                <h3 className="font-display font-bold text-white mt-4 mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                <div className="mt-4 h-0.5 w-12 rounded" style={{ background: p.color }} />
              </div>
            ))}
          </div>
        </div>

        {/* ── EXPERIENCE TIMELINE ──────────────────────────── */}
        <div className="mb-24">
          <p className="text-xs font-mono text-plasma uppercase tracking-widest mb-8">// Experience Timeline</p>
          <div className="space-y-3">
            {experiences.map((exp) => (
              <div key={exp.id} className="glass-card rounded-xl p-5 border border-white/5 flex gap-4 items-start hover:border-white/10 transition-all">
                <div className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5" style={{ background: exp.color, boxShadow: `0 0 10px ${exp.color}` }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="font-display font-bold text-white">{exp.company}</h3>
                      <p className="text-sm text-slate-400">{exp.role}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-slate-600">{exp.period}</span>
                      <div className="text-[10px] text-slate-700 mt-0.5">{exp.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── EDUCATION ────────────────────────────────────── */}
        <div className="mb-24">
          <p className="text-xs font-mono text-plasma uppercase tracking-widest mb-8">// Education</p>
          <div className="space-y-4">
            {personalInfo.education.map((edu) => (
              <div key={edu.degree} className="glass-card rounded-2xl p-6 border border-white/5">
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="font-display font-bold text-white">{edu.degree}</h3>
                    <p className="text-slate-400 text-sm mt-1">{edu.university}</p>
                    {edu.cgpa && (
                      <span className="inline-block mt-2 text-xs font-mono text-plasma bg-plasma/10 px-2 py-0.5 rounded">
                        CGPA: {edu.cgpa}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-slate-600">{edu.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3D CERTIFICATION BADGES ──────────────────────── */}
        <div className="mb-24">
          <p className="text-xs font-mono text-plasma uppercase tracking-widest mb-4">// Certifications</p>
          <p className="text-slate-500 text-sm mb-8 font-mono">Hover the badges to interact ↓</p>
          <CertBadges3D />
        </div>

        {/* ── HONORS & AWARDS ──────────────────────────────── */}
        <div className="mb-24">
          <p className="text-xs font-mono text-plasma uppercase tracking-widest mb-8">// Honors & Awards</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {honors.map((h) => (
              <div
                key={h.title}
                className="glass-card rounded-xl p-4 border border-white/5 flex items-center gap-3 hover-lift"
              >
                <span className="text-2xl">{h.icon}</span>
                <div>
                  <div className="text-sm font-medium text-white">{h.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5" style={{ color: h.color }}>{h.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TOP SKILLS ───────────────────────────────────── */}
        <div className="mb-24">
          <p className="text-xs font-mono text-plasma uppercase tracking-widest mb-6">// Top Skills</p>
          <div className="flex flex-wrap gap-3">
            {personalInfo.topSkills.map((s) => (
              <span key={s} className="px-4 py-2.5 rounded-xl glass-card border border-plasma/20 text-sm font-medium text-plasma">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* ── LANGUAGES ────────────────────────────────────── */}
        <div>
          <p className="text-xs font-mono text-plasma uppercase tracking-widest mb-6">// Languages</p>
          <div className="flex flex-wrap gap-3">
            {personalInfo.languages.map((l) => (
              <div key={l.lang} className="glass-card px-4 py-2.5 rounded-xl border border-white/5">
                <span className="text-sm font-medium text-white">{l.lang}</span>
                <span className="text-xs text-slate-500 ml-2">{l.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
