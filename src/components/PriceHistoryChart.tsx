'use client';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { useTranslations } from 'next-intl';

// 生成 24 小时的模拟数据
const generateData = () => {
    const data = [];
    for (let i = 0; i < 24; i++) {
        const hour = i.toString().padStart(2, '0') + ':00';
        // 模拟日内价格曲线：早晚高峰，深夜低谷
        const baseLoad = Math.sin((i - 6) / 18 * Math.PI) * 100 + 400;

        // DA-Fix 价格相对平滑
        const daPrice = baseLoad + (Math.random() * 20 - 10);

        // 平衡市场价格波动更大
        const balancingPrice = daPrice + (Math.random() * 80 - 40);

        data.push({
            hour,
            dayAhead: Math.round(daPrice),
            balancing: Math.round(balancingPrice),
        });
    }
    return data;
};

const data = generateData();

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900/90 border border-slate-700 p-3 rounded-lg shadow-xl backdrop-blur-sm">
                <p className="text-slate-300 mb-2 font-mono">{label}</p>
                <div className="space-y-1">
                    <p className="text-sm">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                        <span className="text-slate-400">Day-Ahead: </span>
                        <span className="font-bold text-white">{payload[0].value} PLN</span>
                    </p>
                    <p className="text-sm">
                        <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 mr-2"></span>
                        <span className="text-slate-400">Balancing: </span>
                        <span className="font-bold text-white">{payload[1].value} PLN</span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

export default function PriceHistoryChart() {
    const t = useTranslations('market');

    return (
        <div className="w-full h-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorDa" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis
                        dataKey="hour"
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        interval={3}
                    />
                    <YAxis
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        unit=" PLN"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" />
                    <Area
                        type="monotone"
                        dataKey="dayAhead"
                        name="Day-Ahead Price"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorDa)"
                        isAnimationActive={true}
                    />
                    <Area
                        type="monotone"
                        dataKey="balancing"
                        name="Balancing Price"
                        stroke="#22d3ee"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorBal)"
                        isAnimationActive={true}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
