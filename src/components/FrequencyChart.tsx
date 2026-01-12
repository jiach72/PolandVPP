'use client';

import { useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine
} from 'recharts';
import { useTranslations } from 'next-intl';

export default function FrequencyChart() {
    const t = useTranslations('dashboard');
    const [data, setData] = useState<{ time: string; value: number }[]>([]);

    // 模拟即时频率数据
    useEffect(() => {
        // 初始数据
        const initialData = Array.from({ length: 60 }, (_, i) => ({
            time: new Date(Date.now() - (59 - i) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            value: 50 + (Math.random() - 0.5) * 0.1
        }));
        setData(initialData);

        const interval = setInterval(() => {
            setData(prev => {
                const now = new Date();
                const newValue = 50 + (Math.random() - 0.5) * 0.15; // 模拟 50Hz 附近的波动
                const newPoint = {
                    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    value: newValue
                };
                return [...prev.slice(1), newPoint];
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const currentFreq = data.length > 0 ? data[data.length - 1].value : 50;
    const deviation = currentFreq - 50;
    const isStable = Math.abs(deviation) < 0.05;

    return (
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isStable ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                        {t('frequency.title')}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">Real-time Grid Frequency (Hz)</p>
                </div>
                <div className="text-right">
                    <p className={`text-3xl font-bold font-mono ${isStable ? 'text-green-400' : 'text-red-400'}`}>
                        {currentFreq.toFixed(3)} Hz
                    </p>
                    <p className="text-xs text-slate-500">
                        Target: 50.00 Hz (Δ {(deviation * 1000).toFixed(0)} mHz)
                    </p>
                </div>
            </div>

            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                        <XAxis
                            dataKey="time"
                            stroke="#94a3b8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            minTickGap={30}
                        />
                        <YAxis
                            domain={[49.8, 50.2]}
                            stroke="#94a3b8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => value.toFixed(2)}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                            itemStyle={{ color: '#f8fafc' }}
                            labelStyle={{ color: '#94a3b8' }}
                            formatter={(value: number | undefined) => [value ? value.toFixed(4) + ' Hz' : '--', 'Frequency']}
                        />
                        <ReferenceLine y={50} stroke="#64748b" strokeDasharray="3 3" />
                        <ReferenceLine y={49.9} stroke="#ef4444" strokeDasharray="3 3" opacity={0.5} />
                        <ReferenceLine y={50.1} stroke="#ef4444" strokeDasharray="3 3" opacity={0.5} />

                        <defs>
                            <linearGradient id="colorFreq" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 6, fill: '#3b82f6', stroke: '#1e293b', strokeWidth: 2 }}
                            animationDuration={300}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
