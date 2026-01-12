import { getRequestConfig } from 'next-intl/server';
import { routing } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    // Validate that the incoming `locale` parameter is valid
    if (!locale || !routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale;
    }

    console.log(`[RequestConfig] Loading messages for locale: ${locale}`);

    try {
        let messages: any;
        switch (locale) {
            case 'zh':
                messages = {
                    common: (await import('../../messages/zh/common.json')).default,
                    dashboard: (await import('../../messages/zh/dashboard.json')).default,
                    assets: (await import('../../messages/zh/assets.json')).default,
                    market: (await import('../../messages/zh/market.json')).default,
                    dispatch: (await import('../../messages/zh/dispatch.json')).default,
                    settlement: (await import('../../messages/zh/settlement.json')).default,
                };
                break;
            case 'pl':
                messages = {
                    common: (await import('../../messages/pl/common.json')).default,
                    dashboard: (await import('../../messages/pl/dashboard.json')).default,
                    assets: (await import('../../messages/pl/assets.json')).default,
                    market: (await import('../../messages/pl/market.json')).default,
                    dispatch: (await import('../../messages/pl/dispatch.json')).default,
                    settlement: (await import('../../messages/pl/settlement.json')).default,
                };
                break;
            case 'en':
            default:
                messages = {
                    common: (await import('../../messages/en/common.json')).default,
                    dashboard: (await import('../../messages/en/dashboard.json')).default,
                    assets: (await import('../../messages/en/assets.json')).default,
                    market: (await import('../../messages/en/market.json')).default,
                    dispatch: (await import('../../messages/en/dispatch.json')).default,
                    settlement: (await import('../../messages/en/settlement.json')).default,
                };
                break;
        }

        console.log(`[RequestConfig] Successfully loaded messages for locale: ${locale}`);
        return {
            locale,
            messages
        };
    } catch (error) {
        console.error(`[RequestConfig] Error loading messages for locale ${locale}:`, error);
        return {
            locale,
            messages: {}
        };
    }
});
