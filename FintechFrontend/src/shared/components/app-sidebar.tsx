"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/shared/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "",
      url: "#",
      items: [
        {
          title: "Início",
          url: "/",
        },
        {
          title: "Usuarios",
          url: "/usuarios",
        },
        {
          title: "Categoria",
          url: "/categoria",
        },
        {
          title: "Orçamento",
          url: "/orcamento",
        },
        {
          title: "Sair",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const path = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex justify-center items-center p-4 font-semibold tracking-wide text-xl">
          <h1>FINTECH</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.title === "Sair" ? (
                      <SidebarMenuButton className="cursor-pointer" asChild>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            signOut({ callbackUrl: "/login" });
                          }}
                        >
                          {item.title}
                        </a>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton
                        className="cursor-pointer"
                        asChild
                        isActive={path.includes(
                          item.title
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                        )}
                      >
                        <a href={item.url}>{item.title}</a>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
