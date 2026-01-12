import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function SettlementPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <SettlementContent />;
}

function SettlementContent() {
    const t = useTranslations('settlement');
    const tc = useTranslations('common');

    // 模拟发票数据
    const invoices = [
        { id: 'INV-2026-001', date: '2026-01-10', dueDate: '2026-01-25', amount: 245680.50, status: 'issued' },
        { id: 'INV-2026-002', date: '2026-01-05', dueDate: '2026-01-20', amount: 189420.00, status: 'paid' },
        { id: 'INV-2025-052', date: '2025-12-28', dueDate: '2026-01-12', amount: 156890.75, status: 'overdue' },
        { id: 'INV-2025-051', date: '2025-12-20', dueDate: '2026-01-05', amount: 312450.00, status: 'paid' },
    ];

    // 模拟交易数据
    const transactions = [
        { id: 'TXN-001', type: 'energy', description: 'aFRR Up Regulation', amount: 15680.50, date: '2026-01-12' },
        { id: 'TXN-002', type: 'capacity', description: 'Capacity Market Obligation', amount: 8500.00, date: '2026-01-11' },
        { id: 'TXN-003', type: 'energy', description: 'mFRR Down Regulation', amount: 12340.00, date: '2026-01-10' },
        { id: 'TXN-004', type: 'penalty', description: 'Under-delivery Penalty', amount: -2500.00, date: '2026-01-09' },
        { id: 'TXN-005', type: 'bonus', description: 'Performance Bonus', amount: 3200.00, date: '2026-01-08' },
    ];

    const statusColors: Record<string, string> = {
        draft: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
        issued: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        paid: 'bg-green-500/20 text-green-400 border-green-500/30',
        overdue: 'bg-red-500/20 text-red-400 border-red-500/30',
        cancelled: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    };

    const transactionIcons: Record<string, React.ReactNode> = {
        energy: (
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
        ),
        capacity: (
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            </div>
        ),
        penalty: (
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
        ),
        bonus: (
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
        ),
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('pl-PL', {
            style: 'currency',
            currency: 'PLN',
        }).format(amount);
    };

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
                    <div className="flex gap-3">
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors cursor-pointer">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {t('reports.download')}
                        </button>
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors cursor-pointer">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {t('reports.generate')}
                        </button>
                    </div>
                </div>

                {/* 结算概览 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20">
                        <p className="text-sm text-green-300">{t('overview.totalRevenue')}</p>
                        <p className="text-2xl font-bold text-white mt-1">{formatCurrency(904441.25)}</p>
                        <p className="text-xs text-slate-400 mt-1">{t('overview.period')}: Jan 2026</p>
                    </div>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20">
                        <p className="text-sm text-red-300">{t('overview.totalCost')}</p>
                        <p className="text-2xl font-bold text-white mt-1">{formatCurrency(125680.50)}</p>
                        <p className="text-xs text-slate-400 mt-1">Including penalties</p>
                    </div>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20">
                        <p className="text-sm text-blue-300">{t('overview.netBalance')}</p>
                        <p className="text-2xl font-bold text-white mt-1">{formatCurrency(778760.75)}</p>
                        <p className="text-xs text-green-400 mt-1">+12.5% vs last month</p>
                    </div>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20">
                        <p className="text-sm text-amber-300">{t('overview.pendingPayments')}</p>
                        <p className="text-2xl font-bold text-white mt-1">{formatCurrency(402571.25)}</p>
                        <p className="text-xs text-slate-400 mt-1">2 invoices pending</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 左侧 - 发票和交易 */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* 发票列表 */}
                        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white">{t('invoices.title')}</h3>
                                <button className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer">
                                    {t('invoices.list')}
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-700">
                                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">{t('invoices.number')}</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">{t('invoices.date')}</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">{t('invoices.dueDate')}</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-slate-400 uppercase">{t('invoices.amount')}</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700/50">
                                        {invoices.map((invoice) => (
                                            <tr key={invoice.id} className="hover:bg-slate-700/30 cursor-pointer">
                                                <td className="px-4 py-3 text-sm font-mono text-blue-400">{invoice.id}</td>
                                                <td className="px-4 py-3 text-sm text-slate-300">{invoice.date}</td>
                                                <td className="px-4 py-3 text-sm text-slate-300">{invoice.dueDate}</td>
                                                <td className="px-4 py-3 text-sm text-white font-medium text-right">{formatCurrency(invoice.amount)}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${statusColors[invoice.status]}`}>
                                                        {t(`invoices.status.${invoice.status}`)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 最近交易 */}
                        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <h3 className="text-lg font-semibold text-white mb-4">{t('transactions.title')}</h3>
                            <div className="space-y-3">
                                {transactions.map((txn) => (
                                    <div key={txn.id} className="flex items-center gap-4 p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors cursor-pointer">
                                        {transactionIcons[txn.type]}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white">{txn.description}</p>
                                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                                <span className="font-mono">{txn.id}</span>
                                                <span>•</span>
                                                <span>{txn.date}</span>
                                            </div>
                                        </div>
                                        <p className={`text-lg font-bold ${txn.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {txn.amount >= 0 ? '+' : ''}{formatCurrency(txn.amount)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 右侧 - 报告和区块链 */}
                    <div className="space-y-6">
                        {/* 报告类型 */}
                        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <h3 className="text-lg font-semibold text-white mb-4">{t('reports.title')}</h3>
                            <div className="space-y-2">
                                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors cursor-pointer">
                                    <span className="text-sm text-slate-300">{t('reports.daily')}</span>
                                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </button>
                                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors cursor-pointer">
                                    <span className="text-sm text-slate-300">{t('reports.weekly')}</span>
                                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </button>
                                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors cursor-pointer">
                                    <span className="text-sm text-slate-300">{t('reports.monthly')}</span>
                                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* 区块链验证 */}
                        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <h3 className="text-lg font-semibold text-white mb-4">{t('blockchain.title')}</h3>
                            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm font-medium text-green-400">{t('blockchain.verified')}</span>
                                </div>
                                <p className="text-xs text-slate-400">All metering data is cryptographically secured</p>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-slate-400 mb-1">{t('blockchain.hash')}</p>
                                    <p className="text-xs font-mono text-slate-300 break-all">0x7f8a...3e2b</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 mb-1">{t('blockchain.timestamp')}</p>
                                    <p className="text-sm text-white">2026-01-12 15:32:45 CET</p>
                                </div>
                            </div>
                            <button className="w-full mt-4 py-2 text-sm text-blue-400 hover:text-blue-300 border border-slate-600 hover:border-blue-500/50 rounded-lg transition-colors cursor-pointer">
                                {t('blockchain.viewOnChain')}
                            </button>
                        </div>

                        {/* 聚合商分成 */}
                        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <h3 className="text-lg font-semibold text-white mb-4">{t('aggregator.title')}</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-sm text-slate-400">{t('aggregator.share')}</span>
                                    <span className="text-sm text-white">15%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-slate-400">{t('aggregator.commission')}</span>
                                    <span className="text-sm text-white">{formatCurrency(116814.11)}</span>
                                </div>
                                <div className="border-t border-slate-700 pt-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium text-slate-300">{t('aggregator.payout')}</span>
                                        <span className="text-lg font-bold text-green-400">{formatCurrency(661946.64)}</span>
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
