'use client';

import { useTranslations } from 'next-intl';
import StatCard from '@/components/DashboardCards';
import { useLiveData } from '@/hooks/useLiveData';
import CountUpNumber from '@/components/CountUpNumber';

// 格式化数字，保留小数位
const fmt = (num: number, digits: number = 0) => num.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });

export default function LiveOverview() {
    const t = useTranslations('dashboard');
    const tc = useTranslations('common');
    const data = useLiveData();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
                title={t('overview.totalCapacity')}
                value={<CountUpNumber end={data.totalCapacity} />}
                unit={tc('units.mw')}
                trend={{ value: 2.5, direction: 'up' }}
                color="blue"
            />
            <StatCard
                title={t('overview.activeAssets')}
                value={<CountUpNumber end={data.activeAssets} />}
                trend={{ value: 1.2, direction: 'up' }}
                color="green"
            />
            <StatCard
                title={t('overview.upRegulation')}
                value={<CountUpNumber end={data.upRegulation} decimals={1} />}
                unit={tc('units.mw')}
                color="amber"
            />
            <StatCard
                title={t('overview.downRegulation')}
                value={<CountUpNumber end={data.downRegulation} decimals={1} />}
                unit={tc('units.mw')}
                color="purple"
            />
        </div>
    );
}
