"use client";

import React from "react";

import LoginPage from "../login/page";
import { useSession } from "next-auth/react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";
import { AppSidebar } from "@/shared/components/app-sidebar";
import { ModeToggle } from "@/shared/components/ui/mode-toggle";
import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: RootLayoutProps) {
  const session = useSession();

  return (
    <>
      {session.status === "authenticated" ? (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="h-screen overflow-y-hidden">
            <div className="h-24 p-4 flex justify-between items-center">
              <SidebarTrigger />
              <div className="flex gap-4 justify-end">
                <div className="flex items-center justify-end">
                  <ModeToggle />
                </div>
                <div className="flex flex-col justify-end">
                  <p className="flex items-center justify-end">
                    {session.data?.user?.name}
                  </p>
                  <p className="flex items-center justify-end">
                    {session.data?.user?.email}
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <Avatar>
                    <AvatarImage src={""} alt="@shadcn" />
                    <AvatarFallback>
                      {session.data?.user?.name?.slice(0, 1) ?? ""}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-auto">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      ) : (
        <LoginPage />
      )}
    </>
  );
}
