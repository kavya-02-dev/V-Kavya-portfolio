'use client';

import { create } from 'zustand';

type UserMode = 'recruiter' | 'developer' | 'curious' | null;

interface PortfolioStore {
  // User mode
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;

  // Thought process mode
  thoughtProcessMode: boolean;
  toggleThoughtProcess: () => void;

  // Security mode
  securityMode: boolean;
  toggleSecurityMode: () => void;

  // System status
  systemStatus: {
    backend: boolean;
    dbLatency: number;
    fps: number;
    secure: boolean;
  };
  setSystemStatus: (status: Partial<PortfolioStore['systemStatus']>) => void;

  // Active section for nav highlighting
  activeSection: string;
  setActiveSection: (section: string) => void;

  // Cursor position for custom cursor
  cursorPos: { x: number; y: number };
  setCursorPos: (pos: { x: number; y: number }) => void;
  isHovering: boolean;
  setIsHovering: (val: boolean) => void;

  // Mode selector modal
  modeModalOpen: boolean;
  setModeModalOpen: (val: boolean) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  userMode: null,
  setUserMode: (mode) => set({ userMode: mode, modeModalOpen: false }),

  thoughtProcessMode: false,
  toggleThoughtProcess: () =>
    set((state) => ({ thoughtProcessMode: !state.thoughtProcessMode })),

  securityMode: false,
  toggleSecurityMode: () =>
    set((state) => ({ securityMode: !state.securityMode })),

  systemStatus: {
    backend: true,
    dbLatency: 0,
    fps: 60,
    secure: true,
  },
  setSystemStatus: (status) =>
    set((state) => ({
      systemStatus: { ...state.systemStatus, ...status },
    })),

  activeSection: 'home',
  setActiveSection: (section) => set({ activeSection: section }),

  cursorPos: { x: 0, y: 0 },
  setCursorPos: (pos) => set({ cursorPos: pos }),
  isHovering: false,
  setIsHovering: (val) => set({ isHovering: val }),

  modeModalOpen: false,
  setModeModalOpen: (val) => set({ modeModalOpen: val }),
}));
