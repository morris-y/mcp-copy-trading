"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { MoreHorizontal, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

// Mock strategy data
const strategies = [
  {
    id: "test4",
    enabled: true,
    name: "test4",
    wallets: "10个钱包",
    account: "模拟器账户",
    lastOperation: "03/19/2025 18:51:25 跟随买入",
    mode: {
      buy: true,
      sell: true,
    },
    validity: "全天 / 全天",
    stopTime: "-",
    transactions: "2 / 1",
    roi: "+8.3%",
  },
  {
    id: "test3",
    enabled: true,
    name: "test3",
    wallets: "10个钱包",
    account: "模拟器账户",
    lastOperation: "03/19/2025 23:11:01 跟随买入",
    mode: {
      buy: true,
      sell: true,
    },
    validity: "全天 / 全天",
    stopTime: "-",
    transactions: "12 / 6",
    roi: "+42.6%",
  },
  {
    id: "test2",
    enabled: true,
    name: "test2",
    wallets: "10个钱包",
    account: "模拟器账户",
    lastOperation: "03/19/2025 23:08:15 跟随买入",
    mode: {
      buy: true,
      sell: true,
    },
    validity: "全天 / 全天",
    stopTime: "-",
    transactions: "28 / 2",
    roi: "+15.2%",
  },
  {
    id: "test",
    enabled: true,
    name: "跟单test",
    wallets: "5个钱包",
    account: "模拟器账户",
    lastOperation: "03/19/2025 23:20:11 止盈卖出",
    mode: {
      buy: true,
      sell: {
        mixed: true,
      },
    },
    validity: "全天 / 全天",
    stopTime: "28",
    transactions: "28 / 20",
    roi: "+106.5%",
  },
]

export function StrategyList() {
  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[50px]">启用</TableHead>
              <TableHead>分组</TableHead>
              <TableHead>跟随钱包</TableHead>
              <TableHead>我的钱包</TableHead>
              <TableHead>最新操作</TableHead>
              <TableHead>跟随模式</TableHead>
              <TableHead>生效时间 (UTC+8)</TableHead>
              <TableHead>止盈止损任务</TableHead>
              <TableHead>跟随买入/卖出数量</TableHead>
              <TableHead>ROI</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {strategies.map((strategy) => (
              <TableRow key={strategy.id}>
                <TableCell>
                  <Switch checked={strategy.enabled} />
                </TableCell>
                <TableCell className="font-medium">{strategy.name}</TableCell>
                <TableCell>{strategy.wallets}</TableCell>
                <TableCell>{strategy.account}</TableCell>
                <TableCell>
                  <div className={strategy.lastOperation.includes("止盈") ? "text-red-500 flex flex-col" : "text-green-500 flex flex-col"}>
                    <span className="whitespace-nowrap">{strategy.lastOperation.split(" ")[0]} {strategy.lastOperation.split(" ")[1]}</span>
                    <span>{strategy.lastOperation.split(" ")[2]}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1.5">
                    {strategy.mode.buy && (
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-900/30 text-green-500 border border-green-800/30 min-w-16 text-center">
                        跟随买入
                      </span>
                    )}
                    {strategy.mode.sell === true && (
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-red-900/30 text-red-500 border border-red-800/30 min-w-16 text-center">
                        跟随卖出
                      </span>
                    )}
                    {typeof strategy.mode.sell === 'object' && strategy.mode.sell.mixed && (
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-orange-900/30 text-orange-500 border border-orange-800/30 min-w-16 text-center">
                        混合卖出
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{strategy.validity}</TableCell>
                <TableCell>{strategy.stopTime}</TableCell>
                <TableCell>{strategy.transactions}</TableCell>
                <TableCell className={strategy.roi.startsWith('+') ? 'text-green-500 font-medium' : strategy.roi.startsWith('-') ? 'text-red-500 font-medium' : ''}>
                  {strategy.roi}
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/simulator/strategy/${strategy.id}`}>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                      <span className="sr-only">设置</span>
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">更多选项</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end p-2 border-t">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="h-7 px-3" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm">
            第 <span className="font-medium">1</span> 页，共 <span className="font-medium">1</span> 页
          </div>
          <Button variant="outline" size="sm" className="h-7 px-3" disabled>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
