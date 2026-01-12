import DashboardClientContent from '@/components/DashboardClientContent';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function DashboardPage({ params }: Props) {
    await params; // Keep params resolution for Next.js

    return <DashboardClientContent />;
}
