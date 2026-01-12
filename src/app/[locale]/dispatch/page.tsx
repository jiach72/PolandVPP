import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import DispatchSimulator from '@/components/DispatchSimulator';

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
                    <p className="text-slate-400 mt-1">{t('subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-8">
                    {/* 状态总览 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">AGC Status</p>
                                <p className="text-xl font-bold text-green-400">Active (Auto)</p>
                            </div>
                        </div>
                        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center gap-4">
                            <div className="p-3 bg-amber-500/10 rounded-lg text-amber-400">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">System Mode</p>
                                <p className="text-xl font-bold text-white">Normal Operation</p>
                            </div>
                        </div>
                        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center gap-4">
                            <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Controlled Capacity</p>
                                <p className="text-xl font-bold text-white">325 MW</p>
                            </div>
                        </div>
                    </div>

                    {/* 调度模拟器 */}
                    <div className="mt-4">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
                            {t('commands.title')} (Simulation)
                        </h2>
                        <DispatchSimulator />
                    </div>
                </div>
            </main>
        </div>
    );
}
