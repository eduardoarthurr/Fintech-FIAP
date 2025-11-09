import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Fintech | Categoria",
  description: "O Bancãozinho",
};

export default async function Layout({ children }: RootLayoutProps) {
  return children;
}
