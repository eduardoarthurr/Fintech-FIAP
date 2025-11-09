// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Middleware para proteger páginas: se não houver sessão, redireciona para /login.
 * Mantém rotas públicas (/_next, /api/auth, /login, assets estáticos, etc.) sem bloqueio.
 */

const PUBLIC_PATHS = [
  "/login", // sua página de login
  "/api/auth", // endpoints do NextAuth (credentials, providers, etc.)
];

const PUBLIC_FILE_REGEX = /\.(.*)$/; // arquivos estáticos (js, css, png, svg, etc.)

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignora _next, static, favicons e arquivos estáticos
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE_REGEX.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Ignora rotas públicas configuradas (ex.: /login, /api/auth)
  if (
    PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))
  ) {
    return NextResponse.next();
  }

  // pega o token/session do NextAuth (usa cookie)
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    // secureCookie: process.env.NODE_ENV === "production", // opcional
  });

  // se não tiver token válido, redireciona para /login com callbackUrl
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    // opcional: guarda para onde voltar depois do login
    loginUrl.searchParams.set(
      "callbackUrl",
      req.nextUrl.pathname + req.nextUrl.search
    );
    return NextResponse.redirect(loginUrl);
  }

  // usuário autenticado, deixa passar
  return NextResponse.next();
}

// aplica middleware em todas as rotas do app (exceto _next/static etc.)
// você pode ajustar matcher se quiser restringir só algumas rotas
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
