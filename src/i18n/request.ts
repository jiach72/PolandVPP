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
        const messages = {
            common: (await import(`../../messages/${locale}/common.json`)).default,
            dashboard: (await import(`../../messages/${locale}/dashboard.json`)).default,
            assets: (await import(`../../messages/${locale}/assets.json`)).default,
            market: (await import(`../../messages/${locale}/market.json`)).default,
            dispatch: (await import(`../../messages/${locale}/dispatch.json`)).default,
            settlement: (await import(`../../messages/${locale}/settlement.json`)).default,
        };

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
