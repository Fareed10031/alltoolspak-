import { NextResponse } from 'next/server';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  if (pathname === '/live-currency-gold-rates' || pathname === '/live-currency-gold-rates/') {
    return NextResponse.redirect(new URL('/currency-gold-rates/', request.url), 301);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/live-currency-gold-rates/:path*'] };
