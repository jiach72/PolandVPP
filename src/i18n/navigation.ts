'use client';

// Simple navigation without next-intl/navigation dependency
import NextLink from 'next/link';
import { useRouter as useNextRouter, usePathname as useNextPathname } from 'next/navigation';

// Re-export Next.js navigation primitives
export const Link = NextLink;
export const useRouter = useNextRouter;
export const usePathname = useNextPathname;

// Simple redirect function
export function redirect(pathname: string) {
    if (typeof window !== 'undefined') {
        window.location.href = pathname;
    }
}
