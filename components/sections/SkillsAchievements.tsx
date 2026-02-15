'use client';

import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { skills, achievements, certifications } from '@/lib/data';

export function SkillsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref} className="py-32 bg-gradient-to-b from-transparent via-obsidian/40 to-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-mono text-plasma uppercase tracking-widest mb-3">// Capabilities</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">What I Work With</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <div
              key={skill.category}
              className="glass-card rounded-2xl p-6 border border-white/5 hover-lift"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease ${i * 0.1}s`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{skill.icon}</span>
                <h3 className="font-display font-semibold text-white">{skill.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-mono px-2.5 py-1 rounded-full border text-slate-300"
                    style={{
                      borderColor: `${skill.color}30`,
                      background: `${skill.color}08`,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AchievementsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref} className="py-32 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-xs font-mono text-plasma uppercase tracking-widest mb-3">// By The Numbers</p>
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">Proof of Impact</h2>
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
        {achievements.map((a, i) => (
          <div
            key={a.label}
            className="glass-card rounded-2xl p-5 text-center border border-white/5"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
              transition: `all 0.5s ease ${i * 0.08}s`,
            }}
          >
            <span className="text-2xl">{a.icon}</span>
            <div
              className="font-display font-bold text-2xl mt-2"
              style={{ color: a.color }}
            >
              {a.metric}
            </div>
            <div className="text-xs font-medium text-slate-300 mt-1">{a.label}</div>
            <div className="text-[10px] text-slate-600 mt-0.5">{a.detail}</div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="mb-8">
        <p className="text-xs font-mono text-plasma uppercase tracking-widest mb-6 text-center">// Certifications</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/8 glass-card hover-lift"
            >
              <div className="w-2 h-2 rounded-full" style={{ background: cert.color }} />
              <span className="text-sm text-slate-300 font-medium">{cert.name}</span>
              <span className="text-xs text-slate-600">• {cert.issuer}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
