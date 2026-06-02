// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    // 1. Tenta pegar o token que você salvou no login
    const token = request.cookies.get('token')?.value

    // 2. Se o usuário tentar entrar no /admin SEM token, manda de volta para o login
    if (!token && request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // 3. (Opcional) Se o usuário JÁ ESTÁ logado e tenta ir para o /login, manda para o /admin
    if (token && request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/admin', request.url))
    }

    return NextResponse.next()
}

// 4. Configura em quais páginas o segurança deve atuar
export const config = {
    matcher: ['/admin/:path*', '/login'],
}
