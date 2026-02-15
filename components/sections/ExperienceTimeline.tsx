'use client';

import { useState } from 'react';
import { usePortfolioStore } from '@/lib/store';
import { experiences } from '@/lib/data';

const typeColors: Record<string, string> = {
  fullstack: '#00f5d4',
  mobile: '#4cc9f0',
  security: '#ff4d6d',
  leadership: '#a78bfa',
  ai: '#f472b6',
};

const typeLabels: Record<string, string> = {
  fullstack: 'Full-Stack',
  mobile: 'Mobile',
  security: 'Security',
  leadership: 'Leadership',
  ai: 'AI/ML',
};

export default function ExperienceTimeline() {
  const { thoughtProcessMode, securityMode } = usePortfolioStore();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expanded, setExpanded] = useState<string | null>('servicenow');

  const filters = ['all', 'fullstack', 'security', 'ai', 'mobile', 'leadership'];
  const filtered =
    activeFilter === 'all'
      ? experiences
      : experiences.filter((e) => e.type === activeFilter);

  return (
    <section className="py-32 bg-gradient-to-b from-transparent via-obsidian/30 to-transparent">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-mono text-plasma uppercase tracking-widest mb-3">// Experience</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">Where I've Built</h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="text-xs font-mono px-4 py-1.5 rounded-full border transition-all capitalize"
              style={{
                borderColor: activeFilter === f ? (typeColors[f] || '#00f5d4') : 'rgba(255,255,255,0.1)',
                color: activeFilter === f ? (typeColors[f] || '#00f5d4') : '#64748b',
                background: activeFilter === f ? `${typeColors[f] || '#00f5d4'}10` : 'transparent',
              }}
            >
              {f === 'all' ? 'All' : typeLabels[f]}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-plasma via-plasma/30 to-transparent md:left-1/2" />

          <div className="space-y-8">
            {filtered.map((exp, i) => {
              const color = typeColors[exp.type] || '#00f5d4';
              const isOpen = expanded === exp.id;
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative flex gap-6 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-6 w-3 h-3 -translate-x-1.5 rounded-full border-2 border-void md:left-1/2 md:-translate-x-1.5 z-10"
                    style={{ background: color, boxShadow: `0 0 12px ${color}` }}
                  />

                  {/* Spacer for desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card */}
                  <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                    <div
                      className="glass-card rounded-2xl border border-white/5 overflow-hidden cursor-pointer hover:border-white/10 transition-all"
                      onClick={() => setExpanded(isOpen ? null : exp.id)}
                    >
                      {/* Card top accent */}
                      <div className="h-0.5 w-full" style={{ background: color }} />

                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span
                              className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded"
                              style={{ color, background: `${color}15` }}
                            >
                              {typeLabels[exp.type]}
                            </span>
                            <h3 className="font-display font-bold text-white mt-2">{exp.company}</h3>
                            <p className="text-sm text-slate-400">{exp.role}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-xs font-mono text-slate-500">{exp.period}</div>
                            <div className="text-[10px] text-slate-600 mt-0.5">{exp.location}</div>
                          </div>
                        </div>

                        {/* Expanded content */}
                        {isOpen && (
                          <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                            <ul className="space-y-1.5">
                              {exp.highlights.map((h, j) => (
                                <li key={j} className="text-sm text-slate-300 flex gap-2">
                                  <span style={{ color }} className="shrink-0 mt-0.5">▸</span>
                                  {h}
                                </li>
                              ))}
                            </ul>

                            {/* Thought Process */}
                            {thoughtProcessMode && (
                              <div className="thought-bubble p-3 rounded-lg mt-3">
                                <div className="text-[10px] text-electric-blue uppercase tracking-wider mb-1.5">
                                  🧠 Design Reasoning
                                </div>
                                <p className="text-[11px] text-slate-300 italic leading-relaxed">
                                  "{exp.thoughtProcess}"
                                </p>
                              </div>
                            )}

                            {/* Security */}
                            {securityMode && (
                              <div className="rounded-lg border border-ember/20 bg-ember/5 p-3 mt-2">
                                <div className="text-[10px] font-mono text-ember uppercase tracking-wider mb-1.5">
                                  🛡️ Security Note
                                </div>
                                <p className="text-[11px] text-slate-300 leading-relaxed">
                                  {exp.securityNote}
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="mt-3 text-right">
                          <span className="text-[10px] font-mono text-slate-600">
                            {isOpen ? '▲ collapse' : '▼ expand'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
