import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function AssetsPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <AssetsContent />;
}

function AssetsContent() {
    const t = useTranslations('assets');
    const tc = useTranslations('common');

    // 模拟资产数据
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

    const typeIcons: Record<string, React.ReactNode> = {
        solar: (
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
        battery: (
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
        ),
        wind: (
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
            </svg>
        ),
        industrial_load: (
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
        ev_charger: (
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        chp: (
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
        ),
    };

    const statusColors: Record<string, string> = {
        online: 'bg-green-500/20 text-green-400 border-green-500/30',
        offline: 'bg-red-500/20 text-red-400 border-red-500/30',
        maintenance: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 页面标题和操作 */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
                        <p className="text-slate-400 mt-1">{t('subtitle')}</p>
                    </div>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors cursor-pointer">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        {t('actions.register')}
                    </button>
                </div>

                {/* 搜索和筛选 */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder={t('list.search')}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select className="px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 cursor-pointer">
                            <option value="">{t('list.filter.byType')}</option>
                            <option value="solar">{t('types.solar')}</option>
                            <option value="wind">{t('types.wind')}</option>
                            <option value="battery">{t('types.battery')}</option>
                            <option value="ev_charger">{t('types.ev_charger')}</option>
                            <option value="industrial_load">{t('types.industrial_load')}</option>
                        </select>
                        <select className="px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 cursor-pointer">
                            <option value="">{t('list.filter.byStatus')}</option>
                            <option value="online">{tc('status.online')}</option>
                            <option value="offline">{tc('status.offline')}</option>
                        </select>
                    </div>
                </div>

                {/* 统计卡片 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                        <p className="text-sm text-slate-400">{t('details.totalAssets')}</p>
                        <p className="text-2xl font-bold text-white">{assets.length}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                        <p className="text-sm text-green-300">{tc('status.online')}</p>
                        <p className="text-2xl font-bold text-white">{assets.filter(a => a.status === 'online').length}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                        <p className="text-sm text-blue-300">{t('capacity.nominal')}</p>
                        <p className="text-2xl font-bold text-white">{assets.reduce((sum, a) => sum + a.capacity, 0)} MW</p>
                    </div>
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <p className="text-sm text-amber-300">{t('capacity.current')}</p>
                        <p className="text-2xl font-bold text-white">{assets.reduce((sum, a) => sum + a.output, 0).toFixed(1)} MW</p>
                    </div>
                </div>

                {/* 资产列表 */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-800/80">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{t('form.name')}</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{t('form.type')}</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{t('capacity.nominal')}</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{t('capacity.current')}</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{tc('status.online')}</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{tc('actions.edit')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {assets.map((asset) => (
                                    <tr key={asset.id} className="hover:bg-slate-700/30 transition-colors cursor-pointer">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-mono text-slate-300">{asset.id}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-white font-medium">{asset.name}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                {typeIcons[asset.type]}
                                                <span className="text-sm text-slate-300">{t(`types.${asset.type}`)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-slate-300">{asset.capacity} MW</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`text-sm font-medium ${asset.output >= 0 ? 'text-green-400' : 'text-amber-400'}`}>
                                                {asset.output >= 0 ? '+' : ''}{asset.output} MW
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[asset.status]}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${asset.status === 'online' ? 'bg-green-400' : 'bg-red-400'}`} />
                                                {tc(`status.${asset.status}`)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex gap-2">
                                                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors cursor-pointer" title={tc('actions.view')}>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors cursor-pointer" title={tc('actions.edit')}>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
