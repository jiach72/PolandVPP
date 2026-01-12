import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/navigation';

export default createMiddleware(routing);

export const config = {
    // 匹配所有路径，除了以下路径：
    // - api (API 路由)
    // - _next (Next.js 内部路由)
    // - _vercel (Vercel 内部路由)
    // - 静态文件 (images, fonts 等)
    matcher: [
        '/',
        '/(pl|en|zh)/:path*',
        '/((?!api|_next|_vercel|.*\\..*).*)',
    ],
};
