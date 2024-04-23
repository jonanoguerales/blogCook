import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("accessToken");
  if (token === undefined) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  try {
    const { payload } = await jwtVerify(
      token.value,
      new TextEncoder().encode("secret")
    );

    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/posts/:path*", "/redactar", "/contacto", "/dashboard"],
};
