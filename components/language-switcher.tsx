"use client"

import { useLocale, useTranslations } from "next-intl"
import { useRouter, usePathname } from "@/i18n/navigation"
import { Globe } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations("Sidebar")

  const toggleLocale = () => {
    const nextLocale = locale === "id" ? "en" : "id"
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t("language")}</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={toggleLocale}>
            <Globe />
            <span>{locale === "id" ? "Bahasa Indonesia" : "English"}</span>
            <span className="ml-auto text-xs text-muted-foreground uppercase">
              {locale}
            </span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
