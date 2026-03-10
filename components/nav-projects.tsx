"use client"

import { type LucideIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const pathname = usePathname()
  const t = useTranslations("Sidebar")

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t("projects")}</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              tooltip={item.name}
              isActive={
                pathname === item.url ||
                (item.url !== "/" && pathname.startsWith(`${item.url}/`))
              }
            >
              <Link href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
