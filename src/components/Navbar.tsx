'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from './LocaleSwitcher';
import { useState } from 'react';

const ROLES = [
    { id: 'pse', name: 'PSE Operator', badge: 'bg-red-500/20 text-red-400 border-red-500/30' },
    { id: 'aggregator', name: 'Aggregator (NextGen)', badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { id: 'prosumer', name: 'Prosumer (PV)', badge: 'bg-green-500/20 text-green-400 border-green-500/30' }
];

export default function Navbar() {
    const t = useTranslations('common');
    const [currentRole, setCurrentRole] = useState(ROLES[1]); // Default: Aggregator
    const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

    const handleRoleChange = (role: typeof ROLES[0]) => {
        setCurrentRole(role);
        setIsRoleMenuOpen(false);
        // In a real app, this would trigger a context update or re-login
        // For demo, we just update local state and maybe show a toast
    };

    return (
        <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* 左侧 Logo 和导航 */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-white leading-none tracking-tight">PSE NextGen</span>
                                <span className="text-[10px] text-blue-400 font-medium tracking-wider">VIRTUAL POWER PLANT</span>
                            </div>
                        </Link>

                        <div className="hidden md:flex items-center gap-1">
                            {[
                                { href: '/dashboard', label: t('nav.dashboard') },
                                { href: '/assets', label: t('nav.assets') },
                                { href: '/market', label: t('nav.market') },
                                { href: '/dispatch', label: t('nav.dispatch') },
                                { href: '/settlement', label: t('nav.settlement') },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* 右侧工具栏 */}
                    <div className="flex items-center gap-4">
                        {/* 系统状态 */}
                        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-medium text-green-400">System Normal</span>
                        </div>

                        {/* 语言切换 */}
                        <LocaleSwitcher />

                        <div className="h-6 w-px bg-slate-800" />

                        {/* 用户与角色切换 */}
                        <div className="relative">
                            <button
                                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                                className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-lg hover:bg-slate-800 transition-all cursor-pointer border border-transparent hover:border-slate-700"
                            >
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-white">{currentRole.name}</p>
                                    <p className="text-xs text-slate-400">View Mode</p>
                                </div>
                                <div className={`w-8 h-8 rounded-full border-2 ${currentRole.badge.replace('bg-', 'bg-').split(' ')[2]} flex items-center justify-center bg-slate-800`}>
                                    <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </button>

                            {/* 角色下拉菜单 */}
                            {isRoleMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsRoleMenuOpen(false)} />
                                    <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-20 py-2 animate-in fade-in slide-in-from-top-2">
                                        <div className="px-4 py-2 border-b border-slate-700/50 mb-1">
                                            <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Switch Role (Simulation)</p>
                                        </div>
                                        {ROLES.map((role) => (
                                            <button
                                                key={role.id}
                                                onClick={() => handleRoleChange(role)}
                                                className={`w-full text-left px-4 py-3 hover:bg-slate-700/50 transition-colors flex items-center gap-3 cursor-pointer
                                        ${currentRole.id === role.id ? 'bg-slate-700/30' : ''}
                                    `}
                                            >
                                                <div className={`w-2 h-2 rounded-full ${role.id === currentRole.id ? 'bg-blue-400' : 'bg-slate-600'}`} />
                                                <div>
                                                    <p className={`text-sm font-medium ${role.id === currentRole.id ? 'text-white' : 'text-slate-300'}`}>{role.name}</p>
                                                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${role.badge} inline-block mt-1`}>
                                                        {role.id.toUpperCase()}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
