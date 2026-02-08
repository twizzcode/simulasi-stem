"use client"

import * as React from "react"

type UserPos = { x: number; y: number }

type PetaProgressContextValue = {
  userPos: UserPos
  setUserPos: (pos: UserPos) => void
  visitedIslands: Set<string>
  markVisited: (id: string) => void
}

const PetaProgressContext = React.createContext<PetaProgressContextValue | null>(
  null
)

export function PetaProgressProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [userPos, setUserPos] = React.useState<UserPos>({ x: 50, y: 50 })
  const [visitedIslands, setVisitedIslands] = React.useState<Set<string>>(
    () => new Set()
  )

  const markVisited = React.useCallback((id: string) => {
    setVisitedIslands((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  const value = React.useMemo(
    () => ({ userPos, setUserPos, visitedIslands, markVisited }),
    [userPos, visitedIslands, markVisited]
  )

  return (
    <PetaProgressContext.Provider value={value}>
      {children}
    </PetaProgressContext.Provider>
  )
}

export function usePetaProgress() {
  const context = React.useContext(PetaProgressContext)
  if (!context) {
    throw new Error("usePetaProgress must be used within PetaProgressProvider")
  }
  return context
}
