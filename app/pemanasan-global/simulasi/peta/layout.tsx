"use client"

import * as React from "react"

import { PetaProgressProvider } from "./peta-progress-context"

export default function PetaLayout({ children }: { children: React.ReactNode }) {
  return <PetaProgressProvider>{children}</PetaProgressProvider>
}
