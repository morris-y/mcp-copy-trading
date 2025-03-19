import type { Metadata } from "next"
import { Inter } from "next/font/google"

export const metadata: Metadata = {
  title: "推特数据分析 | MCP 辅助跟单系统",
  description: "使用MCP进行推特舆情分析",
}

export default function TwitterLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  )
}
