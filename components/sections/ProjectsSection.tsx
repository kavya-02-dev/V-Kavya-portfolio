'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { usePortfolioStore } from '@/lib/store';
import { projects } from '@/lib/data';

export default function ProjectsSection() {
  const { thoughtProcessMode, securityMode } = usePortfolioStore();

  return (
    <section className="py-32 max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="flex items-end justify-between mb-16">
        <div>
          <p className="text-xs font-mono text-plasma uppercase tracking-widest mb-3">
            // Featured Missions
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">
            Selected Work
          </h2>
        </div>
        <Link
          href="/work"
          className="hidden md:flex items-center gap-2 text-slate-400 hover:text-plasma transition-colors font-medium"
        >
          All Projects <span>→</span>
        </Link>
      </div>

      {/* Project Cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        {projects.filter((p) => p.featured).map((project, i) => (
          <ProjectMissionCard
            key={project.id}
            project={project}
            index={i}
            showThought={thoughtProcessMode}
            showSecurity={securityMode}
          />
        ))}
      </div>

      <Link
        href="/work"
        className="mt-8 flex md:hidden items-center gap-2 text-slate-400 hover:text-plasma transition-colors font-medium"
      >
        All Projects <span>→</span>
      </Link>
    </section>
  );
}

function ProjectMissionCard({
  project,
  index,
  showThought,
  showSecurity,
}: {
  project: (typeof projects)[0];
  index: number;
  showThought: boolean;
  showSecurity: boolean;
}) {
  return (
    <div
      className="group relative glass-card rounded-2xl border border-white/5 overflow-hidden hover-lift transition-all duration-500"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Color accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
      />

      {/* Mission Header */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-start justify-between mb-3">
          <span
            className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded"
            style={{ color: project.color, background: `${project.color}15` }}
          >
            MISSION
          </span>
          <span className="text-[10px] font-mono text-slate-600">{project.domain}</span>
        </div>
        <h3 className="font-display text-xl font-bold text-white group-hover:text-plasma transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-slate-400 mt-1">{project.subtitle}</p>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Objective */}
        <div className="mb-4">
          <div className="text-[10px] font-mono text-slate-600 uppercase tracking-wider mb-1">OBJECTIVE</div>
          <p className="text-sm text-slate-300 leading-relaxed">{project.problem}</p>
        </div>

        {/* Outcome */}
        <div className="mb-4 p-3 rounded-lg" style={{ background: `${project.color}08`, borderLeft: `2px solid ${project.color}` }}>
          <div className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: project.color }}>OUTCOME</div>
          <p className="text-sm text-white font-medium">{project.impact}</p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.slice(0, 4).map((tech) => (
            <span key={tech} className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 text-slate-400">
              {tech}
            </span>
          ))}
        </div>

        {/* Thought Process Bubble */}
        {showThought && (
          <div className="thought-bubble p-3 rounded-lg mb-4">
            <div className="text-[10px] text-plasma uppercase tracking-wider mb-1.5">🧠 Why I built it this way</div>
            <p className="text-slate-300 text-[11px] leading-relaxed italic">"{project.thoughtProcess}"</p>
          </div>
        )}

        {/* Security Mode */}
        {showSecurity && (
          <div className="mb-4 rounded-lg border border-ember/20 bg-ember/5 p-3">
            <div className="text-[10px] font-mono text-ember uppercase tracking-wider mb-2">🛡️ Security Measures</div>
            <ul className="space-y-1">
              {project.securityConsiderations.slice(0, 2).map((s, i) => (
                <li key={i} className="text-[11px] text-slate-400 flex gap-1.5">
                  <span className="text-ember mt-0.5 shrink-0">✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
<div className="flex items-center justify-between mt-2">

  <Link
    href={`/work/${project.slug}`}
    className="flex items-center gap-2 text-sm font-medium transition-all duration-200"
    style={{ color: project.color }}
  >
    View Case Study
    <span className="group-hover:translate-x-1 transition-transform">→</span>
  </Link>

  {/* External links */}
  <div className="flex gap-3">

    {project.github && (
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[11px] font-mono text-slate-500 hover:text-white transition-colors"
      >
        GitHub ↗
      </a>
    )}

    {project.playstore && (
      <a
        href={project.playstore}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[11px] font-mono text-green-400 hover:text-green-300 transition-colors"
      >
        Play Store ↗
      </a>
    )}

  </div>

</div>

      </div>
    </div>
  );
}
