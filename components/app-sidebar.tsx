"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import {
  BookOpen,
  Bot,
  Earth,
  Goal,
  Home,
  Map,
  Settings2,
  ShieldAlert,
  SolarPanel,
  SquareTerminal,
  User,
} from "lucide-react"

import { NavProjects } from "@/components/nav-projects"
import { TeamSwitcher } from "@/components/team-switcher"
import { ThemeSettings } from "@/components/theme-settings"
import { LanguageSwitcher } from "@/components/language-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("Sidebar")

  const projects = [
    {
      name: t("home"),
      url: "/",
      icon: Home,
    },
    {
      name: t("cpTp"),
      url: "/cp-tp",
      icon: Goal,
    },
    {
      name: t("efekRumahKaca"),
      url: "/efek-rumah-kaca",
      icon: SolarPanel,
    },
    {
      name: t("pemanasanGlobal"),
      url: "/pemanasan-global",
      icon: Earth,
    },
    {
      name: t("climateAction"),
      url: "/climate-action",
      icon: ShieldAlert,
    },
    {
      name: t("aktivitasSiswa"),
      url: "/aktivitas-siswa",
      icon: Map,
    },
    {
      name: t("profilePengembang"),
      url: "/profile-pengembang",
      icon: User,
    },
  ]

  const teams = [
    {
      name: "Simulasi Komputer",
      logo: "/favicon.ico",
      plan: "STEM-ESD",
    }
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={projects} />
        <LanguageSwitcher />
        <ThemeSettings />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
