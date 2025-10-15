import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const pathParts = pathname.split('/').filter(Boolean);

    const knownRoutes = ['start', 'permission', 'take-selfie', 'validate-selfie', 'form', 'final-processing'];

    // Si la ruta tiene un store como primer segmento
    if (pathParts.length >= 2 && !knownRoutes.includes(pathParts[0])) {
        const route = pathParts[1];

        // Verificar si el segundo segmento es una ruta conocida
        if (knownRoutes.includes(route)) {
            // Reescribir la URL para que Next.js la maneje correctamente
            const newUrl = new URL(`/${route}`, request.url);
            newUrl.search = request.nextUrl.search;

            return NextResponse.rewrite(newUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)).*)',
    ],
};
