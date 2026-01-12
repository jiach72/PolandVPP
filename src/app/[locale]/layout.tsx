import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/config';
import type { Metadata } from "next";
// import localFont from "next/font/local"; // 假设之前没有用 localFont 或者用了默认的 global.css
import "../globals.css"; // 确保引入全局样式
import { Toaster } from 'sonner';

// const geistSans = localFont({
//   src: "../fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "../fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
    title: "PSE NextGen VPP Platform",
    description: "Virtual Power Plant Platform for Polish Power Grid",
};

export const runtime = 'edge';

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
    // side is the easiest way to get started
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
            </body>
        </html>
    );
}
