import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales, type Locale } from './config';

// 动态加载翻译文件
async function loadMessages(locale: Locale) {
    const messages: any = {};

    // 加载所有命名空间的翻译
    const namespaces = ['common', 'dashboard', 'assets', 'market', 'dispatch', 'settlement'];

    for (const namespace of namespaces) {
        try {
            const module = await import(`../../messages/${locale}/${namespace}.json`);
            messages[namespace] = module.default;
        } catch {
            // 如果翻译文件不存在，使用空对象
            console.warn(`Missing translation file: ${locale}/${namespace}.json`);
            messages[namespace] = {};
        }
    }

    return messages;
}

export default getRequestConfig(async (params) => {
    // 验证语言是否支持
    const locale = params.locale as Locale;

    if (!locales.includes(locale)) {
        notFound();
    }

    const messages = await loadMessages(locale);

    return {
        messages,
        timeZone: 'Europe/Warsaw',
    };
});
