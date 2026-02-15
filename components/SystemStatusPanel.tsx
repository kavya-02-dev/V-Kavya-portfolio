'use client';

import { useState } from 'react';
import { usePortfolioStore } from '@/lib/store';

export default function SystemStatusPanel() {
  const [collapsed, setCollapsed] = useState(false);
  const { systemStatus } = usePortfolioStore();

  const fpsColor = systemStatus.fps >= 55 ? '#00f5d4' : systemStatus.fps >= 30 ? '#ffd166' : '#ff4d6d';
  const latencyColor = systemStatus.dbLatency < 100 ? '#00f5d4' : systemStatus.dbLatency < 300 ? '#ffd166' : '#ff4d6d';

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div
        className="glass-card rounded-xl overflow-hidden border border-white/10 cursor-pointer"
        style={{ minWidth: collapsed ? 'auto' : '200px' }}
        onClick={() => setCollapsed(!collapsed)}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
          <div className="w-2 h-2 rounded-full bg-plasma animate-pulse" />
          {!collapsed && (
            <span className="status-panel text-slate-400 uppercase tracking-widest text-[10px]">
              System Status
            </span>
          )}
          <span className="ml-auto text-slate-600 text-[10px]">{collapsed ? '◀' : '▶'}</span>
        </div>

        {/* Status Lines */}
        {!collapsed && (
          <div className="px-3 py-2 space-y-1.5">
            <StatusLine
              label="Backend"
              value={systemStatus.backend ? 'Online' : 'Degraded'}
              color={systemStatus.backend ? '#00f5d4' : '#ff4d6d'}
              dot
            />
            <StatusLine
              label="DB Latency"
              value={systemStatus.dbLatency > 0 ? `${systemStatus.dbLatency}ms` : 'Measuring...'}
              color={latencyColor}
            />
            <StatusLine
              label="Frame Rate"
              value={`${systemStatus.fps}fps`}
              color={fpsColor}
            />
            <StatusLine
              label="Tracking Scripts"
              value="None"
              color="#00f5d4"
              dot
            />
            <StatusLine
              label="Secure Headers"
              value="Enabled"
              color="#00f5d4"
              dot
            />
          </div>
        )}
      </div>
    </div>
  );
}

function StatusLine({
  label,
  value,
  color,
  dot,
}: {
  label: string;
  value: string;
  color: string;
  dot?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 status-panel">
      <span className="text-slate-500">{label}</span>
      <span className="flex items-center gap-1" style={{ color }}>
        {dot && <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />}
        {value}
      </span>
    </div>
  );
}
