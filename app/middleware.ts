import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const locale = request.nextUrl.pathname.split("/")[1];
  const isValidLocale = ["en", "de", "ua"].includes(locale);

  if (request.nextUrl.pathname.includes("/admin")) {
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(
        new URL(`/${isValidLocale ? locale : "en"}/login`, request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:locale/admin/:path*"],
};
