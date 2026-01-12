import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function DispatchPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <DispatchContent />;
}

function DispatchContent() {
    const t = useTranslations('dispatch');
    const tc = useTranslations('common');

    // 模拟调度指令
    const commands = [
        { id: 'CMD-001', source: 'PSE SCADA', target: 'VPP-Cluster-01', command: 'Increase 15MW', status: 'executing', time: '14:32:15' },
        { id: 'CMD-002', source: 'Auto AGC', target: 'BESS-042', command: 'Discharge 5MW', status: 'completed', time: '14:28:47' },
        { id: 'CMD-003', source: 'PSE SCADA', target: 'VPP-Cluster-02', command: 'Decrease 8MW', status: 'acknowledged', time: '14:15:00' },
        { id: 'CMD-004', source: 'Operator', target: 'PV-001', command: 'Curtail 20%', status: 'received', time: '13:55:22' },
    ];

    const statusColors: Record<string, string> = {
        received: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
        acknowledged: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        executing: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        completed: 'bg-green-500/20 text-green-400 border-green-500/30',
        failed: 'bg-red-500/20 text-red-400 border-red-500/30',
    };

    // 模拟受控资产
    const controlledAssets = [
        { id: 'BESS-042', name: 'Battery Kraków', setpoint: 12, current: 11.8, mode: 'auto' },
        { id: 'PV-001', name: 'Solar Warsaw', setpoint: 45, current: 42.5, mode: 'auto' },
        { id: 'WIND-156', name: 'Wind Poznań', setpoint: 0, current: 0, mode: 'manual' },
        { id: 'CHP-012', name: 'CHP Szczecin', setpoint: 18, current: 18.5, mode: 'auto' },
    ];

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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            {tc('actions.refresh')}
                        </button>
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 font-medium rounded-lg border border-red-500/30 transition-colors cursor-pointer">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            {t('emergency.activate')}
                        </button>
                    </div>
                </div>

                {/* AGC 状态 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-green-300">{t('agc.title')}</p>
                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-500/20 text-green-400">
                                {t('agc.enabled')}
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-white">Active</p>
                    </div>
                    <div className="p-6 rounded-xl bg-blue-500/10 border border-blue-500/20">
                        <p className="text-sm text-blue-300 mb-2">{t('agc.regulationSignal')}</p>
                        <p className="text-3xl font-bold text-white">+5.2 MW</p>
                    </div>
                    <div className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <p className="text-sm text-amber-300 mb-2">{t('agc.basepoint')}</p>
                        <p className="text-3xl font-bold text-white">850 MW</p>
                    </div>
                    <div className="p-6 rounded-xl bg-purple-500/10 border border-purple-500/20">
                        <p className="text-sm text-purple-300 mb-2">{t('agc.responseTime')}</p>
                        <p className="text-3xl font-bold text-white">1.2 s</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 左侧 - 调度指令和受控资产 */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* 调度指令列表 */}
                        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <h3 className="text-lg font-semibold text-white mb-4">{t('dispatch.title')}</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-700">
                                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">ID</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">{t('dispatch.source')}</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">{t('dispatch.target')}</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">{t('dispatch.command')}</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">{tc('status.active')}</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">{t('dispatch.timestamp')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700/50">
                                        {commands.map((cmd) => (
                                            <tr key={cmd.id} className="hover:bg-slate-700/30">
                                                <td className="px-4 py-3 text-sm font-mono text-slate-300">{cmd.id}</td>
                                                <td className="px-4 py-3 text-sm text-slate-300">{cmd.source}</td>
                                                <td className="px-4 py-3 text-sm text-white font-medium">{cmd.target}</td>
                                                <td className="px-4 py-3 text-sm text-cyan-400">{cmd.command}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${statusColors[cmd.status]}`}>
                                                        {t(`dispatch.status.${cmd.status}`)}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-slate-400">{cmd.time}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 受控资产 */}
                        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <h3 className="text-lg font-semibold text-white mb-4">{t('assets.title')}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {controlledAssets.map((asset) => (
                                    <div key={asset.id} className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <p className="text-sm font-mono text-slate-400">{asset.id}</p>
                                                <p className="text-white font-medium">{asset.name}</p>
                                            </div>
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${asset.mode === 'auto' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                                {asset.mode === 'auto' ? t('control.mode.auto') : t('control.mode.manual')}
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-400">{t('control.setpoint')}</span>
                                                <span className="text-white">{asset.setpoint} MW</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-400">{t('control.currentOutput')}</span>
                                                <span className={asset.current > 0 ? 'text-green-400' : 'text-slate-400'}>{asset.current} MW</span>
                                            </div>
                                            <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                                    style={{ width: `${asset.setpoint > 0 ? (asset.current / asset.setpoint) * 100 : 0}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 右侧 - 约束和交通灯 */}
                    <div className="space-y-6">
                        {/* 交通灯系统 */}
                        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <h3 className="text-lg font-semibold text-white mb-4">{t('constraints.trafficLight.title')}</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                                    <div className="w-6 h-6 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
                                    <div>
                                        <p className="text-sm font-medium text-white">{t('constraints.trafficLight.green')}</p>
                                        <p className="text-xs text-slate-400">Zone A, Zone C, Zone D</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                                    <div className="w-6 h-6 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50 animate-pulse" />
                                    <div>
                                        <p className="text-sm font-medium text-white">{t('constraints.trafficLight.yellow')}</p>
                                        <p className="text-xs text-slate-400">Zone B - Line congestion expected</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-700/30 border border-slate-600/50 opacity-50">
                                    <div className="w-6 h-6 rounded-full bg-red-500/50" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-400">{t('constraints.trafficLight.red')}</p>
                                        <p className="text-xs text-slate-500">No active restrictions</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* DSO 约束 */}
                        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <h3 className="text-lg font-semibold text-white mb-4">{t('constraints.dso')}</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-400">{t('constraints.voltage')}</span>
                                        <span className="text-green-400">OK</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-slate-500">0.95 pu</span>
                                        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden relative">
                                            <div className="absolute inset-0 flex">
                                                <div className="w-1/4 bg-red-500/30" />
                                                <div className="flex-1 bg-green-500/30" />
                                                <div className="w-1/4 bg-red-500/30" />
                                            </div>
                                            <div className="absolute h-full w-1 bg-white rounded-full" style={{ left: '60%' }} />
                                        </div>
                                        <span className="text-xs text-slate-500">1.05 pu</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-400">{t('constraints.thermal')}</span>
                                        <span className="text-amber-400">75%</span>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-green-500 via-amber-500 to-red-500" style={{ width: '75%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 控制模式选择 */}
                        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <h3 className="text-lg font-semibold text-white mb-4">{t('control.mode.title')}</h3>
                            <div className="space-y-2">
                                <button className="w-full p-3 rounded-lg bg-green-500/20 border border-green-500/30 text-left hover:bg-green-500/30 transition-colors cursor-pointer">
                                    <p className="text-sm font-medium text-white">{t('control.mode.auto')}</p>
                                    <p className="text-xs text-slate-400">AGC controlled by PSE SCADA</p>
                                </button>
                                <button className="w-full p-3 rounded-lg bg-slate-700/30 border border-slate-600/50 text-left hover:bg-slate-700/50 transition-colors cursor-pointer">
                                    <p className="text-sm font-medium text-slate-300">{t('control.mode.manual')}</p>
                                    <p className="text-xs text-slate-400">Operator direct control</p>
                                </button>
                                <button className="w-full p-3 rounded-lg bg-slate-700/30 border border-slate-600/50 text-left hover:bg-slate-700/50 transition-colors cursor-pointer">
                                    <p className="text-sm font-medium text-slate-300">{t('control.mode.priceSignal')}</p>
                                    <p className="text-xs text-slate-400">Market-based optimization</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
