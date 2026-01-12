import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import StatCard, { FrequencyIndicator, AlertList } from '@/components/DashboardCards';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function DashboardPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <DashboardContent />;
}

function DashboardContent() {
    const t = useTranslations('dashboard');
    const tc = useTranslations('common');

    // 模拟告警数据
    const alerts = [
        { id: '1', level: 'warning' as const, message: 'Asset PV-2847 output below expected threshold', time: '2 min ago' },
        { id: '2', level: 'info' as const, message: 'Dispatch command received from PSE SCADA', time: '5 min ago' },
    ];

    // 模拟最近事件
    const events = [
        { id: '1', type: 'dispatch', message: t('events.dispatchReceived'), time: '14:32:15' },
        { id: '2', type: 'connect', message: t('events.assetConnected') + ': BESS-0042', time: '14:28:47' },
        { id: '3', type: 'bid', message: t('events.bidAccepted') + ': 15 MW @ 485 PLN', time: '14:15:00' },
        { id: '4', type: 'disconnect', message: t('events.assetDisconnected') + ': Wind-0156', time: '13:55:22' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 页面标题 */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
                    <p className="text-slate-400 mt-1">{t('subtitle')}</p>
                </div>

                {/* 顶部统计卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        title={t('overview.totalCapacity')}
                        value="1,250"
                        unit={tc('units.mw')}
                        trend={{ value: 2.5, direction: 'up' }}
                        color="blue"
                    />
                    <StatCard
                        title={t('overview.activeAssets')}
                        value="2,847"
                        trend={{ value: 12, direction: 'up' }}
                        color="green"
                    />
                    <StatCard
                        title={t('overview.upRegulation')}
                        value="320"
                        unit={tc('units.mw')}
                        color="amber"
                    />
                    <StatCard
                        title={t('overview.downRegulation')}
                        value="185"
                        unit={tc('units.mw')}
                        color="purple"
                    />
                </div>

                {/* 主要内容区 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 左侧 - 频率和市场 */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* 频率指示器 */}
                        <FrequencyIndicator frequency={50.023} target={50.00} />

                        {/* 资源分布地图占位 */}
                        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <h3 className="text-lg font-semibold text-white mb-4">{t('map.title')}</h3>
                            <div className="aspect-video bg-slate-900/50 rounded-lg flex items-center justify-center relative overflow-hidden">
                                {/* 波兰地图占位 */}
                                <div className="absolute inset-0 opacity-20">
                                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                                        <path
                                            d="M25,20 L75,15 L85,35 L80,55 L70,70 L50,75 L30,70 L20,50 L25,20Z"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="0.5"
                                            className="text-blue-500"
                                        />
                                    </svg>
                                </div>
                                <div className="text-center z-10">
                                    <svg className="w-16 h-16 text-slate-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                    <p className="text-slate-400">{t('map.title')}</p>
                                    <p className="text-xs text-slate-500 mt-1">GIS Integration Coming Soon</p>
                                </div>

                                {/* 模拟的资产点 */}
                                <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-green-500 rounded-full animate-pulse" title="Solar Farm Warsaw" />
                                <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-500 rounded-full animate-pulse" title="BESS Kraków" />
                                <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-amber-500 rounded-full animate-pulse" title="Wind Farm Poznań" />
                                <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-purple-500 rounded-full animate-pulse" title="Industrial Load Łódź" />
                            </div>

                            {/* 图例 */}
                            <div className="flex flex-wrap gap-4 mt-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                    <span className="text-slate-400">{t('map.assets.solar')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                    <span className="text-slate-400">{t('map.assets.battery')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                                    <span className="text-slate-400">{t('map.assets.wind')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                                    <span className="text-slate-400">{t('map.assets.industrial')}</span>
                                </div>
                            </div>
                        </div>

                        {/* 市场价格摘要 */}
                        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <h3 className="text-lg font-semibold text-white mb-4">{t('market.title')}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <p className="text-sm text-slate-400">{t('market.currentPrice')}</p>
                                    <p className="text-2xl font-bold text-white">487.50</p>
                                    <p className="text-xs text-slate-500">PLN/MWh</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">{t('market.avgPrice')}</p>
                                    <p className="text-2xl font-bold text-white">465.20</p>
                                    <p className="text-xs text-slate-500">PLN/MWh</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">{t('market.maxPrice')}</p>
                                    <p className="text-2xl font-bold text-green-400">512.00</p>
                                    <p className="text-xs text-slate-500">PLN/MWh</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">{t('market.minPrice')}</p>
                                    <p className="text-2xl font-bold text-amber-400">398.50</p>
                                    <p className="text-xs text-slate-500">PLN/MWh</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 右侧 - 告警和事件 */}
                    <div className="space-y-6">
                        {/* 告警面板 */}
                        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <h3 className="text-lg font-semibold text-white mb-4">{t('alerts.title')}</h3>
                            <AlertList alerts={alerts} />
                        </div>

                        {/* 最近事件 */}
                        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
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
                        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
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
