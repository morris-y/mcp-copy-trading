"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { BarChart3, LineChart, Users, Activity, Twitter } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "KOL管理",
      icon: Users,
      active: pathname === "/",
    },
    {
      href: "/ab-test",
      label: "A/B测试",
      icon: BarChart3,
      active: pathname === "/ab-test",
    },
    {
      href: "/twitter",
      label: "推特数据",
      icon: Twitter,
      active: pathname === "/twitter",
    },
    {
      href: "/data",
      label: "宏观数据",
      icon: LineChart,
      active: pathname === "/data",
    },
    {
      href: "/simulator",
      label: "模拟器跟单交易",
      icon: Activity,
      active: pathname === "/simulator",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">MCP 辅助跟单系统</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                  route.active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <ThemeToggle />
          </div>
        </div>
      </div>
      <nav className="md:hidden container overflow-auto">
        <div className="flex items-center justify-between">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex h-10 w-full items-center justify-center gap-1 rounded-md px-4 text-center text-sm font-medium transition-colors hover:text-primary",
                route.active ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
