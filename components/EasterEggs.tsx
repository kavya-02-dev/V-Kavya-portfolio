'use client';
import { useEffect, useState, useCallback, useRef } from 'react';

export const EGGS = [
  { id:'konami',       rarity:'LEGENDARY', emoji:'🎮', color:'#ffd166', name:'KONAMI CODE!',         desc:'↑↑↓↓←→←→BA — you speak the ancient language. +30 lives granted.' },
  { id:'ctf',          rarity:'RARE',      emoji:'🚩', color:'#ff4d6d', name:'CTF FLAG FOUND',        desc:'KVY{y0u_th1nk_l1k3_4_h4ck3r_fr13nd} — ApoorvCTF Global Rank 65 vibes!' },
  { id:'gcp',          rarity:'EPIC',      emoji:'☁️', color:'#00f5d4', name:'CLOUD WIZARD',          desc:'Triple GCP certified — ML Engineer + Data Engineer + ACE. You noticed.' },
  { id:'night-owl',    rarity:'UNCOMMON',  emoji:'🌙', color:'#a78bfa', name:'NIGHT OWL',             desc:"You're visiting after midnight. Kavya debugs at 2AM too. Solidarity." },
  { id:'speed-reader', rarity:'RARE',      emoji:'⚡', color:'#4cc9f0', name:'SPEED READER',          desc:'Full page in under 10 seconds. Recruiter on deadline or caffeine overload.' },
  { id:'dev-tools',    rarity:'UNCOMMON',  emoji:'🔧', color:'#f472b6', name:'DEV DETECTED',          desc:'DevTools open? Welcome, fellow inspector. Check the console for a secret.' },
  { id:'triple-click', rarity:'COMMON',    emoji:'🖱️', color:'#ffd166', name:'TRIPLE CLICKER',        desc:'Three rapid clicks! Either stress-testing or excited. Hi either way.' },
  { id:'idle',         rarity:'COMMON',    emoji:'😴', color:'#00f5d4', name:'STILL THERE?',          desc:"30 seconds idle. Contemplating a career pivot? Take your time." },
  { id:'contact5',     rarity:'UNCOMMON',  emoji:'💌', color:'#ff4d6d', name:'ALMOST THERE!',         desc:"Hovered Contact 5 times. The Send button is friendly, promise." },
  { id:'all-found',    rarity:'★ MASTER ★',emoji:'🏆', color:'#ffd166', name:'EGG MASTER',            desc:'ALL 10 EGGS FOUND! Apply for Kavya\'s open-source team immediately.' },
];

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

