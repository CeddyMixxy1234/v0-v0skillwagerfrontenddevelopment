"use client"

import { Card } from "@/components/ui/card"
import type { ReactNode } from "react"

interface AccessibleCardProps {
  children: ReactNode
  title: string
  icon?: ReactNode
  className?: string
  ariaLevel?: 1 | 2 | 3
}

export function AccessibleCard({ children, title, icon, className = "", ariaLevel = 2 }: AccessibleCardProps) {
  return (
    <Card className={`p-6 border-border ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <h2 className="text-xl font-bold" role="heading" aria-level={ariaLevel}>
          {title}
        </h2>
      </div>
      {children}
    </Card>
  )
}
