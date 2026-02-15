'use client';
import { useState, useEffect, useRef } from 'react';

/* ── Full 36-char ASCII map (A-Z + 0-9 + punctuation) ───────────────────────── */
const ASCII:Record<string,string[]>={
A:['  ▄█▄  ',' █   █ ',' █████ ',' █   █ ',' █   █ '],
B:[' ████  ',' █   █ ',' ████  ',' █   █ ',' ████  '],
C:['  ████ ',' █     ',' █     ',' █     ','  ████ '],
D:[' ████  ',' █   █ ',' █   █ ',' █   █ ',' ████  '],
E:[' █████ ',' █     ',' ████  ',' █     ',' █████ '],
F:[' █████ ',' █     ',' ████  ',' █     ',' █     '],
G:['  ████ ',' █     ',' █  ██ ',' █   █ ','  ████ '],
H:[' █   █ ',' █   █ ',' █████ ',' █   █ ',' █   █ '],
I:[' █████ ','   █   ','   █   ','   █   ',' █████ '],
J:['   ███ ','    █  ','    █  ',' █  █  ','  ██   '],
K:[' █   █ ',' █  █  ',' ███   ',' █  █  ',' █   █ '],
L:[' █     ',' █     ',' █     ',' █     ',' █████ '],
M:[' █   █ ',' ██ ██ ',' █ █ █ ',' █   █ ',' █   █ '],
N:[' █   █ ',' ██  █ ',' █ █ █ ',' █  ██ ',' █   █ '],
O:['  ███  ',' █   █ ',' █   █ ',' █   █ ','  ███  '],
P:[' ████  ',' █   █ ',' ████  ',' █     ',' █     '],
Q:['  ███  ',' █   █ ',' █   █ ',' █  ██ ','  ████ '],
R:[' ████  ',' █   █ ',' ████  ',' █  █  ',' █   █ '],
S:['  ████ ',' █     ','  ███  ','     █ ',' ████  '],
T:[' █████ ','   █   ','   █   ','   █   ','   █   '],
U:[' █   █ ',' █   █ ',' █   █ ',' █   █ ','  ███  '],
V:[' █   █ ',' █   █ ',' █   █ ','  █ █  ','   █   '],
W:[' █   █ ',' █   █ ',' █ █ █ ',' ██ ██ ',' █   █ '],
X:[' █   █ ','  █ █  ','   █   ','  █ █  ',' █   █ '],
Y:[' █   █ ','  █ █  ','   █   ','   █   ','   █   '],
Z:[' █████ ','    █  ','   █   ','  █    ',' █████ '],

'0':['  ███  ',' █  ██ ',' █ █ █ ',' ██  █ ','  ███  '],
'1':['   █   ','  ██   ','   █   ','   █   ',' █████ '],
'2':[' ████  ','     █ ','  ███  ',' █     ',' █████ '],
'3':[' ████  ','     █ ','  ███  ','     █ ',' ████  '],
'4':[' █   █ ',' █   █ ',' █████ ','     █ ','     █ '],
'5':[' █████ ',' █     ',' ████  ','     █ ',' ████  '],
'6':['  ████ ',' █     ',' ████  ',' █   █ ','  ███  '],
'7':[' █████ ','     █ ','    █  ','   █   ','   █   '],
'8':['  ███  ',' █   █ ','  ███  ',' █   █ ','  ███  '],
'9':['  ███  ',' █   █ ','  ████ ','     █ ',' ████  '],

' ':['       ','       ','       ','       ','       '],
'!':['   █   ','   █   ','   █   ','       ','   █   '],
'?':[' ████  ','     █ ','   ██  ','       ','   █   '],
'.':['       ','       ','       ','       ','   █   '],
'+':['       ','   █   ',' █████ ','   █   ','       '],
'-':['       ','       ',' █████ ','       ','       '],
'_':['       ','       ','       ','       ',' █████ '],
'<':['     █ ','   ██  ','  █    ','   ██  ','     █ '],
'>':[' █     ','  ██   ','    █  ','  ██   ',' █     '],
'*':['       ',' █   █ ','   █   ',' █   █ ','       '],
'#':['   █   ',' █████ ','   █   ',' █████ ','   █   '],
'@':['  ███  ',' █   █ ',' █ ███ ',' █     ','  ████ '],
'&':['  ██   ',' █  █  ','  ██   ',' █  █  ','  ███  '],
'%':[' █    █','     █ ','   ██  ','  █    ',' █    █'],
};


