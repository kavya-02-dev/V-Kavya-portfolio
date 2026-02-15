'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePortfolioStore } from '@/lib/store';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/experiments', label: 'Lab' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { thoughtProcessMode, toggleThoughtProcess, securityMode, toggleSecurityMode, setModeModalOpen, userMode } =
    usePortfolioStore();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 glass-card border-b border-white/5 backdrop-blur-xl'
          : 'py-6 bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #00f5d4, #4cc9f0)' }}>
            <span className="text-void font-bold text-sm font-display">K</span>
          </div>
          <span className="font-display font-bold text-white group-hover:text-plasma transition-colors">
            V Kavya
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'text-plasma bg-plasma/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mode Controls */}
        <div className="hidden md:flex items-center gap-2">
          {/* Mode selector */}
          <button
            onClick={() => setModeModalOpen(true)}
            className="text-xs font-mono px-3 py-1.5 rounded-full border border-white/10 text-slate-400 hover:border-plasma/40 hover:text-plasma transition-all"
          >
            {userMode ? `MODE: ${userMode.toUpperCase()}` : 'SELECT MODE'}
          </button>

          {/* Thought Process Toggle */}
          <button
            onClick={toggleThoughtProcess}
            title="Toggle Thought Process Mode"
            className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all ${
              thoughtProcessMode
                ? 'border-electric-blue/50 text-electric-blue bg-electric-blue/10'
                : 'border-white/10 text-slate-400 hover:border-white/30'
            }`}
          >
            🧠 THINK
          </button>

          {/* Security Mode Toggle */}
          <button
            onClick={toggleSecurityMode}
            title="Toggle Security Mode"
            className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all ${
              securityMode
                ? 'border-ember/50 text-ember bg-ember/10'
                : 'border-white/10 text-slate-400 hover:border-white/30'
            }`}
          >
            🛡️ SEC
          </button>

          {/* Contact CTA */}
          <a
            href="/contact"
            className="text-xs font-medium px-4 py-1.5 rounded-full bg-plasma text-void hover:opacity-90 transition-all"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`h-px bg-current transition-all ${mobileOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
            <span className={`h-px bg-current transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`h-px bg-current transition-all ${mobileOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-card border-t border-white/5 px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm ${
                pathname === link.href ? 'text-plasma bg-plasma/10' : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 mt-2 flex-wrap">
            <button onClick={toggleThoughtProcess} className="text-xs font-mono px-3 py-1.5 rounded-full border border-white/10 text-slate-400">
              🧠 THINK: {thoughtProcessMode ? 'ON' : 'OFF'}
            </button>
            <button onClick={toggleSecurityMode} className="text-xs font-mono px-3 py-1.5 rounded-full border border-white/10 text-slate-400">
              🛡️ SEC: {securityMode ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
