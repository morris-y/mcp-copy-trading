"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, FileText } from "lucide-react"
import Link from "next/link"
import { TransactionTable } from "@/components/transaction-table"
import { StrategyList } from "@/components/strategy-list"
import { DetailedTransactionTable } from "@/components/detailed-transaction-table"

export default function SimulatorPage() {
  const [activeTab, setActiveTab] = useState("strategies")

  return (
    <div className="container py-6">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-3xl font-bold">模拟器跟单交易</h1>
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">跟随聪明钱，自动获取投资收益</p>
        <div className="flex items-center gap-4">
          <Link href="/simulator/strategy/new">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              新建
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-6 w-full max-w-3xl">
            <TabsTrigger value="all" className="flex items-center gap-1">
              <span className="rounded-full bg-muted w-5 h-5 flex items-center justify-center text-xs">全</span>
              All
            </TabsTrigger>
            <TabsTrigger value="solana" className="flex items-center gap-1">
              <span className="rounded-full bg-blue-500 w-5 h-5 flex items-center justify-center text-xs text-white">
                S
              </span>
              Solana
            </TabsTrigger>
            <TabsTrigger value="ethereum" className="flex items-center gap-1">
              <span className="rounded-full bg-indigo-500 w-5 h-5 flex items-center justify-center text-xs text-white">
                E
              </span>
              Ethereum
            </TabsTrigger>
            <TabsTrigger value="base" className="flex items-center gap-1">
              <span className="rounded-full bg-blue-600 w-5 h-5 flex items-center justify-center text-xs text-white">
                B
              </span>
              Base
            </TabsTrigger>
            <TabsTrigger value="bsc" className="flex items-center gap-1">
              <span className="rounded-full bg-yellow-500 w-5 h-5 flex items-center justify-center text-xs text-white">
                B
              </span>
              BSC
            </TabsTrigger>
            <TabsTrigger value="tron" className="flex items-center gap-1">
              <span className="rounded-full bg-red-500 w-5 h-5 flex items-center justify-center text-xs text-white">
                T
              </span>
              Tron
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="strategies" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="strategies">跟单任务</TabsTrigger>
              <TabsTrigger value="records">跟单记录</TabsTrigger>
              <TabsTrigger value="stop">止盈止损</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              {activeTab === "strategies" && (
                <Link href="#">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    导出
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <TabsContent value="strategies">
            <StrategyList />
          </TabsContent>

          <TabsContent value="records">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle>交易记录</CardTitle>
                <CardDescription>所有跟单交易的历史记录</CardDescription>
              </CardHeader>
              <CardContent>
                <TransactionTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle>详细交易记录</CardTitle>
                <CardDescription>查看跟单交易与原始交易的对比</CardDescription>
              </CardHeader>
              <CardContent>
                <DetailedTransactionTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stop">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle>止盈止损设置</CardTitle>
                <CardDescription>管理自动止盈止损规则</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">暂无止盈止损规则</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