function renderAscii(text: string): string {
  const chars = text.toUpperCase().split('');
  const lines = ['','','','',''];
  chars.forEach((c, ci) => {
    const map = ASCII[c] ?? ['   ','   ','   ','   ','   '];
    map.forEach((row, r) => { lines[r] += (ci > 0 ? ' ' : '') + row; });
  });
  return lines.join('\n');
}

/* ── Reveal Card wrapper ──────────────────────────────────────────────────── */
interface ExpCardProps {
  id: string; label: string; labelColor: string;
  why: string; learned: string; explores: string;
  children: React.ReactNode;
}
function ExpCard({ id, label, labelColor, why, learned, explores, children }: ExpCardProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card rounded-2xl border border-white/5 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: labelColor }}>{label}</span>
        <button
          onClick={() => setOpen(v => !v)}
          className="flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full border transition-all duration-200"
          style={{
            borderColor: open ? `${labelColor}50` : 'rgba(255,255,255,0.08)',
            color: open ? labelColor : '#64748b',
            background: open ? `${labelColor}12` : 'transparent',
          }}
        >
          {open ? '▲ hide' : '🧠 reveal intent'}
        </button>
      </div>

      {/* Reveal panel */}
      <div style={{ maxHeight: open ? '400px' : '0', overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
        <div className="px-5 py-4 border-b border-white/5 grid gap-2.5" style={{ background: 'rgba(255,255,255,0.015)' }}>
          {[
            { icon: '🎯', label: 'Why I built this', text: why, c: labelColor },
            { icon: '📚', label: 'What I learned', text: learned, c: '#4cc9f0' },
            { icon: '🔬', label: 'Problem explored', text: explores, c: '#a78bfa' },
          ].map(item => (
            <div key={item.label} className="rounded-xl p-3" style={{ background: `${item.c}09`, border: `1px solid ${item.c}18` }}>
              <div className="text-[9px] font-mono uppercase tracking-widest mb-1.5" style={{ color: item.c }}>
                {item.icon} {item.label}
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Experiment content */}
      <div className="p-5 flex-1">{children}</div>
    </div>
  );
}

/* ── EXP 01: Full ASCII Art ───────────────────────────────────────────────── */
function AsciiExp() {
  const [text, setText] = useState('KAVYA');
  const [color, setColor] = useState('#00f5d4');
  const colors = ['#00f5d4','#ff4d6d','#ffd166','#4cc9f0','#a78bfa','#f472b6','#ffffff'];

  const sanitize = (v: string) => v.replace(/[^\w\s!?.+\-_<>*#@&%]/g, '').slice(0, 14);

  return (
    <ExpCard
      id="ascii" label="EXP-01 // ASCII Art Generator" labelColor="#ffd166"
      why="Text rendering without fonts forces you to understand that every glyph is just a spatial grid — same problem typefaces solve, just with higher resolution."
      learned="Building a full character map taught me that small decisions (pixel width per char, spacing rules) cascade into major legibility differences."
      explores="What is the minimum pixel grid needed to make each character uniquely identifiable to the human eye?"
    >
      <div className="space-y-3">
        <input
          value={text}
          onChange={e => setText(sanitize(e.target.value))}
          maxLength={14}
          placeholder="Type anything (A–Z, 0–9, symbols)…"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono text-white placeholder-slate-600 focus:outline-none focus:border-gold/40 transition-colors"
          spellCheck={false}
        />
        <div className="flex items-center gap-2 flex-wrap">
          {colors.map(c => (
            <button key={c} onClick={() => setColor(c)}
              className="w-5 h-5 rounded-full border-2 transition-all hover:scale-110"
              style={{ background: c, borderColor: color === c ? 'white' : 'transparent' }}
            />
          ))}
          <span className="text-[9px] text-slate-600 font-mono ml-1">{text.length}/14 chars</span>
        </div>
        <div className="rounded-xl overflow-x-auto" style={{ background: 'rgba(3,5,8,0.7)', padding: '12px 14px' }}>
          <pre className="font-mono text-[8.5px] leading-[1.25rem] whitespace-pre"
            style={{ color, textShadow: `0 0 10px ${color}70` }}>
            {renderAscii(text) || '(type something)'}
          </pre>
        </div>
      </div>
    </ExpCard>
  );
}

/* ── EXP 02: Threat Model ─────────────────────────────────────────────────── */
function ThreatExp() {
  const [hov, setHov] = useState<string|null>(null);
  const nodes = [
    { id:'user',  label:'User Browser',  x:50, y:35,  color:'#4cc9f0', threats:'XSS, CSRF, session hijacking, clickjacking, localStorage theft' },
    { id:'cdn',   label:'CDN / Edge',    x:50, y:110, color:'#00f5d4', threats:'Cache poisoning, request smuggling, origin exposure' },
    { id:'api',   label:'API Gateway',   x:50, y:185, color:'#ffd166', threats:'Auth bypass, mass assignment, rate limit abuse, CORS misconfig' },
    { id:'auth',  label:'Auth Service',  x:80, y:185, color:'#a78bfa', threats:'Brute force, JWT forgery, timing attacks, password spraying' },
    { id:'db',    label:'Database',      x:30, y:265, color:'#ff4d6d', threats:'SQL injection, privilege escalation, data exfiltration, IDOR' },
    { id:'ai',    label:'AI Service',    x:70, y:265, color:'#f472b6', threats:'Prompt injection, model extraction, adversarial inputs, data poisoning' },
  ];
  const edges = [['user','cdn'],['cdn','api'],['api','auth'],['api','db'],['api','ai']];
  return (
    <ExpCard
      id="threat" label="EXP-02 // Threat Model Visualizer" labelColor="#ff4d6d"
      why="Every system I design, I map threats first. This makes that invisible mental process visible and interactive."
      learned="Threat modeling is most valuable early — retrofitting security architecture costs 10× more than designing for it upfront."
      explores="Can you make threat modeling visual enough that non-security developers actually engage with it?"
    >
      <p className="text-[10px] text-slate-500 font-mono mb-3">Hover any node to reveal its attack surface</p>
      <div className="relative" style={{ height: 310 }}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {edges.map(([f,t]) => {
            const fn = nodes.find(n => n.id === f)!;
            const tn = nodes.find(n => n.id === t)!;
            const active = hov === f || hov === t;
            return (
              <line key={`${f}-${t}`}
                x1={`${fn.x}%`} y1={fn.y + 16} x2={`${tn.x}%`} y2={tn.y}
                stroke={active ? '#00f5d4' : 'rgba(255,255,255,0.07)'}
                strokeWidth={active ? 1.5 : 1} strokeDasharray="4 4"
                style={{ transition: 'all 0.2s' }}
              />
            );
          })}
        </svg>
        {nodes.map(n => {
          const isH = hov === n.id;
          return (
            <div key={n.id} className="absolute -translate-x-1/2"
              style={{ left: `${n.x}%`, top: n.y }}
              onMouseEnter={() => setHov(n.id)} onMouseLeave={() => setHov(null)}>
              <div className="px-3 py-1.5 rounded-lg text-[11px] font-mono text-white border transition-all duration-200 whitespace-nowrap"
                style={{
                  background: isH ? `${n.color}22` : `${n.color}0e`,
                  borderColor: isH ? n.color : `${n.color}28`,
                  boxShadow: isH ? `0 0 24px ${n.color}50` : 'none',
                  transform: isH ? 'scale(1.06)' : 'scale(1)',
                }}>
                {n.label}
              </div>
              {isH && (
                <div className="absolute z-20 mt-1 left-1/2 -translate-x-1/2 w-56 rounded-xl border border-ember/30 p-2.5 pointer-events-none"
                  style={{ background: '#0a0e17', boxShadow: '0 12px 40px rgba(0,0,0,0.7)' }}>
                  <div className="text-[9px] text-ember uppercase font-mono mb-1">⚠ Attack Vectors</div>
                  <p className="text-[10px] text-slate-300 leading-relaxed">{n.threats}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ExpCard>
  );
}

/* ── EXP 03: Scroll Skills ────────────────────────────────────────────────── */
function ScrollSkillsExp() {
  const [pct, setPct] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fn = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      setPct(Math.max(0, Math.min(1, 1 - r.top / window.innerHeight)));
    };
    window.addEventListener('scroll', fn, { passive: true }); fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const skills = [
    { name: 'Cloud Architecture (GCP)', score: 90, color: '#00f5d4' },
    { name: 'AI & Machine Learning',    score: 88, color: '#a78bfa' },
    { name: 'Full-Stack Development',   score: 87, color: '#4cc9f0' },
    { name: 'Application Security',     score: 85, color: '#ff4d6d' },
    { name: 'Mobile (Flutter/Android)', score: 83, color: '#ffd166' },
    { name: 'Community Leadership',     score: 92, color: '#f472b6' },
  ];
  return (
    <ExpCard
      id="scroll" label="EXP-03 // Scroll-Driven Skills" labelColor="#00f5d4"
      why="Static skill bars feel like a lie. Tying them to scroll position makes the reveal feel earned, not pre-set."
      learned="Scroll events fire at very high frequency — naive handlers cause jank. Passive listeners + RAF batching are essential."
      explores="Can scroll-driven animation make a CV section feel genuinely interactive without being gimmicky?"
    >
      <div ref={ref} className="space-y-3.5">
        {skills.map((s, i) => {
          const w = Math.round(pct * s.score);
          return (
            <div key={s.name}>
              <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                <span>{s.name}</span>
                <span style={{ color: s.color }}>{w}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${w}%`, background: `linear-gradient(90deg, ${s.color}, ${s.color}90)` }} />
              </div>
            </div>
          );
        })}
        <p className="text-[9px] text-slate-600 font-mono mt-2 text-right">↑ scroll the page to animate</p>
      </div>
    </ExpCard>
  );
}

/* ── EXP 04: Password Strength Visualizer ─────────────────────────────── */
function PasswordStrengthExp() {
  const [pwd,setPwd]=useState('');

  const analyze=(p:string)=>{
    let score=0;
    const checks={
      length:p.length>=12,
      upper:/[A-Z]/.test(p),
      lower:/[a-z]/.test(p),
      number:/\d/.test(p),
      symbol:/[^A-Za-z0-9]/.test(p),
      entropy:new Set(p).size>=6,
    };
    Object.values(checks).forEach(v=>{if(v)score+=1});
    return {score,checks};
  };

  const {score,checks}=analyze(pwd);

  const levels=[
    {label:'Very Weak',color:'#ff4d6d'},
    {label:'Weak',color:'#ff8c42'},
    {label:'Fair',color:'#ffd166'},
    {label:'Strong',color:'#4cc9f0'},
    {label:'Very Strong',color:'#00f5d4'},
    {label:'Elite',color:'#a78bfa'},
  ];

  const level=levels[Math.min(score,levels.length-1)];

  return(
    <ExpCard
      id="password"
      label="EXP-04 // Password Strength Visualizer"
      labelColor="#a78bfa"
      why="Authentication is the first line of defense. This experiment makes password strength tangible instead of abstract."
      learned="Entropy matters more than length alone. Complexity, randomness, and unpredictability define real strength."
      explores="How do attackers evaluate passwords, and how can visual feedback encourage better security behaviour?"
    >
      <div className="space-y-4">

        {/* Input */}
        <input
          type="text"
          value={pwd}
          onChange={e=>setPwd(e.target.value.slice(0,32))}
          placeholder="Type a password..."
          spellCheck={false}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono text-white placeholder-slate-600 focus:outline-none focus:border-plasma/40"
        />

        {/* Strength bar */}
        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span style={{color:level.color}}>Strength: {level.label}</span>
            <span className="text-slate-500">{score}/6</span>
          </div>

          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width:`${(score/6)*100}%`,
                background:`linear-gradient(90deg,${level.color},${level.color}90)`,
                boxShadow:`0 0 12px ${level.color}60`
              }}
            />
          </div>
        </div>

        {/* Checklist */}
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(checks).map(([k,v])=>(
            <div
              key={k}
              className="text-[11px] font-mono px-3 py-2 rounded-lg border"
              style={{
                borderColor:v?'#00f5d450':'rgba(255,255,255,0.08)',
                color:v?'#00f5d4':'#64748b',
                background:v?'#00f5d410':'transparent'
              }}
            >
              {v?'✓':'○'} {k}
            </div>
          ))}
        </div>

        {/* Insight */}
        <div className="text-[10px] text-slate-500 font-mono">
          Estimated brute-force resistance improves exponentially with entropy.
        </div>

      </div>
    </ExpCard>
  );
}


/* ── Main ─────────────────────────────────────────────────────────────────── */
export default function ExperimentsPage() {
  return (
    <main className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      <div className="mb-12">
        <p className="text-xs font-mono text-plasma uppercase tracking-widest mb-3">// The Lab</p>
        <h1 className="font-display text-5xl font-bold text-white mb-4">Experiments</h1>
        <p className="text-slate-400 text-lg max-w-xl">
          Interactive demos where code meets curiosity.{' '}
          <span className="font-mono text-sm text-plasma">🧠 reveal intent</span>{' '}
          on any experiment to see the thinking behind it.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <AsciiExp />
        <ThreatExp />
        <ScrollSkillsExp />
        <PasswordStrengthExp />
      </div>
      <div className="mt-12 glass-card rounded-2xl border border-plasma/10 bg-plasma/5 p-8 text-center">
        <div className="text-3xl mb-3">🧪</div>
        <h2 className="font-display text-xl font-bold text-white mb-2">More experiments incoming</h2>
        <p className="text-slate-400 text-sm">WebGL shaders · Real-time AI · Spatial UI · Sound visualization</p>
      </div>
    </main>
  );
}
