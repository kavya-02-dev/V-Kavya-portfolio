'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

// ─── Floating badge configs ────────────────────────────────────────────────
const BADGES = [
  {
    emoji:'☁️',
    title:'Triple GCP Certified',
    sub:'ML · DE · ACE',
    color:'#00f5d4',
    pos:'top-[6%] left-1/2 -translate-x-1/2',
    delay:'0s',
    border:'border-plasma/30'
  },

  {
    emoji:'🛡️',
    title:'CTF Rank #65',
    sub:'ApoorvCTF Global',
    color:'#ff4d6d',
    pos:'top-[32%] right-[-40px]',
    delay:'0.3s',
    border:'border-ember/30'
  },

  {
    emoji:'⚙️',
    title:'ServiceNow CSA',
    sub:'Certified Admin',
    color:'#a78bfa',
    pos:'bottom-[6%] right-[0px]',
    delay:'0.6s',
    border:'border-purple-400/30'
  },

  {
    emoji:'🥇',
    title:'CodeChef Gold',
    sub:'500+ Problems',
    color:'#ffd166',
    pos:'bottom-[6%] left-[0px]',
    delay:'0.9s',
    border:'border-gold/30'
  },

  {
    emoji:'⚡',
    title:'LeetCode',
    sub:'200+ Accepted',
    color:'#4cc9f0',
    pos:'top-[32%] left-[-40px]',
    delay:'1.2s',
    border:'border-electric/30'
  },
];


// ─── Pure CSS animated robot ───────────────────────────────────────────────
type Action = 'idle' | 'wave' | 'jump' | 'dance';

