import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale } from './config';

// 定义路由配置
export const routing = defineRouting({
    locales,
    defaultLocale,
    localePrefix: 'always', // 始终显示语言前缀 e.g. /pl/dashboard
});

// 创建本地化导航工具
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
