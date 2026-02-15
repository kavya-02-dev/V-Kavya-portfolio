'use client';

import { useState, useRef } from 'react';
import { certifications } from '@/lib/data';

const ICONS: Record<string, string> = {
  'Google Cloud': '☁️',
  'ServiceNow': '⚙️',
  'EC-Council / Security Institute': '🛡️',
  'National Instruments': '🔬',
};

function Badge({ cert, index }: { cert: typeof certifications[0]; index: number }) {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -14;
    const y = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 14;
    setRot({ x, y });
  };
  const onLeave = () => { setRot({ x: 0, y: 0 }); setHovered(false); };

  const icon = ICONS[cert.issuer] ?? '🏅';
  const delay = `${index * 0.18}s`;

  return (
    <div
      style={{ perspective: '900px', animationDelay: delay }}
      className="animate-float"
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        style={{
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg) scale(${hovered ? 1.06 : 1})`,
          transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s cubic-bezier(0.23,1,0.32,1)',
          transformStyle: 'preserve-3d',
          boxShadow: hovered
            ? `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${cert.color}40`
            : `0 6px 24px rgba(0,0,0,0.4)`,
          background: `linear-gradient(145deg, rgba(13,20,36,0.97), rgba(8,12,22,0.99))`,
          borderColor: hovered ? cert.color : `${cert.color}28`,
          cursor: 'default',
        }}
        className="relative rounded-2xl border overflow-hidden select-none"
      >
        {/* Top accent bar */}
        <div style={{ background: `linear-gradient(90deg, ${cert.color}, ${cert.color}50, transparent)`, height: 3 }} />

        {/* Shine layer */}
        <div
          style={{
            position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 55%)',
            opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
          }}
        />

        <div className="p-5">
          {/* Header row */}
          <div className="flex items-start justify-between mb-4">
            <span
              className="text-[9px] font-mono uppercase tracking-[0.15em] px-2 py-1 rounded-full"
              style={{ color: cert.color, background: `${cert.color}18` }}
            >
              {cert.issuer.split(' ')[0]}
            </span>
            <span
              className="text-2xl"
              style={{
                filter: hovered ? `drop-shadow(0 0 10px ${cert.color})` : 'none',
                transition: 'filter 0.3s',
              }}
            >
              {icon}
            </span>
          </div>

          {/* Cert name */}
          <h3
            className="font-display font-bold text-sm text-white leading-snug mb-3"
            style={{ textShadow: hovered ? `0 0 20px ${cert.color}60` : 'none', transition: 'text-shadow 0.3s' }}
          >
            {cert.name}
          </h3>

          {/* Description — slides in on hover */}
          <div
            style={{
              maxHeight: hovered ? '72px' : '0',
              opacity: hovered ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.35s ease, opacity 0.25s ease',
            }}
          >
            <p className="text-[11px] text-slate-400 leading-relaxed">{cert.description}</p>
          </div>

          {/* Verified row */}
          <div className="flex items-center gap-1.5 mt-3">
            <div
              className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-black"
              style={{ background: cert.color, color: '#030508' }}
            >
              ✓
            </div>
            <span className="text-[10px] font-mono text-slate-600">Verified</span>
            {cert.credly && (
              <a
                href={cert.credly}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-[9px] font-mono transition-colors hover:underline"
                style={{ color: cert.color }}
              >
                Credly ↗
              </a>
            )}
          </div>
        </div>

        {/* Bottom glow */}
        <div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 64, pointerEvents: 'none',
            background: `radial-gradient(ellipse at center bottom, ${cert.color}20, transparent 70%)`,
            opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
          }}
        />
      </div>
    </div>
  );
}

export default function CertBadges3D() {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {certifications.map((cert, i) => (
          <Badge key={cert.name} cert={cert} index={i} />
        ))}
      </div>
      <p className="text-center text-[10px] text-slate-700 font-mono mt-5">
        ↑ Hover each badge to interact
      </p>
    </>
  );
}