function RobotCSS({ action, primary }: { action: Action; primary: string }) {
  return (
    <>
      <style>{`
        @keyframes robotFloat {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          33%      { transform: translateY(-10px) rotate(-1.5deg); }
          66%      { transform: translateY(-5px) rotate(1deg); }
        }
        @keyframes robotJump {
          0%,100% { transform: translateY(0); }
          25%     { transform: translateY(-48px) scaleY(1.08); }
          50%     { transform: translateY(-52px); }
          75%     { transform: translateY(-8px) scaleY(0.95); }
        }
        @keyframes robotDance {
          0%,100% { transform: rotate(0deg) translateX(0); }
          20%     { transform: rotate(-10deg) translateX(-6px); }
          40%     { transform: rotate(10deg) translateX(6px); }
          60%     { transform: rotate(-8deg) translateX(-4px); }
          80%     { transform: rotate(8deg) translateX(4px); }
        }
        @keyframes waveArm {
          0%,100% { transform: rotate(-20deg); }
          50%     { transform: rotate(-80deg); }
        }
        @keyframes eyeBlink {
          0%,90%,100% { transform: scaleY(1); }
          95%         { transform: scaleY(0.07); }
        }
        @keyframes antennaBounce {
          0%,100% { transform: rotate(0deg); }
          50%     { transform: rotate(12deg); }
        }
        @keyframes chestPulse {
          0%,100% { opacity: 0.25; }
          50%     { opacity: 0.55; }
        }
        @keyframes ringRotate {
          from { transform: rotateX(70deg) rotateZ(0deg); }
          to   { transform: rotateX(70deg) rotateZ(360deg); }
        }
        @keyframes danceArm {
          0%,100% { transform: rotate(-20deg); }
          50%     { transform: rotate(-70deg); }
        }

        .robot-body {
          animation: robotFloat 3.5s ease-in-out infinite;
        }
        .robot-body.jumping {
          animation: robotJump 0.9s cubic-bezier(.36,.07,.19,.97) 2;
        }
        .robot-body.dancing {
          animation: robotDance 0.7s ease-in-out infinite;
        }
        .arm-right {
          transform-origin: 50% 0%;
          animation: robotFloat 3.5s ease-in-out infinite; /* subtle rest */
        }
        .arm-right.waving {
          animation: waveArm 0.4s ease-in-out infinite;
        }
        .arm-right.dancing {
          animation: danceArm 0.35s ease-in-out infinite;
        }
        .arm-left.dancing {
          animation: danceArm 0.35s ease-in-out 0.175s infinite reverse;
        }
        .eye-inner {
          animation: eyeBlink 4s step-end infinite;
        }
        .antenna-ball {
          animation: antennaBounce 1.8s ease-in-out infinite;
        }
        .chest-panel {
          animation: chestPulse 2s ease-in-out infinite;
        }
        .orbit-ring {
          animation: ringRotate 6s linear infinite;
          transform: rotateX(70deg);
        }
      `}</style>

      <div className="relative flex items-center justify-center" style={{ width: 240, height: 340 }}>
        {/* Orbit ring (behind robot) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: 40 }}>
          <div className="orbit-ring rounded-full border-2 opacity-40" style={{ width: 210, height: 210, borderColor: primary }} />
        </div>

        {/* Robot */}
        <div className={`robot-body ${action === 'jump' ? 'jumping' : ''} ${action === 'dance' ? 'dancing' : ''} relative cursor-pointer select-none`}
          style={{ width: 140, zIndex: 10 }}>

          {/* Antenna */}
          <div className="flex flex-col items-center mb-0.5">
            <div className="antenna-ball w-4 h-4 rounded-full shadow-lg" style={{ background: primary, boxShadow: `0 0 12px ${primary}` }} />
            <div className="w-1.5 h-6 rounded-sm" style={{ background: 'rgba(30,40,70,0.9)' }} />
          </div>

          {/* Head */}
          <div className="relative rounded-2xl mx-auto mb-0.5 flex items-center justify-center"
            style={{ width: 100, height: 80, background: 'linear-gradient(145deg, #0d1a30, #07101e)', border: `2px solid ${primary}30`, boxShadow: `0 0 20px ${primary}15` }}>
            {/* Visor */}
            <div className="rounded-xl flex items-center justify-around px-3"
              style={{ width: 84, height: 36, background: `${primary}18`, border: `1px solid ${primary}50` }}>
              {/* Eyes */}
              {[0, 1].map(i => (
                <div key={i} className="rounded-full flex items-center justify-center"
                  style={{ width: 20, height: 20, background: `${primary}20`, border: `1px solid ${primary}` }}>
                  <div className="eye-inner rounded-full" style={{ width: 12, height: 12, background: primary, boxShadow: `0 0 8px ${primary}` }} />
                </div>
              ))}
            </div>
            {/* Smile */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 rounded-full"
              style={{ width: 28, height: 5, background: `${primary}80` }} />
            {/* Ear ports */}
            {[-1, 1].map(side => (
              <div key={side} className="absolute rounded-sm"
                style={{
                  width: 6, height: 22,
                  [side < 0 ? 'left' : 'right']: -6,
                  top: '50%', transform: 'translateY(-50%)',
                  background: primary, opacity: 0.7,
                }} />
            ))}
          </div>

          {/* Body + Arms row */}
          <div className="relative flex items-start justify-center gap-0">
            {/* Left arm */}
            <div className={`arm-left ${action === 'dance' ? 'dancing' : ''}`}
              style={{ width: 18, marginTop: 8, transformOrigin: '50% 0%' }}>
              <div className="rounded-xl mx-auto" style={{ width: 14, height: 52, background: 'linear-gradient(180deg, #0d1a30, #07101e)', border: `1px solid ${primary}20` }} />
              <div className="rounded-full mx-auto mt-0.5" style={{ width: 14, height: 14, background: primary, opacity: 0.8 }} />
            </div>

            {/* Torso */}
            <div className="relative rounded-2xl flex flex-col items-center py-3 mx-1"
              style={{ width: 88, height: 100, background: 'linear-gradient(160deg, #0d1a30, #07101e)', border: `2px solid ${primary}25` }}>
              {/* Chest panel */}
              <div className="chest-panel rounded-lg flex flex-col items-center gap-1.5 p-2"
                style={{ width: 56, height: 64, background: `${primary}12`, border: `1px solid ${primary}35` }}>
                {[0.7, 0.5, 0.6].map((w, i) => (
                  <div key={i} className="rounded-full" style={{ width: `${w * 100}%`, height: 4, background: primary, opacity: 0.7 }} />
                ))}
                <div className="rounded-full mt-1" style={{ width: 12, height: 12, background: primary, opacity: 0.5 }} />
              </div>
            </div>

            {/* Right arm (wave arm) */}
            <div className={`arm-right ${action === 'wave' ? 'waving' : ''} ${action === 'dance' ? 'dancing' : ''}`}
              style={{ width: 18, marginTop: 8, transformOrigin: '50% 0%' }}>
              <div className="rounded-xl mx-auto" style={{ width: 14, height: 52, background: 'linear-gradient(180deg, #0d1a30, #07101e)', border: `1px solid ${primary}20` }} />
              <div className="rounded-full mx-auto mt-0.5" style={{ width: 14, height: 14, background: primary, opacity: 0.8 }} />
            </div>
          </div>

          {/* Legs */}
          <div className="flex justify-center gap-3 mt-0.5">
            {[0, 1].map(i => (
              <div key={i} className="rounded-xl" style={{ width: 26, height: 40, background: 'linear-gradient(180deg, #0d1a30, #07101e)', border: `1px solid ${primary}20` }} />
            ))}
          </div>
        </div>

        {/* Glow under robot */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full blur-xl pointer-events-none"
          style={{ width: 100, height: 16, background: primary, opacity: 0.12 }} />
      </div>
    </>
  );
}

// ─── Main exported component ────────────────────────────────────────────────
export default function CartoonScene({ securityMode = false }: { securityMode?: boolean }) {
  const [action, setAction] = useState<Action>('idle');
  const [clicks, setClicks] = useState(0);
  const [hint, setHint] = useState('Click the robot!');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const primary = securityMode ? '#ff4d6d' : '#00f5d4';

  const handleClick = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const actions: Action[] = ['wave', 'jump', 'dance'];
    const next = actions[clicks % 3];
    const hints: Record<Action, string> = {
      wave: '👋 Waving hello!',
      jump: '🦘 Look at those hops!',
      dance: '🕺 Robot dance party!',
      idle: 'Click the robot!',
    };
    setAction(next);
    setHint(hints[next]);
    setClicks(c => c + 1);
    timerRef.current = setTimeout(() => {
      setAction('idle');
      setHint('Click again for more!');
    }, next === 'dance' ? 3000 : next === 'jump' ? 1800 : 2000);
  }, [clicks]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Security mode label */}
      {securityMode && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full border border-ember/30 bg-ember/10 animate-pulse">
          <span className="text-[10px] font-mono text-ember">🛡️ SECURITY MODE</span>
        </div>
      )}

      {/* Robot — clickable */}
      <div onClick={handleClick} className="z-10 hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
        <RobotCSS action={action} primary={primary} />
      </div>

      {/* ── 5 Floating badge cards ─────────────────── */}
      {BADGES.map((b, i) => (
        <div key={b.title}
          className={`absolute ${b.pos} z-20 glass-card rounded-xl px-3.5 py-2.5 border ${b.border}`}
          style={{ animation: `floatBadge 3s ease-in-out ${b.delay} infinite` }}>
          <div className="text-[10px] font-mono font-semibold flex items-center gap-1.5" style={{ color: b.color }}>
            <span>{b.emoji}</span> {b.title}
          </div>
          <div className="text-[9px] text-slate-500 mt-0.5 pl-5">{b.sub}</div>
        </div>
      ))}

      {/* Interaction hint */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
        <span className="text-[10px] font-mono text-slate-600 bg-void/60 px-3 py-1 rounded-full">{hint}</span>
      </div>

      {/* Float animation for badges */}
      <style>{`
        @keyframes floatBadge {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-7px); }
        }
      `}</style>
    </div>
  );
}
