import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const pathname = url.pathname;
    
    if (pathname.startsWith('/videos/') || pathname.startsWith('/images/') || pathname.endsWith('.css') || pathname.endsWith('.js') || pathname.startsWith('/_next/')) {
        return NextResponse.next();
    }

    const isAuthPage = url.pathname === '/authentic';
    const token = request.cookies.get('jwt')?.value;

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL('/authentic', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/(.*)'],
};
