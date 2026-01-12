import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './config';

// 创建本地化导航工具
export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
    locales,
    localePrefix: 'always',
});
