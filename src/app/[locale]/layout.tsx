import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from 'sonner';

// Simple locales list - no external dependencies
const validLocales = ['pl', 'en', 'zh'];

// Static imports for all message files
import enCommon from '../../../messages/en/common.json';
import enDashboard from '../../../messages/en/dashboard.json';
import enAssets from '../../../messages/en/assets.json';
import enMarket from '../../../messages/en/market.json';
import enDispatch from '../../../messages/en/dispatch.json';
import enSettlement from '../../../messages/en/settlement.json';

import plCommon from '../../../messages/pl/common.json';
import plDashboard from '../../../messages/pl/dashboard.json';
import plAssets from '../../../messages/pl/assets.json';
import plMarket from '../../../messages/pl/market.json';
import plDispatch from '../../../messages/pl/dispatch.json';
import plSettlement from '../../../messages/pl/settlement.json';

import zhCommon from '../../../messages/zh/common.json';
import zhDashboard from '../../../messages/zh/dashboard.json';
import zhAssets from '../../../messages/zh/assets.json';
import zhMarket from '../../../messages/zh/market.json';
import zhDispatch from '../../../messages/zh/dispatch.json';
import zhSettlement from '../../../messages/zh/settlement.json';

// Pre-bundled message objects
const allMessages: Record<string, any> = {
    en: {
        common: enCommon,
        dashboard: enDashboard,
        assets: enAssets,
        market: enMarket,
        dispatch: enDispatch,
        settlement: enSettlement,
    },
    pl: {
        common: plCommon,
        dashboard: plDashboard,
        assets: plAssets,
        market: plMarket,
        dispatch: plDispatch,
        settlement: plSettlement,
    },
    zh: {
        common: zhCommon,
        dashboard: zhDashboard,
        assets: zhAssets,
        market: zhMarket,
        dispatch: zhDispatch,
        settlement: zhSettlement,
    },
};

export const metadata: Metadata = {
    title: "PSE NextGen VPP Platform",
    description: "Virtual Power Plant Platform for Polish Power Grid",
};

// Remove edge runtime - Vercel uses Node.js by default which supports next-intl

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!validLocales.includes(locale)) {
        notFound();
    }

    // Get pre-bundled messages for this locale
    const messages = allMessages[locale] || allMessages['en'];

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
