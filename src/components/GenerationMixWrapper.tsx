'use client';

import dynamic from 'next/dynamic';

const GenerationMixChart = dynamic(() => import('@/components/GenerationMixChart'), { ssr: false });

export default function GenerationMixWrapper() {
    return <GenerationMixChart />;
}
