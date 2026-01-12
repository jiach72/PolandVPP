import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import '../globals.css';
import { locales, localeNames, type Locale } from '@/i18n';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    const titles: Record<Locale, string> = {
        pl: 'PSE NextGen VPP - Wirtualna Elektrownia',
        en: 'PSE NextGen VPP - Virtual Power Plant',
        zh: 'PSE NextGen VPP - 虚拟电厂平台',
    };

    const descriptions: Record<Locale, string> = {
        pl: 'Platforma zarządzania wirtualną elektrownią dla polskiego systemu energetycznego',
        en: 'Virtual Power Plant management platform for the Polish energy system',
        zh: '波兰能源系统虚拟电厂管理平台',
    };

    return {
        title: titles[locale as Locale] || titles.pl,
        description: descriptions[locale as Locale] || descriptions.pl,
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages({ locale });

    return (
        <html lang={locale} className="dark">
            <body className={`${inter.className} bg-slate-900 text-white antialiased`}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
