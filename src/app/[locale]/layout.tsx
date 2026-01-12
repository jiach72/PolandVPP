import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/config';
import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from 'sonner';

export const metadata: Metadata = {
    title: "PSE NextGen VPP Platform",
    description: "Virtual Power Plant Platform for Polish Power Grid",
};

export const runtime = 'edge';

// Static message loader for Edge Runtime compatibility
async function loadMessages(locale: string) {
    switch (locale) {
        case 'zh':
            return {
                common: (await import('../../../messages/zh/common.json')).default,
                dashboard: (await import('../../../messages/zh/dashboard.json')).default,
                assets: (await import('../../../messages/zh/assets.json')).default,
                market: (await import('../../../messages/zh/market.json')).default,
                dispatch: (await import('../../../messages/zh/dispatch.json')).default,
                settlement: (await import('../../../messages/zh/settlement.json')).default,
            };
        case 'pl':
            return {
                common: (await import('../../../messages/pl/common.json')).default,
                dashboard: (await import('../../../messages/pl/dashboard.json')).default,
                assets: (await import('../../../messages/pl/assets.json')).default,
                market: (await import('../../../messages/pl/market.json')).default,
                dispatch: (await import('../../../messages/pl/dispatch.json')).default,
                settlement: (await import('../../../messages/pl/settlement.json')).default,
            };
        case 'en':
        default:
            return {
                common: (await import('../../../messages/en/common.json')).default,
                dashboard: (await import('../../../messages/en/dashboard.json')).default,
                assets: (await import('../../../messages/en/assets.json')).default,
                market: (await import('../../../messages/en/market.json')).default,
                dispatch: (await import('../../../messages/en/dispatch.json')).default,
                settlement: (await import('../../../messages/en/settlement.json')).default,
            };
    }
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Load messages directly for Edge Runtime compatibility
    const messages = await loadMessages(locale);

    return (
        <html lang={locale}>
            <body
                className={`bg-slate-900 text-slate-100 antialiased`}
            >
                <div className='relative z-[50]'>
                    <Toaster position="top-right" theme="dark" richColors />
                </div>
                <NextIntlClientProvider messages={messages} locale={locale}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

