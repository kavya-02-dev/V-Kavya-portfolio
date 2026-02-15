/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#030508',
        obsidian: '#0a0e17',
        'deep-space': '#0d1424',
        plasma: '#00f5d4',
        'plasma-dim': '#00c4a7',
        ember: '#ff4d6d',
        'ember-glow': '#ff7096',
        gold: '#ffd166',
        'electric-blue': '#4cc9f0',
        slate: {
          850: '#1a2235',
          900: '#111827',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        'scan-line': 'scanLine 3s linear infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
        typewriter: 'typewriter 3s steps(40) forwards',
        shimmer: 'shimmer 2.5s linear infinite',
        'orbit-1': 'orbit1 12s linear infinite',
        'orbit-2': 'orbit2 18s linear infinite reverse',
        'orbit-3': 'orbit3 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          from: { textShadow: '0 0 10px #00f5d4, 0 0 20px #00f5d4' },
          to: { textShadow: '0 0 20px #00f5d4, 0 0 40px #00f5d4, 0 0 80px #00f5d4' },
        },
        scanLine: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        orbit1: {
          from: { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          to: { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        orbit2: {
          from: { transform: 'rotate(0deg) translateX(180px) rotate(0deg)' },
          to: { transform: 'rotate(360deg) translateX(180px) rotate(-360deg)' },
        },
        orbit3: {
          from: { transform: 'rotate(45deg) translateX(240px) rotate(-45deg)' },
          to: { transform: 'rotate(405deg) translateX(240px) rotate(-405deg)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'plasma': '0 0 30px rgba(0, 245, 212, 0.3)',
        'plasma-lg': '0 0 60px rgba(0, 245, 212, 0.4)',
        'ember': '0 0 30px rgba(255, 77, 109, 0.3)',
        'gold': '0 0 30px rgba(255, 209, 102, 0.3)',
        'card': '0 4px 40px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 60px rgba(0, 245, 212, 0.15)',
      },
    },
  },
  plugins: [],
};
