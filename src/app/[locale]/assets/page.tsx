import { useTranslations } from 'next-intl';
import AssetsPageClientContent from '@/components/AssetsPageClientContent';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function AssetsPage({ params }: Props) {
    await params; // Keep params resolution for Next.js

    // 模拟资产数据 - 从 Server Component 传递给 Client Component
    const assets = [
        { id: 'PV-001', name: 'Solar Farm Warsaw', type: 'solar', capacity: 50, status: 'online', output: 42.5 },
        { id: 'BESS-042', name: 'Battery Storage Kraków', type: 'battery', capacity: 25, status: 'online', output: 12.0 },
        { id: 'WIND-156', name: 'Wind Farm Poznań', type: 'wind', capacity: 80, status: 'offline', output: 0 },
        { id: 'IND-089', name: 'Factory Load Łódź', type: 'industrial_load', capacity: 15, status: 'online', output: -8.5 },
        { id: 'EV-234', name: 'EV Charging Hub Gdańsk', type: 'ev_charger', capacity: 10, status: 'online', output: -6.2 },
        { id: 'PV-002', name: 'Solar Park Wrocław', type: 'solar', capacity: 35, status: 'online', output: 28.7 },
        { id: 'BESS-043', name: 'Grid Battery Katowice', type: 'battery', capacity: 40, status: 'online', output: -5.0 },
        { id: 'CHP-012', name: 'CHP Plant Szczecin', type: 'chp', capacity: 20, status: 'online', output: 18.5 },
    ];

    return <AssetsPageClientContent initialAssets={assets} />;
}
