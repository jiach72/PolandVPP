'use client';

import { useTranslations } from 'next-intl';

interface StatCardProps {
    title: string;
    value: string | number;
    unit?: string;
    trend?: {
        value: number;
        direction: 'up' | 'down' | 'neutral';
    };
    icon?: React.ReactNode;
    color?: 'blue' | 'green' | 'amber' | 'purple' | 'cyan' | 'red';
}

export default function StatCard({ title, value, unit, trend, icon, color = 'blue' }: StatCardProps) {
    const colorClasses = {
        blue: 'from-blue-500/10 to-blue-600/5 border-blue-500/20 text-blue-300',
        green: 'from-green-500/10 to-green-600/5 border-green-500/20 text-green-300',
        amber: 'from-amber-500/10 to-amber-600/5 border-amber-500/20 text-amber-300',
        purple: 'from-purple-500/10 to-purple-600/5 border-purple-500/20 text-purple-300',
        cyan: 'from-cyan-500/10 to-cyan-600/5 border-cyan-500/20 text-cyan-300',
        red: 'from-red-500/10 to-red-600/5 border-red-500/20 text-red-300',
    };

    const trendColors = {
        up: 'text-green-400',
        down: 'text-red-400',
        neutral: 'text-slate-400',
    };

    return (
        <div className={`p-6 rounded-xl bg-gradient-to-br ${colorClasses[color]} border`}>
            <div className="flex items-start justify-between mb-2">
                <p className={`text-sm ${colorClasses[color].split(' ')[3]}`}>{title}</p>
                {icon && <div className="opacity-50">{icon}</div>}
            </div>
            <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-white">{value}</p>
                {unit && <span className="text-lg text-slate-400">{unit}</span>}
            </div>
            {trend && (
                <div className={`flex items-center gap-1 mt-2 text-sm ${trendColors[trend.direction]}`}>
                    {trend.direction === 'up' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    )}
                    {trend.direction === 'down' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    )}
                    <span>{trend.value > 0 ? '+' : ''}{trend.value}%</span>
                </div>
            )}
        </div>
    );
}

// 频率指示器组件
export function FrequencyIndicator({ frequency, target = 50.00 }: { frequency: number; target?: number }) {
    const t = useTranslations('dashboard');
    const deviation = frequency - target;
    const isNormal = Math.abs(deviation) < 0.05;
    const isWarning = Math.abs(deviation) >= 0.05 && Math.abs(deviation) < 0.2;

    const statusColor = isNormal ? 'green' : isWarning ? 'amber' : 'red';
    const statusText = isNormal ? t('frequency.normal') : isWarning ? t('frequency.warning') : t('frequency.critical');

    const colorClasses = {
        green: 'bg-green-500/20 border-green-500/30 text-green-400',
        amber: 'bg-amber-500/20 border-amber-500/30 text-amber-400',
        red: 'bg-red-500/20 border-red-500/30 text-red-400',
    };

    return (
        <div className={`p-6 rounded-xl ${colorClasses[statusColor]} border`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{t('frequency.title')}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClasses[statusColor]}`}>
                    {statusText}
                </span>
            </div>
            <div className="text-center py-4">
                <p className="text-5xl font-bold text-white">{frequency.toFixed(3)}</p>
                <p className="text-slate-400 mt-1">Hz</p>
            </div>
            <div className="flex justify-between text-sm text-slate-400 mt-4">
                <span>{t('frequency.target')}: {target.toFixed(2)} Hz</span>
                <span className={deviation >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {t('frequency.deviation')}: {deviation >= 0 ? '+' : ''}{(deviation * 1000).toFixed(1)} mHz
                </span>
            </div>
        </div>
    );
}

// 告警列表组件
export function AlertList({ alerts }: { alerts: Array<{ id: string; level: 'critical' | 'warning' | 'info'; message: string; time: string }> }) {
    const t = useTranslations('dashboard');

    const levelClasses = {
        critical: 'bg-red-500/20 border-red-500/30 text-red-400',
        warning: 'bg-amber-500/20 border-amber-500/30 text-amber-400',
        info: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
    };

    const levelIcons = {
        critical: (
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        warning: (
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        info: (
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    };

    if (alerts.length === 0) {
        return (
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 text-center">
                <svg className="w-12 h-12 mx-auto text-slate-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-slate-400">{t('alerts.noAlerts')}</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {alerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg ${levelClasses[alert.level]} border flex items-start gap-3`}>
                    {levelIcons[alert.level]}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-white">{alert.message}</p>
                        <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
                    </div>
                    <button className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                        {t('alerts.acknowledge')}
                    </button>
                </div>
            ))}
        </div>
    );
}
