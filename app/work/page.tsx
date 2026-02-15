'use client';
import { useState } from 'react';
import Link from 'next/link';
import { projects } from '@/lib/data';
import { usePortfolioStore } from '@/lib/store';

const FILTERS = ['All', 'AI', 'Security', 'Full-Stack', 'Mobile', 'Frontend', 'Healthcare', 'Analytics'];

function domainMatch(domain: string, filter: string) {
  if (filter === 'All') return true;
  const d = domain.toLowerCase();
  if (filter === 'AI') return d.includes('ai');
  if (filter === 'Security') return d.includes('security');
  if (filter === 'Full-Stack') return d.includes('full-stack') || d.includes('web') || d.includes('desktop');
  if (filter === 'Mobile') return d.includes('mobile') || d.includes('ar/vr');
  if (filter === 'Frontend') return d.includes('frontend');
  if (filter === 'Healthcare') return d.includes('health');
  if (filter === 'Analytics') return d.includes('analytics');
  return false;
}

export default function WorkPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string|null>(null);
  const { thoughtProcessMode, securityMode } = usePortfolioStore();

  const sanitize = (v: string) => v.replace(/<[^>]*>/g,'').slice(0, 60);

  const filtered = projects.filter(p => {
    const match = domainMatch(p.domain, filter);
    const q = search.toLowerCase();
    const textMatch = !q || p.title.toLowerCase().includes(q) || p.stack.some(s => s.toLowerCase().includes(q)) || p.domain.toLowerCase().includes(q);
    return match && textMatch;
  });

  return (
    <main className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-mono text-plasma uppercase tracking-widest mb-3">// Mission Control</p>
        <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-4">All Projects</h1>
        <p className="text-slate-400 text-lg max-w-xl">
          Every decision deliberate. Every tradeoff documented.
        </p>
      </div>

      {/* Mode indicators */}
      {(thoughtProcessMode || securityMode) && (
        <div className="flex gap-3 mb-8 flex-wrap">
          {thoughtProcessMode && <div className="text-[11px] font-mono px-3 py-1.5 rounded-full border border-electric-blue/30 text-electric-blue bg-electric-blue/5">🧠 Thought process visible — expand any card</div>}
          {securityMode && <div className="text-[11px] font-mono px-3 py-1.5 rounded-full border border-ember/30 text-ember bg-ember/5">🛡️ Security mode — attack surfaces visible</div>}
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center mb-8">
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm pointer-events-none">⌕</span>
          <input type="text" value={search} onChange={e => setSearch(sanitize(e.target.value))}
            placeholder="Search projects or stack…"
            className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-plasma/40 transition-colors font-mono w-56"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="text-[11px] font-mono px-3 py-1.5 rounded-xl border transition-all"
              style={{
                borderColor: filter === f ? '#00f5d4' : 'rgba(255,255,255,0.08)',
                color: filter === f ? '#00f5d4' : '#64748b',
                background: filter === f ? 'rgba(0,245,212,0.07)' : 'transparent',
              }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <p className="text-[10px] font-mono text-slate-600 mb-6">
        {filtered.length} project{filtered.length !== 1 ? 's' : ''}{filter !== 'All' ? ` · ${filter}` : ''}{search ? ` matching "${search}"` : ''}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-600 font-mono">No projects match. Try a different filter.</div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(p => (
            <ProjectCard key={p.id} project={p}
              rank={projects.indexOf(p) + 1}
              expanded={expandedId === p.id}
              onToggle={() => setExpandedId(expandedId === p.id ? null : p.id)}
              showThought={thoughtProcessMode}
              showSecurity={securityMode}
            />
          ))}
        </div>
      )}
    </main>
  );
}

