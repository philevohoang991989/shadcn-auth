import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { Locale, i18n } from "@/i18n.config";
import { CustomMiddleware } from "./chain";

const protectedPaths = ["/dashboard","/user","/dashboard/forms"];

function getProtectedRoutes(protectedPaths: string[], locales: Locale[]) {
  let protectedPathsWithLocale = [...protectedPaths];

  protectedPaths.forEach((route) => {
    locales.forEach(
      (locale) =>
        (protectedPathsWithLocale = [
          ...protectedPathsWithLocale,
          `/${locale}${route}`,
        ])
    );
  });

  return protectedPathsWithLocale;
}

export function withAuthMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // Create a response object to pass down the chain
    const response = NextResponse.next();

    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    
    // @ts-ignore
    request.nextauth = request.nextauth || {};
    // @ts-ignore
    request.nextauth.token = token;
    const pathname = request.nextUrl.pathname;

    const protectedPathsWithLocale = getProtectedRoutes(protectedPaths, [
      ...i18n.locales,
    ]);
    console.log({ protectedPathsWithLocale,pathname ,same :protectedPathsWithLocale.includes(pathname), i18: i18n.locales});

    // if (!token) {
    //   const signInUrl = new URL("/log-in", request.url);
    //   signInUrl.searchParams.set("callbackUrl", pathname);
    //   console.log("not login 1");
    //   return NextResponse.redirect(signInUrl);
    // }
    // if (
    //   !token &&
    //   pathname !== "/log-in" &&
    //   pathname !== "/register" &&
    //   protectedPathsWithLocale.includes(pathname)
    // ) {
    //   console.log("not login 2");

    //   return NextResponse.redirect(new URL("/log-in", request.url));
    // }
    if (token || pathname.includes('/api/auth') || pathname.includes('/_next')) {
      if (pathname === '/log-in') {
        return NextResponse.redirect(new URL('/', request.url))
      }
  
      return NextResponse.next()
    }
  
    // Redirect to login if (1) user doesn't have a token AND (2) is requesting protected route
    if (!token && protectedPathsWithLocale.includes(pathname)) {
      return NextResponse.redirect(new URL("/log-in", request.url));
    }

    return middleware(request, event, response);
  };
}
