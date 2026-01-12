'use client';

import dynamic from 'next/dynamic';

const PriceHistoryChart = dynamic(() => import('@/components/PriceHistoryChart'), { ssr: false });

export default function PriceHistoryWrapper() {
    return <PriceHistoryChart />;
}
