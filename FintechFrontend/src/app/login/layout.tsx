import React from "react";
import { auth } from "@/shared/config/nextauth/auth";
import { redirect } from "next/navigation";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Fintech",
  description: "O Bancãozinho",
};

export default async function Layout({ children }: RootLayoutProps) {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return children;
}
