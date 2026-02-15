'use client';
import { useEffect } from 'react';
import { usePortfolioStore } from '@/lib/store';
import { getDbLatency } from '@/lib/supabase';
import ModeSelector from './ModeSelector';
import EasterEggs from './EasterEggs';

export function Providers({ children }: { children: React.ReactNode }) {
  const { setSystemStatus, securityMode, modeModalOpen } = usePortfolioStore();

  // FPS monitor
  useEffect(() => {
    let frames = 0;
    let last = performance.now();
    let raf: number;

    const loop = (now: number) => {
      frames++;

      if (now - last >= 1000) {
        setSystemStatus({ fps: frames });
        frames = 0;
        last = now;
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, [setSystemStatus]);

  // DB latency ping every 30s
  useEffect(() => {
    const ping = async () => {
      const ms = await getDbLatency();

      setSystemStatus({
        dbLatency: ms,
        backend: ms !== null
      });
    };

    ping();

    const iv = setInterval(ping, 30000);

    return () => clearInterval(iv);
  }, [setSystemStatus]);

  // Apply security mode class
  useEffect(() => {
    document.documentElement.classList.toggle(
      'security-mode-active',
      securityMode
    );
  }, [securityMode]);

  return (
    <>
      {children}
      {modeModalOpen && <ModeSelector />}
      <EasterEggs />
    </>
  );
}
