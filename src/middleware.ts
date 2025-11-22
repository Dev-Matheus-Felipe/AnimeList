import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const cookie = req.cookies.get("loginData")?.value;
    let data;

    try{ data = cookie ? JSON.parse(cookie) : undefined; }
    catch{ data = undefined; }
    
    const logged = data?.logged;

    if(req.nextUrl.pathname === "/sign-in")
        return (logged) ? NextResponse.redirect(new URL("/", req.url)) : NextResponse.next();

    else
        return (!logged) ? NextResponse.redirect(new URL("/sign-in", req.url)) : NextResponse.next();
    
}

export const config = {
    matcher: [ "/", "/movies", "/my-list", "/search/:path*", "/sign-in" ]
};