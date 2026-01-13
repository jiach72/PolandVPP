import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/config';
import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from 'sonner';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
    title: "PSE NextGen VPP Platform",
    description: "Virtual Power Plant Platform for Polish Power Grid",
};

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

    // Providing all messages to the client
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body
                className={`bg-slate-900 text-slate-100 antialiased`}
            >
                <div className='relative z-[50]'>
                    <Toaster position="top-right" theme="dark" richColors />
                </div>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
                <SpeedInsights />
            </body>
        </html>
    );
}
