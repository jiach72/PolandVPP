'use client';

import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import { AlertList } from '@/components/DashboardCards';
import FrequencyChart from '@/components/FrequencyChart';
import LiveOverview from '@/components/LiveOverview';
import LiveMarketWidget from '@/components/LiveMarketWidget';
import DashboardMapWrapper from '@/components/DashboardMapWrapper';
import { useAppStore } from '@/store/useAppStore';

export default function DashboardClientContent() {
    const t = useTranslations('dashboard');
    const { alerts } = useAppStore();

    // 模拟最近事件 (Static for now, but could also be dynamic)
    const events = [
        { id: '1', type: 'dispatch', message: t('events.dispatchReceived'), time: '14:32:15' },
        { id: '2', type: 'connect', message: t('events.assetConnected') + ': BESS-0042', time: '14:28:47' },
        { id: '3', type: 'bid', message: t('events.bidAccepted') + ': 15 MW @ 485 PLN', time: '14:15:00' },
        { id: '4', type: 'disconnect', message: t('events.assetDisconnected') + ': Wind-0156', time: '13:55:22' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 页面标题 */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
                    <p className="text-slate-400 mt-1">{t('subtitle')}</p>
                </div>

                {/* 顶部动态统计卡片 */}
                <LiveOverview />

                {/* 主要内容区 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 左侧 - 频率和市场 */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* 实时频率图表 */}
                        <FrequencyChart />

                        {/* 资源分布地图 - Leaflet Integration */}
                        <div className="p-6 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/5 shadow-2xl">
                            <h3 className="text-lg font-semibold text-white mb-4">{t('map.title')}</h3>
                            <div className="aspect-video bg-slate-900/50 rounded-lg overflow-hidden relative z-0">
                                <DashboardMapWrapper />
                            </div>
                        </div>

                        {/* 动态市场价格摘要 */}
                        <LiveMarketWidget />

                    </div>

                    {/* 右侧 - 告警和事件 */}
                    <div className="space-y-6">
                        {/* 告警面板 */}
                        <div className="p-6 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/5 shadow-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white">{t('alerts.title')}</h3>
                                <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full border border-red-500/30">
                                    {alerts.length} Active
                                </span>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                                <AlertList alerts={alerts} />
                            </div>
                        </div>

                        {/* 最近事件 */}
                        <div className="p-6 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/5 shadow-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white">{t('events.title')}</h3>
                                <button className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer">
                                    {t('events.viewAll')}
                                </button>
                            </div>
                            <div className="space-y-3">
                                {events.map((event) => (
                                    <div key={event.id} className="flex items-start gap-3 py-2 border-b border-slate-700/50 last:border-0">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                                        <div className="flex-1">
                                            <p className="text-sm text-slate-300">{event.message}</p>
                                            <p className="text-xs text-slate-500">{event.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* KPI 指标 */}
                        <div className="p-6 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/5 shadow-2xl">
                            <h3 className="text-lg font-semibold text-white mb-4">{t('kpi.title')}</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-400">{t('kpi.availability')}</span>
                                        <span className="text-white">99.97%</span>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 rounded-full" style={{ width: '99.97%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-400">{t('kpi.responseTime')}</span>
                                        <span className="text-white">1.2s</span>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-400">{t('kpi.accuracy')}</span>
                                        <span className="text-white">94.5%</span>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '94.5%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-400">{t('kpi.compliance')}</span>
                                        <span className="text-white">100%</span>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-purple-500 rounded-full" style={{ width: '100%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
