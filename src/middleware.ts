import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // If accessing root, redirect to default locale
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/pl', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/']
};
