'use client';

import { useTranslations } from 'next-intl';
import { useLiveData } from '@/hooks/useLiveData';
import CountUpNumber from '@/components/CountUpNumber';

// 格式化数字
const fmt = (num: number, digits: number = 2) => num.toFixed(digits);

export default function LiveMarketWidget() {
    const t = useTranslations('dashboard');
    const data = useLiveData();

    return (
        <div className="p-6 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{t('market.title')}</h3>
                <span className="text-xs text-green-400 font-mono flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Live Market
                </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                    <p className="text-sm text-slate-400">{t('market.currentPrice')}</p>
                    <p className="text-2xl font-bold text-white transition-all duration-500 ease-out">
                        <CountUpNumber end={data.marketPrice} decimals={2} />
                    </p>
                    <p className="text-xs text-slate-500">PLN/MWh</p>
                </div>
                <div>
                    <p className="text-sm text-slate-400">{t('market.avgPrice')}</p>
                    <p className="text-2xl font-bold text-white">
                        <CountUpNumber end={data.avgPrice} decimals={2} />
                    </p>
                    <p className="text-xs text-slate-500">PLN/MWh</p>
                </div>
                <div>
                    <p className="text-sm text-slate-400">{t('market.maxPrice')}</p>
                    <p className="text-2xl font-bold text-green-400">
                        <CountUpNumber end={data.maxPrice} decimals={2} />
                    </p>
                    <p className="text-xs text-slate-500">PLN/MWh</p>
                </div>
                <div>
                    <p className="text-sm text-slate-400">{t('market.minPrice')}</p>
                    <p className="text-2xl font-bold text-amber-400">
                        <CountUpNumber end={data.minPrice} decimals={2} />
                    </p>
                    <p className="text-xs text-slate-500">PLN/MWh</p>
                </div>
            </div>
        </div>
    );
}
