import { NextResponse } from "next/server";
import { getProfile } from "./actions";

const publicRoutes = ["/login", "/register"];

export async function middleware(req, res) {
  var pathname = req.nextUrl.pathname;

  var user = await getProfile();

  if (!user && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (user && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
}

export const config = {
  matcher: ["/login", "/register", "/portal/:path*"],
};
