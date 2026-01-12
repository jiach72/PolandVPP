import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import "../globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// 生成静态参数
export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

// 动态元数据
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    const titles: Record<string, string> = {
        pl: 'PSE NextGen VPP | Panel zarządzania wirtualną elektrownią',
        en: 'PSE NextGen VPP | Virtual Power Plant Management',
        zh: 'PSE NextGen VPP | 虚拟电厂管理平台',
    };

    const descriptions: Record<string, string> = {
        pl: 'Platforma zarządzania i dyspozytorska dla wirtualnych elektrowni w polskim systemie energetycznym',
        en: 'Management and dispatch platform for virtual power plants in the Polish energy system',
        zh: '波兰电力系统虚拟电厂管理与调度平台',
    };

    return {
        title: titles[locale] || titles.pl,
        description: descriptions[locale] || descriptions.pl,
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

    // 验证语言
    if (!locales.includes(locale as Locale)) {
        notFound();
    }

    // 启用静态渲染
    setRequestLocale(locale);

    // 获取翻译消息
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-900 text-white min-h-screen`}
            >
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
