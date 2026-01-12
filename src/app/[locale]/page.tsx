import { useTranslations } from 'next-intl';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { Link } from '@/i18n/navigation';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
    await params; // Keep params resolution for Next.js

    return <HomePageContent />;
}

function HomePageContent() {
    const t = useTranslations('common');
    const tDashboard = useTranslations('dashboard');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* 顶部导航栏 */}
            <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-white">PSE NextGen</h1>
                                <p className="text-xs text-slate-400">Virtual Power Plant</p>
                            </div>
                        </div>

                        {/* 导航链接 */}
                        <nav className="hidden md:flex items-center gap-1">
                            <Link
                                href="/dashboard"
                                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                            >
                                {t('nav.dashboard')}
                            </Link>
                            <Link
                                href="/assets"
                                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                            >
                                {t('nav.assets')}
                            </Link>
                            <Link
                                href="/market"
                                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                            >
                                {t('nav.market')}
                            </Link>
                            <Link
                                href="/dispatch"
                                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                            >
                                {t('nav.dispatch')}
                            </Link>
                            <Link
                                href="/settlement"
                                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                            >
                                {t('nav.settlement')}
                            </Link>
                        </nav>

                        {/* 右侧操作区 */}
                        <div className="flex items-center gap-4">
                            <LocaleSwitcher />
                            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer">
                                {t('nav.login')}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* 主内容区 */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <section className="text-center py-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        {t('status.online')}
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        {tDashboard('title')}
                    </h2>

                    <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
                        {tDashboard('subtitle')}
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/dashboard"
                            className="px-8 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200"
                        >
                            {t('nav.dashboard')}
                        </Link>
                        <Link
                            href="/assets"
                            className="px-8 py-3 text-base font-semibold text-slate-300 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-slate-600 rounded-xl transition-all duration-200"
                        >
                            {t('nav.assets')}
                        </Link>
                    </div>
                </section>

                {/* 功能卡片 */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
                    {/* 实时监控 */}
                    <div className="group p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">{t('nav.dashboard')}</h3>
                        <p className="text-sm text-slate-400">{tDashboard('overview.title')}</p>
                    </div>

                    {/* 资产管理 */}
                    <div className="group p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-green-500/50 transition-all duration-300 cursor-pointer">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">{t('nav.assets')}</h3>
                        <p className="text-sm text-slate-400">{tDashboard('map.title')}</p>
                    </div>

                    {/* 市场竞价 */}
                    <div className="group p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300 cursor-pointer">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                            <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">{t('nav.market')}</h3>
                        <p className="text-sm text-slate-400">{tDashboard('market.title')}</p>
                    </div>

                    {/* 调度控制 */}
                    <div className="group p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">{t('nav.dispatch')}</h3>
                        <p className="text-sm text-slate-400">{t('nav.dispatch_description')}</p>
                    </div>
                </section>

                {/* 实时指标 */}
                <section className="py-12">
                    <h3 className="text-2xl font-bold text-white mb-8 text-center">{tDashboard('overview.title')}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20">
                            <p className="text-sm text-blue-300 mb-1">{tDashboard('overview.totalCapacity')}</p>
                            <p className="text-3xl font-bold text-white">1,250 <span className="text-lg text-slate-400">{t('units.mw')}</span></p>
                        </div>
                        <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20">
                            <p className="text-sm text-green-300 mb-1">{tDashboard('overview.activeAssets')}</p>
                            <p className="text-3xl font-bold text-white">2,847</p>
                        </div>
                        <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20">
                            <p className="text-sm text-amber-300 mb-1">{tDashboard('frequency.current')}</p>
                            <p className="text-3xl font-bold text-white">50.02 <span className="text-lg text-slate-400">{t('units.hz')}</span></p>
                        </div>
                        <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20">
                            <p className="text-sm text-purple-300 mb-1">{tDashboard('market.currentPrice')}</p>
                            <p className="text-3xl font-bold text-white">487.50 <span className="text-lg text-slate-400">{t('units.pln')}</span></p>
                        </div>
                    </div>
                </section>
            </main>

            {/* 页脚 */}
            <footer className="border-t border-slate-800 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-sm text-slate-400">© 2026 PSE S.A. - NextGen VPP Platform</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-slate-500">
                            <span>Powered by Antigravity</span>
                            <LocaleSwitcher />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
