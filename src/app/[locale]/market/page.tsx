import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function MarketPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <MarketContent />;
}

function MarketContent() {
    const t = useTranslations('market');
    const tc = useTranslations('common');

    // 模拟报价数据
    const bids = [
        { id: 'BID-001', quantity: 15, price: 485, direction: 'upward', status: 'accepted', time: '14:15:00' },
        { id: 'BID-002', quantity: 10, price: 490, direction: 'upward', status: 'pending', time: '14:30:00' },
        { id: 'BID-003', quantity: 20, price: 475, direction: 'downward', status: 'rejected', time: '13:45:00' },
        { id: 'BID-004', quantity: 8, price: 495, direction: 'upward', status: 'partial', time: '12:00:00' },
    ];

    const statusColors: Record<string, string> = {
        pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        accepted: 'bg-green-500/20 text-green-400 border-green-500/30',
        rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
        partial: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        expired: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    };

    // 模拟价格历史
    const priceData = [
        { hour: '00:00', price: 420 },
        { hour: '04:00', price: 380 },
        { hour: '08:00', price: 465 },
        { hour: '12:00', price: 512 },
        { hour: '16:00', price: 498 },
        { hour: '20:00', price: 487 },
    ];

    const maxPrice = Math.max(...priceData.map(d => d.price));

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 页面标题 */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
                        <p className="text-slate-400 mt-1">{t('subtitle')}</p>
                    </div>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors cursor-pointer">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        {t('bidding.newBid')}
                    </button>
                </div>

                {/* 市场概览卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20">
                        <p className="text-sm text-blue-300">{t('prices.current')}</p>
                        <p className="text-3xl font-bold text-white mt-1">487.50</p>
                        <p className="text-xs text-slate-400">PLN/MWh</p>
                    </div>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20">
                        <p className="text-sm text-green-300">{t('prices.upRegulation')}</p>
                        <p className="text-3xl font-bold text-white mt-1">512.00</p>
                        <p className="text-xs text-slate-400">PLN/MWh</p>
                    </div>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20">
                        <p className="text-sm text-amber-300">{t('prices.downRegulation')}</p>
                        <p className="text-3xl font-bold text-white mt-1">398.50</p>
                        <p className="text-xs text-slate-400">PLN/MWh</p>
                    </div>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20">
                        <p className="text-sm text-purple-300">{t('balancing.energyDelivered')}</p>
                        <p className="text-3xl font-bold text-white mt-1">156.8</p>
                        <p className="text-xs text-slate-400">MWh</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 左侧 - 价格图表和服务 */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* 价格趋势图 */}
                        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <h3 className="text-lg font-semibold text-white mb-4">{t('prices.history')}</h3>
                            <div className="h-64 flex items-end gap-4">
                                {priceData.map((data, index) => (
                                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                        <div
                                            className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-500 hover:to-blue-300"
                                            style={{ height: `${(data.price / maxPrice) * 100}%` }}
                                        />
                                        <span className="text-xs text-slate-400">{data.hour}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 text-sm text-slate-400">
                                <span>{t('prices.minPrice')}: 380 PLN</span>
                                <span>{t('prices.maxPrice')}: 512 PLN</span>
                            </div>
                        </div>

                        {/* 市场服务类型 */}
                        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <h3 className="text-lg font-semibold text-white mb-4">Ancillary Services</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                                            <span className="text-lg font-bold text-green-400">F</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">FCR</p>
                                            <p className="text-xs text-slate-400">{t('services.fcr')}</p>
                                        </div>
                                    </div>
                                    <p className="text-2xl font-bold text-white">45 MW</p>
                                </div>
                                <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                            <span className="text-lg font-bold text-blue-400">A</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">aFRR</p>
                                            <p className="text-xs text-slate-400">{t('services.afrr')}</p>
                                        </div>
                                    </div>
                                    <p className="text-2xl font-bold text-white">120 MW</p>
                                </div>
                                <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                            <span className="text-lg font-bold text-amber-400">M</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">mFRR</p>
                                            <p className="text-xs text-slate-400">{t('services.mfrr')}</p>
                                        </div>
                                    </div>
                                    <p className="text-2xl font-bold text-white">85 MW</p>
                                </div>
                                <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                            <span className="text-lg font-bold text-purple-400">R</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">RR</p>
                                            <p className="text-xs text-slate-400">{t('services.rr')}</p>
                                        </div>
                                    </div>
                                    <p className="text-2xl font-bold text-white">30 MW</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 右侧 - 我的报价 */}
                    <div className="space-y-6">
                        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <h3 className="text-lg font-semibold text-white mb-4">{t('bidding.myBids')}</h3>
                            <div className="space-y-3">
                                {bids.map((bid) => (
                                    <div key={bid.id} className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-mono text-slate-300">{bid.id}</span>
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${statusColors[bid.status]}`}>
                                                {t(`bidding.status.${bid.status}`)}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-lg font-bold text-white">{bid.quantity} MW</p>
                                                <p className="text-sm text-slate-400">{bid.price} PLN/MWh</p>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-sm font-medium ${bid.direction === 'upward' ? 'text-green-400' : 'text-amber-400'}`}>
                                                    {t(`bidding.${bid.direction}`)}
                                                </p>
                                                <p className="text-xs text-slate-500">{bid.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 py-2 text-sm text-blue-400 hover:text-blue-300 border border-slate-600 hover:border-blue-500/50 rounded-lg transition-colors cursor-pointer">
                                {t('bidding.bidHistory')}
                            </button>
                        </div>

                        {/* 容量市场 */}
                        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <h3 className="text-lg font-semibold text-white mb-4">{t('capacity.title')}</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-400">{t('capacity.obligation')}</span>
                                        <span className="text-white">100 MW</span>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-400">{t('capacity.certified')}</span>
                                        <span className="text-white">95 MW</span>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 rounded-full" style={{ width: '95%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-400">{t('capacity.delivered')}</span>
                                        <span className="text-white">92 MW</span>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '92%' }} />
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
