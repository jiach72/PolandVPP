import { getRequestConfig } from 'next-intl/server';
import { locales, type Locale } from './config';

// 动态加载翻译文件
async function loadMessages(locale: Locale) {
    const messages: Record<string, unknown> = {};

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

export default getRequestConfig(async ({ requestLocale }) => {
    // 获取请求的语言
    let locale = await requestLocale;

    // 验证语言是否支持
    if (!locale || !locales.includes(locale as Locale)) {
        locale = 'pl'; // 默认波兰语
    }

    const messages = await loadMessages(locale as Locale);

    return {
        locale,
        messages,
        timeZone: 'Europe/Warsaw',
        now: new Date(),
    };
});
