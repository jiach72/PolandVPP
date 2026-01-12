import { useEffect } from 'react';
import { useAppStore, Alert } from '@/store/useAppStore';
import { toast } from 'sonner';

// 辅助函数：生成带波动的随机数
function fluctuate(baseValue: number, fluctuationRange: number = 0.01) {
    const delta = baseValue * fluctuationRange;
    const change = (Math.random() - 0.5) * 2 * delta;
    return baseValue + change;
}

const ALERT_MESSAGES = [
    { level: 'warning', msg: 'Grid Frequency Deviation High (>50.05Hz)' },
    { level: 'critical', msg: 'Asset Link Lost: Wind Farm Kraków' },
    { level: 'info', msg: 'New Dispatch Order Received' },
    { level: 'warning', msg: 'Voltage Sag Detected in Region B' },
    { level: 'info', msg: 'Market Price Updated' },
    { level: 'critical', msg: 'Inverter Communication Failure: PV Warsaw' },
];

export function useLiveData() {
    const {
        totalCapacity, activeAssets, upRegulation, downRegulation,
        marketPrice, avgPrice, maxPrice, minPrice,
        updateSimulation, addAlert
    } = useAppStore();

    useEffect(() => {
        // 1. Simulation Loop (Data updates)
        const interval = setInterval(() => {
            updateSimulation({
                totalCapacity: 1250,
                activeAssets: Math.floor(fluctuate(2847, 0.005)),
                upRegulation: fluctuate(320, 0.05),
                downRegulation: fluctuate(185, 0.05),
                marketPrice: fluctuate(487.50, 0.02),
                avgPrice: 465.20,
                maxPrice: 512.00,
                minPrice: 398.50,
            });
        }, 2000);

        // 2. Alarm Generator Loop (Random alerts)
        const alarmInterval = setInterval(() => {
            // 20% chance to generate an alert every 5 seconds
            if (Math.random() > 0.8) {
                const template = ALERT_MESSAGES[Math.floor(Math.random() * ALERT_MESSAGES.length)];
                const newAlert: Alert = {
                    id: Math.random().toString(36).substr(2, 9),
                    level: template.level as any,
                    message: template.msg,
                    time: new Date().toLocaleTimeString('en-GB')
                };

                addAlert(newAlert);

                // Trigger Toast
                if (template.level === 'critical') {
                    toast.error(newAlert.message, { description: newAlert.time });
                } else if (template.level === 'warning') {
                    toast.warning(newAlert.message, { description: newAlert.time });
                } else {
                    toast.info(newAlert.message, { description: newAlert.time });
                }
            }
        }, 5000);

        return () => {
            clearInterval(interval);
            clearInterval(alarmInterval);
        };
    }, []);

    // Return the store state directly for compatibility with components using this hook
    return {
        totalCapacity, activeAssets, upRegulation, downRegulation,
        marketPrice, avgPrice, maxPrice, minPrice
    };
}
