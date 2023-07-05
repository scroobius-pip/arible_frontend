import { NextResponse } from 'next/server'

export const config = {
    matcher: '/big-promo',
}

export async function middleware(req: any) {
    // Check Edge Config to see if the maintenance page should be shown
    const isInMaintenanceMode = true;

    // If in maintenance mode, point the url pathname to the maintenance page
    if (isInMaintenanceMode) {
        req.nextUrl.pathname = `/maintenance`

        // Rewrite to the url
        return NextResponse.rewrite(req.nextUrl)
    }
}