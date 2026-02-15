'use client';

import { useEffect, useRef } from 'react';
import { usePortfolioStore } from '@/lib/store';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const { isHovering, securityMode } = usePortfolioStore();

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    animate();

    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  const color = securityMode ? '#ff4d6d' : '#00f5d4';

  return (
    <>
      {/* Dot cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-opacity"
        style={{
          background: color,
          boxShadow: `0 0 10px ${color}`,
          willChange: 'transform',
        }}
      />
      {/* Ring follower */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] transition-all duration-150"
        style={{
          border: `1.5px solid ${color}`,
          opacity: isHovering ? 0.8 : 0.3,
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
          willChange: 'transform',
        }}
      />
    </>
  );
}
