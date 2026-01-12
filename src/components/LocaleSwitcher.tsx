'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { locales, localeConfig, type Locale } from '@/i18n/config';
import { useState, useTransition, useRef, useEffect } from 'react';
import { FlagPL, FlagGB, FlagCN } from './FlagIcons';

export default function LocaleSwitcher() {
    const t = useTranslations('common');
    const locale = useLocale() as Locale;
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const FlagComponents = {
        pl: FlagPL,
        en: FlagGB,
        zh: FlagCN
    };

    // 点击外部关闭下拉菜单
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function handleLocaleChange(newLocale: Locale) {
        startTransition(() => {
            // Construct new path: replace current locale with new locale
            const segments = pathname.split('/');
            if (segments[1] && ['pl', 'en', 'zh'].includes(segments[1])) {
                segments[1] = newLocale;
            }
            const newPath = segments.join('/') || `/${newLocale}`;
            router.replace(newPath);
            setIsOpen(false);
        });
    }

    const currentLocale = localeConfig[locale];
    const CurrentFlag = FlagComponents[locale];

    return (
        <div className="relative" ref={dropdownRef}>
            {/* 触发按钮 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={isPending}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 
                   hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-200
                   disabled:opacity-50 disabled:cursor-wait cursor-pointer group"
                aria-label={t('language.select')}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <div className="w-6 h-6 rounded-full shadow-sm group-hover:shadow transition-shadow">
                    <CurrentFlag className="w-full h-full" />
                </div>
                <span className="text-sm font-medium text-slate-200">
                    {currentLocale.nativeName}
                </span>
                <svg
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* 下拉菜单 */}
            {isOpen && (
                <div
                    className="absolute top-full right-0 mt-2 w-44 py-1 bg-slate-800 border border-slate-700 
                     rounded-lg shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                    role="listbox"
                    aria-label={t('language.select')}
                >
                    {locales.map((loc) => {
                        const config = localeConfig[loc];
                        const isActive = loc === locale;
                        const Flag = FlagComponents[loc];

                        return (
                            <button
                                key={loc}
                                onClick={() => handleLocaleChange(loc)}
                                disabled={isPending || isActive}
                                role="option"
                                aria-selected={isActive}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors cursor-pointer
                  ${isActive
                                        ? 'bg-blue-600/20 text-blue-400'
                                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                                    }
                  disabled:cursor-default`}
                            >
                                <div className="w-6 h-6 rounded-full shadow-sm">
                                    <Flag className="w-full h-full" />
                                </div>
                                <span className="flex-1 text-sm font-medium">
                                    {config.nativeName}
                                </span>
                                {isActive && (
                                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* 加载指示器 */}
            {isPending && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800/80 rounded-lg">
                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                </div>
            )}
        </div>
    );
}