function ProjectCard({ project, rank, expanded, onToggle, showThought, showSecurity }: {
  project: typeof projects[0];
  rank: number;
  expanded: boolean;
  onToggle: () => void;
  showThought: boolean;
  showSecurity: boolean;
}) {
  return (
    <article className="glass-card rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all group flex flex-col"
      style={{ '--card-color': project.color } as React.CSSProperties}>
      <div style={{ height: 2, background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

      <div className="p-5 flex-1 flex flex-col">
        {/* Top row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full" style={{ color: project.color, background: `${project.color}18` }}>#{rank}</span>
            <span className="text-[9px] font-mono text-slate-600">{project.domain}</span>
          </div>
          {project.featured && <span className="text-[8px] font-mono text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">FEATURED</span>}
        </div>

        {/* Title */}
        <h2 className="font-display text-lg font-bold text-white group-hover:text-plasma transition-colors mb-0.5">{project.title}</h2>
        <p className="text-slate-500 text-xs mb-3 leading-relaxed">{project.subtitle}</p>

        {/* Impact */}
        <div className="px-3 py-2 rounded-lg mb-3 border-l-2 flex-shrink-0"
          style={{ background: `${project.color}08`, borderColor: project.color }}>
          <div className="text-[8px] font-mono uppercase tracking-wider mb-0.5" style={{ color: project.color }}>Impact</div>
          <div className="text-xs text-white font-medium">{project.impact}</div>
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.slice(0, 4).map(t => (
            <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-500 border border-white/5">{t}</span>
          ))}
          {project.stack.length > 4 && <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-600">+{project.stack.length - 4}</span>}
        </div>

        {/* Expandable section */}
        <button onClick={onToggle}
          className="w-full flex items-center justify-between text-[10px] font-mono text-slate-600 hover:text-slate-300 transition-colors mb-2 py-1 border-t border-white/5 pt-3">
          <span>🧠 Why I built this</span>
          <span style={{ transform: expanded ? 'rotate(180deg)' : '', transition: 'transform 0.2s' }}>▼</span>
        </button>

        {expanded && (
          <div className="space-y-2.5 mb-3">
            {[
              { icon:'🎯', label:'Why I built this', text: project.whyBuilt, c: project.color },
              { icon:'📚', label:'What I learned',   text: project.learned,   c: '#4cc9f0' },
              { icon:'🔬', label:'Problem explored',  text: project.explores,  c: '#a78bfa' },
            ].map(b => (
              <div key={b.label} className="rounded-xl p-3" style={{ background: `${b.c}08`, border: `1px solid ${b.c}15` }}>
                <div className="text-[8px] font-mono uppercase tracking-wider mb-1" style={{ color: b.c }}>{b.icon} {b.label}</div>
                <p className="text-[10px] text-slate-300 leading-relaxed">{b.text}</p>
              </div>
            ))}

            {showThought && (
              <div className="rounded-xl p-3 border border-electric-blue/20 bg-electric-blue/5">
                <div className="text-[8px] font-mono text-electric-blue uppercase mb-1">🧠 Design Reasoning</div>
                <p className="text-[10px] text-slate-300 italic leading-relaxed">"{project.thoughtProcess}"</p>
              </div>
            )}

            {showSecurity && (
              <div className="rounded-xl p-3 border border-ember/20 bg-ember/5">
                <div className="text-[8px] font-mono text-ember uppercase mb-2">🛡️ Security Considerations</div>
                <ul className="space-y-1">
                  {project.securityConsiderations.slice(0,3).map((s,i) => (
                    <li key={i} className="text-[9px] text-slate-400 flex gap-1.5"><span className="text-ember">✓</span>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
          <Link href={`/work/${project.slug}`} className="text-[11px] font-medium transition-colors hover:underline" style={{ color: project.color }}>
            Case Study →
          </Link>
          <div className="flex gap-3">

  {project.github && (
    <a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[9px] text-slate-600 hover:text-slate-300 font-mono transition-colors"
    >
      GitHub ↗
    </a>
  )}

  {project.playstore && (
    <a
      href={project.playstore}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[9px] text-green-400 hover:text-green-300 font-mono transition-colors"
    >
      Play Store ↗
    </a>
  )}

</div>

        </div>
      </div>
    </article>
  );
}
