"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Home, BarChart3, Settings } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function AppHeader() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    // { href: "/decks", label: "Decks", icon: BookOpen },
    { href: "/stats", label: "Statistics", icon: BarChart3 },
    // { href: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold">FlashLearn</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center justify-between space-x-1 md:justify-end">
          <div className="hidden md:flex gap-2">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                asChild
                className={cn("h-9 px-4", pathname === item.href && "bg-muted font-medium")}
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>

        </nav>
      </div>
    </header>
  )
}
