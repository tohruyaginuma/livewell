"use client";

import * as React from "react";
import {
  IconBrandGithub,
  IconDashboard,
  IconInnerShadowTop,
} from "@tabler/icons-react";

import { NavMain } from "@/frontend/components/nav-main";
import { NavUser } from "@/frontend/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/frontend/components/ui/sidebar";
import { useMeStore } from "@/frontend/stores/use-me-store";
import { NavSecondary } from "@/frontend/components/nav-secondary";

const data = {
  navMain: [
    {
      title: "Medications",
      url: "/",
      icon: IconDashboard,
    },
  ],
  navSecondary: [
    {
      title: "GitHub",
      url: "https://github.com/tohruyaginuma/medication-management-app",
      icon: IconBrandGithub,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { id, name } = useMeStore();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">
                  Medications Management
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ id: id, name: name }} />
      </SidebarFooter>
    </Sidebar>
  );
}
