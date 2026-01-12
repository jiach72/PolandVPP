'use client';

import dynamic from 'next/dynamic';

// 动态导入地图组件，禁用 SSR
const MapComponent = dynamic(() => import('./MapComponent'), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full flex items-center justify-center bg-slate-900/50 text-slate-500">
            <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Loading GIS Data...</span>
            </div>
        </div>
    )
});

export default function DashboardMapWrapper() {
    return <MapComponent />;
}
