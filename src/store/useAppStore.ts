import { create } from 'zustand';

export type Alert = {
    id: string;
    level: 'critical' | 'warning' | 'info';
    message: string;
    time: string;
};

type AppState = {
    // Simulator Data
    totalCapacity: number;
    activeAssets: number;
    upRegulation: number;
    downRegulation: number;
    marketPrice: number;
    avgPrice: number;
    maxPrice: number;
    minPrice: number;

    // Alert System
    alerts: Alert[];
    addAlert: (alert: Alert) => void;
    clearAlerts: () => void;

    // Actions
    updateSimulation: (data: Partial<AppState>) => void;
};

export const useAppStore = create<AppState>((set) => ({
    // Initial State
    totalCapacity: 1250,
    activeAssets: 2847,
    upRegulation: 320,
    downRegulation: 185,
    marketPrice: 487.50,
    avgPrice: 465.20,
    maxPrice: 512.00,
    minPrice: 398.50,

    alerts: [],

    addAlert: (alert) => set((state) => ({
        alerts: [alert, ...state.alerts].slice(0, 50) // Keep last 50
    })),

    clearAlerts: () => set({ alerts: [] }),

    updateSimulation: (data) => set((state) => ({ ...state, ...data })),
}));
