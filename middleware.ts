import React from "react";
import { useRouter } from "next/router";
import useAuth from "@/auth/useAuth";
import { PrivateRouteProps } from "@/lib/interfaces";
import { NextRequest, NextResponse } from "next/server";

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  hasRole: role,
  children,
}) => {
  const auth = useAuth();
  const router = useRouter();

  if (!auth) {
    return null;
  }

  const { hasRole, isLogged } = auth;

  if (isLogged()) {
    if (role && !hasRole(role)) {
      router.replace("/");
    }
    return children;
  } else {
    router.replace("/login");
  }

  return null;
};

export async function middleware(request: NextRequest) {
  const authTokens = request.cookies.get("authTokens")?.value;

  if (request.nextUrl.pathname.startsWith("/admin") && !authTokens) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("authTokens");
    return response;
  }

  if (authTokens && request.nextUrl.pathname.startsWith("/login")) {
    const response = NextResponse.redirect(new URL("/admin", request.url));
    return response;
  }

  // Protección adicional para las rutas específicas utilizando PrivateRoute
  const auth = useAuth();
  const router = useRouter();
  const { isLogged } = auth;

  if (isLogged()) {
    const privateRouteProps: PrivateRouteProps = {
      hasRole: "admin", // Cambia este valor según tus necesidades
      children: null,
    };

    const privateRoute = <PrivateRoute {...privateRouteProps} />;
    const privateRouteResult = React.renderToString(privateRoute);

    if (!privateRouteResult) {
      router.replace("/");
      return;
    }
  }
}

export const config = {
  matcher: ["/login", "/"],
};
