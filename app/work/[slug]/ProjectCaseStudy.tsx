'use client';

import Link from 'next/link';
import { usePortfolioStore } from '@/lib/store';
import { projects } from '@/lib/data';

export default function ProjectCaseStudy({ project }: { project: (typeof projects)[0] }) {
  const { thoughtProcessMode, securityMode, toggleThoughtProcess, toggleSecurityMode } = usePortfolioStore();

  return (
    <main className="pt-32 pb-20 max-w-4xl mx-auto px-6">
      {/* Back */}
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-plasma transition-colors mb-12"
      >
        ← All Projects
      </Link>

      {/* Hero */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={{ color: project.color, background: `${project.color}15` }}
          >
            MISSION BRIEF
          </span>
          <span className="text-[10px] font-mono text-slate-600">{project.domain}</span>
        </div>
        <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-3">{project.title}</h1>
        <p className="text-xl text-slate-400 mb-6">{project.subtitle}</p>

        {/* Quick actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={toggleThoughtProcess}
            className={`text-xs font-mono px-4 py-2 rounded-full border transition-all ${
              thoughtProcessMode
                ? 'border-electric-blue/50 text-electric-blue bg-electric-blue/10'
                : 'border-white/10 text-slate-400 hover:border-white/30'
            }`}
          >
            🧠 {thoughtProcessMode ? 'Hide' : 'Show'} Thinking
          </button>
          <button
            onClick={toggleSecurityMode}
            className={`text-xs font-mono px-4 py-2 rounded-full border transition-all ${
              securityMode
                ? 'border-ember/50 text-ember bg-ember/10'
                : 'border-white/10 text-slate-400 hover:border-white/30'
            }`}
          >
            🛡️ {securityMode ? 'Exit' : 'Enter'} Security Mode
          </button>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono px-4 py-2 rounded-full border border-white/10 text-slate-400 hover:border-white/30 hover:text-white transition-all"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>

      {/* Impact Banner */}
      <div
        className="p-6 rounded-2xl border mb-12"
        style={{ borderColor: `${project.color}30`, background: `${project.color}06` }}
      >
        <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: project.color }}>MISSION OUTCOME</div>
        <p className="text-xl font-display font-bold text-white">{project.outcome}</p>
        <p className="text-sm text-slate-400 mt-1">{project.impact}</p>
      </div>

      {/* Content Sections */}
      <div className="space-y-12">
        {/* Problem */}
        <Section title="01 — The Problem" color={project.color}>
          <p className="text-slate-300 text-lg leading-relaxed">{project.problem}</p>
        </Section>

        {/* Solution */}
        <Section title="02 — The Solution" color={project.color}>
          <p className="text-slate-300 leading-relaxed">{project.solution}</p>
        </Section>

        {/* Tech Stack */}
        <Section title="03 — Architecture" color={project.color}>
          <div className="flex flex-wrap gap-3">
            {project.stack.map((t) => (
              <div
                key={t}
                className="px-4 py-2 rounded-xl border border-white/10 glass-card text-sm font-mono text-slate-300"
              >
                {t}
              </div>
            ))}
          </div>
        </Section>

        {/* Thought Process */}
        {thoughtProcessMode && (
          <Section title="🧠 Design Reasoning" color="#4cc9f0">
            <div className="thought-bubble p-5 rounded-xl">
              <p className="text-slate-200 leading-relaxed italic text-lg">"{project.thoughtProcess}"</p>
            </div>
          </Section>
        )}

        {/* Security Mode */}
        {securityMode && (
          <>
            <Section title="🛡️ Security Architecture" color="#ff4d6d">
              <div className="space-y-3">
                {project.securityConsiderations.map((s, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-lg bg-ember/5 border border-ember/15">
                    <span className="text-ember shrink-0 mt-0.5">✓</span>
                    <p className="text-slate-300 text-sm">{s}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="🚫 What I Intentionally Didn't Build" color="#ffd166">
              <div className="space-y-3">
                {project.notBuilt.map((s, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-lg bg-gold/5 border border-gold/15">
                    <span className="text-gold shrink-0 mt-0.5">×</span>
                    <p className="text-slate-300 text-sm">{s}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3 font-mono italic">
                Deliberate omissions signal senior engineering thinking.
              </p>
            </Section>
          </>
        )}
      </div>

      {/* Nav to next project */}
      <div className="mt-20 pt-8 border-t border-white/5 flex justify-between items-center">
        <Link href="/work" className="text-slate-400 hover:text-plasma transition-colors text-sm">
          ← All Projects
        </Link>
        <Link href="/contact" className="text-sm font-medium" style={{ color: project.color }}>
          Let's talk about this →
        </Link>
      </div>
    </main>
  );
}

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div>
      <h2
        className="font-display text-xl font-bold mb-5"
        style={{ color }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
