import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import PriceHistoryWrapper from '@/components/PriceHistoryWrapper';
import { BiddingWidget } from '@/components/BiddingWidget';

type Props = {
    params: Promise<{ locale: string }>;
};

type Bid = {
    id: string;
    quantity: number;
    price: number;
    direction: 'upward' | 'downward';
    status: 'pending' | 'accepted' | 'rejected' | 'partial' | 'expired';
    time: string;
};

export default async function MarketPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    // 模拟初始报价数据
    const initialBids: Bid[] = [
        { id: 'BID-001', quantity: 15, price: 485, direction: 'upward', status: 'accepted', time: '14:15:00' },
        { id: 'BID-002', quantity: 10, price: 490, direction: 'upward', status: 'pending', time: '14:30:00' },
        { id: 'BID-003', quantity: 20, price: 475, direction: 'downward', status: 'rejected', time: '13:45:00' },
        { id: 'BID-004', quantity: 8, price: 495, direction: 'upward', status: 'partial', time: '12:00:00' },
    ];

    return <MarketContent initialBids={initialBids} />;
}

function MarketContent({ initialBids }: { initialBids: Bid[] }) {
    const t = useTranslations('market');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 页面标题 */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
                        <p className="text-slate-400 mt-1">{t('subtitle')}</p>
                    </div>
                    {/* Main action button is now handled within BiddingWidget for context */}
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
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white">{t('prices.history')}</h3>
                                <div className="flex items-center gap-4 text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                                        <span className="text-slate-400">Day-Ahead</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                                        <span className="text-slate-400">Balancing</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[300px] w-full">
                                <PriceHistoryWrapper />
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

                    {/* 右侧 - 我的报价 & 容量市场 */}
                    <div className="space-y-6">
                        <BiddingWidget initialBids={initialBids} />

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
