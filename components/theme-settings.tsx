"use client"

import * as React from "react"
import { Moon, Palette, Sun } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type ThemeMode = "default" | "colorful"

const THEME_KEY = "theme-mode"
const DARK_KEY = "theme-dark"

export function ThemeSettings() {
  const [theme, setTheme] = React.useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "default"
    return (localStorage.getItem(THEME_KEY) as ThemeMode) || "default"
  })
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof window === "undefined") return false
    return localStorage.getItem(DARK_KEY) === "true"
  })
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.classList.toggle("dark", isDark)
    localStorage.setItem(THEME_KEY, theme)
    localStorage.setItem(DARK_KEY, String(isDark))
  }, [theme, isDark])

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Pengaturan</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() =>
              setTheme((prev) => (prev === "colorful" ? "default" : "colorful"))
            }
          >
            <Palette />
            <span>Skema Warna</span>
            <span className="ml-auto text-xs text-muted-foreground">
              {mounted ? (theme === "colorful" ? "Colorful" : "Default") : "…"}
            </span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton onClick={() => setIsDark((prev) => !prev)}>
            {isDark ? <Moon /> : <Sun />}
            <span>Dark Mode</span>
            <span className="ml-auto text-xs text-muted-foreground">
              {mounted ? (isDark ? "On" : "Off") : "…"}
            </span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
