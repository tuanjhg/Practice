import { NextRequest, NextResponse } from 'next/server'


const publicRoutes = ['/login']


const protectedRoutes = ['/dashboard', '/vehicles', '/orders', '/garages', '/settings']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }


  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  if (isProtectedRoute) {

    const token = request.cookies.get('accessToken')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {

      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }


    if (token === 'mock-token' || token.length > 0) {
      return NextResponse.next()
    } else {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}