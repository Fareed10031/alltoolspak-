import { NextResponse } from 'next/server';

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/live-currency-gold-rates')) {
    return NextResponse.redirect(new URL('/currency-gold-rates/', request.url), 301);
  }
  return NextResponse.next();
}
