import { setRequestLocale } from 'next-intl/server';
import DashboardClientContent from '@/components/DashboardClientContent';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function DashboardPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <DashboardClientContent />;
}
