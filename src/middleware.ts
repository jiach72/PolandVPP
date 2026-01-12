import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always',
});

export const config = {
    // 匹配所有路径，除了以下路径：
    // - api (API 路由)
    // - _next (Next.js 内部路由)
    // - static files
    matcher: ['/', '/(pl|en|zh)/:path*', '/((?!api|_next|.*\\..*).*)'],
};
