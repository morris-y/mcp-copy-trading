"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"

// Mock detailed transaction data
const detailedTransactions = [
  {
    id: 1,
    time: "03/19/2025 23:11",
    name: "-",
    chain: "Bsc",
    type: "跟随买入",
    address: "0xB94E...fE93",
    wallet: "模拟器账户",
    sent: "0.2 WBNB",
    received: "5.32M POCHITA",
    tax: "0 POCHITA 0%",
    fee: "$ 2.44 2%",
    targetAddress: "0x8de9...5B06",
    targetSent: "0.2 WBNB",
    targetReceived: "5.32M POCHITA",
  },
  {
    id: 2,
    time: "03/19/2025 23:10",
    name: "-",
    chain: "Bsc",
    type: "跟随买入",
    address: "0x166b...42D5",
    wallet: "模拟器账户",
    sent: "0.19802 WBNB",
    received: "20.19M CZ",
    tax: "0 CZ 0%",
    fee: "$ 2.42 2%",
    targetAddress: "0x0212...4300",
    targetSent: "0.19802 WBNB",
    targetReceived: "20.19M CZ",
  },
  {
    id: 3,
    time: "03/19/2025 23:08",
    name: "-",
    chain: "Bsc",
    type: "跟随买入",
    address: "0xd97E...79Ec",
    wallet: "模拟器账户",
    sent: "0.990099 WBNB",
    received: "29.18M Habibi",
    tax: "0 Habibi 0%",
    fee: "$ 12.10 2%",
    targetAddress: "0x2e87...E514",
    targetSent: "0.990099 WBNB",
    targetReceived: "29.18M Habibi",
  },
  {
    id: 4,
    time: "03/19/2025 23:08",
    name: "-",
    chain: "Bsc",
    type: "跟随买入",
    address: "0xd97E...79Ec",
    wallet: "模拟器账户",
    sent: "0.990099 WBNB",
    received: "29.18M Habibi",
    tax: "0 Habibi 0%",
    fee: "$ 12.10 2%",
    targetAddress: "0x2e87...E514",
    targetSent: "0.990099 WBNB",
    targetReceived: "29.18M Habibi",
  },
]

export function DetailedTransactionTable() {
  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[100px]">时间</TableHead>
              <TableHead>名称</TableHead>
              <TableHead>链</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>代币</TableHead>
              <TableHead colSpan={3} className="text-center border-l">
                你的交易
              </TableHead>
              <TableHead colSpan={3} className="text-center border-l">
                跟随的交易
              </TableHead>
              <TableHead className="text-right">链接</TableHead>
            </TableRow>
            <TableRow className="bg-muted/30">
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead className="border-l">钱包</TableHead>
              <TableHead>发送</TableHead>
              <TableHead>获得</TableHead>
              <TableHead className="border-l">钱包</TableHead>
              <TableHead>发送</TableHead>
              <TableHead>获得</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {detailedTransactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-mono text-xs">{tx.time}</TableCell>
                <TableCell>{tx.name}</TableCell>
                <TableCell>{tx.chain}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium bg-green-900/30 text-green-500">
                    {tx.type}
                  </span>
                </TableCell>
                <TableCell className="font-mono text-xs">{tx.address}</TableCell>
                <TableCell className="border-l">{tx.wallet}</TableCell>
                <TableCell>{tx.sent}</TableCell>
                <TableCell>{tx.received}</TableCell>
                <TableCell className="border-l font-mono text-xs">{tx.targetAddress}</TableCell>
                <TableCell>{tx.targetSent}</TableCell>
                <TableCell>{tx.targetReceived}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
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
