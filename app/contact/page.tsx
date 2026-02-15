'use client';

import { useState, useRef } from 'react';
import { usePortfolioStore } from '@/lib/store';
import { personalInfo } from '@/lib/data';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactPage() {
  const { userMode, securityMode } = usePortfolioStore();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const pageLoadTime = useRef(Date.now());

  const sanitizeInput = (val: string) =>
    val.replace(/<[^>]*>/g, '').replace(/[<>"'&]/g, '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: sanitizeInput(e.target.value) }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg('All fields are required.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (form.message.length < 10) {
      setErrorMsg('Message must be at least 10 characters.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          userMode: userMode || 'unknown',
          website: honeypot,
          submittedAt: pageLoadTime.current,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setErrorMsg(`Network error. Email me directly: ${personalInfo.email}`);
      setStatus('error');
    }
  };

  return (
    <main className="pt-32 pb-20 max-w-5xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-xs font-mono text-plasma uppercase tracking-widest mb-4">// Contact</p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Let's Build<br /><span className="plasma-text">Something.</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-10">
            I'm open to SWE roles, security engagements, and meaningful collaborations.
            I usually reply within 24 hours.
          </p>

          <div className="space-y-3 mb-10">
            {[
              { label: 'Email', val: personalInfo.email, href: `mailto:${personalInfo.email}`, color: '#00f5d4', icon: '📧' },
              { label: 'LinkedIn', val: 'kavya-v-02u', href: personalInfo.linkedin, color: '#4cc9f0', icon: '💼' },
              { label: 'GitHub', val: 'kavya-02-dev', href: personalInfo.github, color: '#a78bfa', icon: '💻' },
              { label: 'LeetCode', val: 'kavya_02v', href: personalInfo.leetcode, color: '#ffd166', icon: '⚡' },
              { label: 'Location', val: personalInfo.location, href: null, color: '#f472b6', icon: '📍' },
            ].map((c) => (
              <div key={c.label} className="glass-card rounded-xl p-4 border border-white/5 flex items-center gap-3">
                <span>{c.icon}</span>
                <div>
                  <div className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">{c.label}</div>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-slate-300 hover:text-plasma transition-colors">
                      {c.val}
                    </a>
                  ) : (
                    <div className="text-sm text-slate-300">{c.val}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {securityMode && (
            <div className="rounded-xl border border-ember/20 bg-ember/5 p-5">
              <div className="text-xs font-mono text-ember uppercase mb-3">🛡️ Form Security Layers</div>
              <ul className="space-y-1.5 text-[11px] text-slate-400 font-mono">
                {[
                  'Honeypot field traps automated bots',
                  'Page-load timing check (rejects bots)',
                  'XSS: HTML stripped client + server',
                  'SQLi: Parameterized queries only',
                  'Email regex validated on both sides',
                  'Control chars stripped from all inputs',
                  'Malicious pattern detector (10+ patterns)',
                  'Rate limited: 5 requests / hour / IP',
                  'CORS: Own domain only',
                  'Supabase RLS — anon INSERT only',
                ].map((s) => <li key={s}>✓ {s}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div className="glass-card rounded-2xl border border-white/5 p-8">
          <div className="text-xs font-mono text-plasma uppercase tracking-wider mb-6">Send a Message</div>

          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-slate-400 text-sm">Kavya will reply within 24 hours.</p>
              <button onClick={() => setStatus('idle')} className="mt-6 text-sm text-plasma hover:underline">
                Send another →
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <input
                type="text" name="website" value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1} autoComplete="off" aria-hidden="true"
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, width: 0 }}
              />

              {[
                { label: 'Name', name: 'name', placeholder: 'Your name', type: 'text' },
                { label: 'Email', name: 'email', placeholder: 'your@email.com', type: 'email' },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">{f.label} *</label>
                  <input
                    type={f.type} name={f.name}
                    value={form[f.name as keyof typeof form]}
                    onChange={handleChange} placeholder={f.placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-plasma/50 transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Message *</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange} rows={5}
                  placeholder="What are you working on? What role? Let's connect."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-plasma/50 transition-colors resize-none"
                />
                <div className="text-[10px] text-slate-600 mt-1 text-right font-mono">{form.message.length}/2000</div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-lg bg-ember/10 border border-ember/30 text-ember text-sm">{errorMsg}</div>
              )}

              <button
                onClick={handleSubmit} disabled={status === 'loading'}
                className="w-full py-4 rounded-xl font-semibold text-void transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #00f5d4, #4cc9f0)' }}
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-void/30 border-t-void rounded-full animate-spin" />
                    Sending securely...
                  </span>
                ) : 'Send Message →'}
              </button>
              <p className="text-center text-[10px] text-slate-600 font-mono">🔒 Secured · Reply within 24h</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
