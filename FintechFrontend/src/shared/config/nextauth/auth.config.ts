/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { jwtDecode } from "jwt-decode";

export default {
  trustHost: true,
  secret: "EgAg+Y2ojVGlK3ELfpENWBoXJTMhYckPS0KIRZ5luPE=",
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        token: { label: "token", type: "text" },
      },
      async authorize(credentials) {
        try {
          if (!credentials || !credentials.token) {
            throw new Error("Credenciais inválidas.");
          }

          const { token } = credentials;

          if (!token) {
            throw new Error("Autenticação falhou.");
          }

          return { token: credentials.token };
        } catch (error: any) {
          console.log("Erro ao autenticar com Cognito:", error.message);

          return error;
        }
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        try {
          if (token) {
            const backendJwt: string = user.token;
            const payload: any = jwtDecode(backendJwt);
            console.log("backendJwt", backendJwt);
            console.log("payload", payload);
            token.raw = backendJwt;
            token.name = payload.nome || payload.name || "";
            token.email = payload.email || "";
            token.id = payload.id || "";
            token.sub = payload.id || "";
            token.cpf = payload.cpf || "";
            token.endereco = payload.endereco || "";
            token.dataNascimento =
              payload.dataNascimento || payload.data_nascimento || "";
            token.accessTokenExpires = token.exp ?? Date.now() + 1000 * 60 * 60;
            console.log("token", token);
          } else {
            // console.log("user", user);
            return token;
          }
        } catch (error) {
          console.error("Erro ao decodificar idToken:", error);
          return token;
        }
      }

      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        cpf: token.cpf,
        endereco: token.endereco,
        dataNascimento: token.dataNascimento,
      };
      return session;
    },
  },
  // debug: true,
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? `__Secure-next-auth.session-token`
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
} satisfies NextAuthConfig;