function Toast({ egg, onClose }: { egg: typeof EGGS[0]; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 7500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed bottom-28 right-6 z-[9999] max-w-xs w-full pointer-events-auto"
      style={{ animation: 'eggIn 0.45s cubic-bezier(0.34,1.56,0.64,1)' }}>
      <style>{`
        @keyframes eggIn{from{opacity:0;transform:translateX(60px) scale(0.85)}to{opacity:1;transform:none}}
        @keyframes shrink{from{width:100%}to{width:0%}}
        @keyframes wiggle{0%,100%{transform:rotate(0)}25%{transform:rotate(-12deg)}75%{transform:rotate(12deg)}}
      `}</style>
      <div className="relative rounded-2xl border overflow-hidden shadow-2xl"
        style={{ background: 'rgba(8,12,22,0.97)', borderColor: `${egg.color}45`, backdropFilter: 'blur(24px)' }}>
        <div style={{ height: 2, background: egg.color }} />
        <div className="p-4 flex gap-3">
          <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-xl"
            style={{ background: `${egg.color}18`, animation: 'wiggle 0.55s ease 0.1s' }}>
            {egg.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[8px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded-full"
                style={{ color: egg.color, background: `${egg.color}18` }}>
                🥚 {egg.rarity}
              </span>
            </div>
            <h4 className="font-display font-bold text-white text-sm leading-tight">{egg.name}</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5">{egg.desc}</p>
          </div>
          <button onClick={onClose} className="shrink-0 text-slate-600 hover:text-slate-300 text-lg leading-none mt-0.5">×</button>
        </div>
        <div className="h-0.5 bg-white/5">
          <div className="h-full" style={{ background: egg.color, animation: 'shrink 7.5s linear forwards' }} />
        </div>
      </div>
    </div>
  );
}

export default function EasterEggs() {
  const [found, setFound] = useState<string[]>([]);
  const [queue, setQueue] = useState<typeof EGGS[0][]>([]);
  const clickTimes = useRef<number[]>([]);
  const idleTimer = useRef<ReturnType<typeof setTimeout>|null>(null);
  const konamiRef = useRef<string[]>([]);
  const ctfRef = useRef('');
  const gcpRef = useRef('');
  const [pageLoad] = useState(Date.now());
  const contactHovers = useRef(0);

  const trigger = useCallback((id: string) => {
    setFound(prev => {
      if (prev.includes(id)) return prev;
      const egg = EGGS.find(e => e.id === id);
      if (!egg) return prev;
      setQueue(q => [...q, egg]);
      const next = [...prev, id];
      // Trigger all-found when 9 non-master eggs found
      if (next.length === 9 && !next.includes('all-found')) {
        setTimeout(() => trigger('all-found'), 1800);
      }
      return next;
    });
  }, []);

  // 1. Konami
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      konamiRef.current = [...konamiRef.current, e.key].slice(-10);
      if (konamiRef.current.join(',') === KONAMI.join(',')) trigger('konami');
    };
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h);
  }, [trigger]);

  // 2. CTF keyword
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      ctfRef.current = (ctfRef.current + e.key).slice(-5).toLowerCase();
      if (ctfRef.current.includes('ctf') || ctfRef.current.includes('flag')) trigger('ctf');
    };
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h);
  }, [trigger]);

  // 3. GCP keyword
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      gcpRef.current = (gcpRef.current + e.key).slice(-3).toLowerCase();
      if (gcpRef.current === 'gcp') trigger('gcp');
    };
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h);
  }, [trigger]);

  // 4. Night owl
  useEffect(() => {
    const hr = new Date().getHours();
    if (hr >= 0 && hr < 5) { const t = setTimeout(() => trigger('night-owl'), 3000); return () => clearTimeout(t); }
  }, [trigger]);

  // 5. Speed reader
  useEffect(() => {
    const h = () => {
      const done = window.scrollY + window.innerHeight >= document.body.scrollHeight * 0.94;
      const fast = (Date.now() - pageLoad) / 1000 < 10;
      if (done && fast) trigger('speed-reader');
    };
    window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h);
  }, [trigger, pageLoad]);

  // 6. DevTools detection
  useEffect(() => {
    let fired = false;
    const check = () => {
      if (fired) return;
      if (window.outerWidth - window.innerWidth > 150 || window.outerHeight - window.innerHeight > 150) {
        fired = true; trigger('dev-tools');
        console.log('%c🔧 Dev detected! KVY{c0ns0l3_h4ck3r_found_this}', 'color:#f472b6;font-size:14px;font-weight:bold;font-family:monospace');
      }
    };
    window.addEventListener('resize', check);
    const iv = setInterval(check, 2000);
    return () => { window.removeEventListener('resize', check); clearInterval(iv); };
  }, [trigger]);

  // 7. Triple click
  useEffect(() => {
    const h = () => {
      const now = Date.now();
      clickTimes.current = [...clickTimes.current, now].filter(t => now - t < 650);
      if (clickTimes.current.length >= 3) { clickTimes.current = []; trigger('triple-click'); }
    };
    window.addEventListener('click', h); return () => window.removeEventListener('click', h);
  }, [trigger]);

  // 8. Idle 30s
  useEffect(() => {
    const reset = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => trigger('idle'), 30000);
    };
    ['mousemove','keydown','scroll','click'].forEach(e => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      ['mousemove','keydown','scroll','click'].forEach(e => window.removeEventListener(e, reset));
    };
  }, [trigger]);

  // 9. Contact hover × 5
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest?.('[data-contact-cta]')) {
        contactHovers.current++;
        if (contactHovers.current >= 5) trigger('contact5');
      }
    };
    window.addEventListener('mouseover', h, { passive: true });
    return () => window.removeEventListener('mouseover', h);
  }, [trigger]);

  const dismiss = useCallback(() => setQueue(q => q.slice(1)), []);

  return (
    <>
      {queue[0] && <Toast egg={queue[0]} onClose={dismiss} />}
      {found.length > 0 && (
        <div className="fixed bottom-6 left-20 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-white/10 select-none"
          title={`Found: ${found.join(', ')}`}>
          <span className="text-[10px] font-mono" style={{ color: '#ffd166' }}>
            🥚 {found.length}/{EGGS.length}
          </span>
          {found.length === EGGS.length && (
            <span className="text-[9px] font-mono text-yellow-400/50 animate-pulse">ALL FOUND!</span>
          )}
        </div>
      )}
    </>
  );
}
