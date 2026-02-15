'use client';

import { usePortfolioStore } from '@/lib/store';

const modes = [
  {
    id: 'recruiter' as const,
    icon: '💼',
    label: "I'm a Recruiter",
    desc: 'Show me outcomes, impact & leadership',
    color: '#00f5d4',
    bg: 'rgba(0, 245, 212, 0.08)',
    border: 'rgba(0, 245, 212, 0.3)',
  },
  {
    id: 'developer' as const,
    icon: '⚡',
    label: "I'm a Developer",
    desc: 'Show me architecture, tradeoffs & code depth',
    color: '#4cc9f0',
    bg: 'rgba(76, 201, 240, 0.08)',
    border: 'rgba(76, 201, 240, 0.3)',
  },
  {
    id: 'curious' as const,
    icon: '🚀',
    label: "I'm just curious",
    desc: 'Show me visuals, stories & experiments',
    color: '#ffd166',
    bg: 'rgba(255, 209, 102, 0.08)',
    border: 'rgba(255, 209, 102, 0.3)',
  },
];

export default function ModeSelector() {
  const { setUserMode, setModeModalOpen } = usePortfolioStore();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-void/90 backdrop-blur-xl"
        onClick={() => setModeModalOpen(false)}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg glass-card rounded-2xl border border-white/10 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs font-mono text-plasma uppercase tracking-widest mb-3">
            Adaptive Experience
          </p>
          <h2 className="font-display text-2xl font-bold text-white">
            Who are you?
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            The portfolio adapts to show you what matters most
          </p>
        </div>

        {/* Mode Options */}
        <div className="space-y-3">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setUserMode(mode.id)}
              className="w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all hover-lift"
              style={{
                background: mode.bg,
                borderColor: mode.border,
              }}
            >
              <span className="text-2xl">{mode.icon}</span>
              <div>
                <div className="font-medium text-white text-sm">{mode.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{mode.desc}</div>
              </div>
              <span className="ml-auto text-xs font-mono" style={{ color: mode.color }}>
                →
              </span>
            </button>
          ))}
        </div>

        {/* Skip */}
        <button
          onClick={() => setModeModalOpen(false)}
          className="w-full mt-4 text-center text-xs text-slate-600 hover:text-slate-400 transition-colors py-2"
        >
          Skip — show me everything
        </button>
      </div>
    </div>
  );
}
