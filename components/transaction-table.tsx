"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink, Share2, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock transaction data
const transactions = [
  {
    id: 1,
    time: "03/19/2025 23:20",
    chain: "Bsc",
    source: "跟单止盈",
    type: "卖",
    usd: "$2430.04",
    sent: "77.81M Anime5",
    received: "3.99 WBNB",
    tax: "0 Anime5 0%",
    price: "$0.000031",
    balance: "0 Anime5",
    profit: "$650.42",
    roi: "+36.5%",
    fee: "$48.60 2%",
  },
  {
    id: 2,
    time: "03/19/2025 23:11",
    chain: "Bsc",
    source: "跟单交易",
    type: "买",
    usd: "$122.04",
    sent: "0.2 WBNB",
    received: "5.32M POCHITA",
    tax: "0 POCHITA 0%",
    price: "$0.000023",
    balance: "5.32M POCHITA",
    profit: "-",
    roi: "-",
    fee: "$2.44 2%",
  },
  {
    id: 3,
    time: "03/19/2025 23:10",
    chain: "Bsc",
    source: "跟单交易",
    type: "买",
    usd: "$120.87",
    sent: "0.19802 WBNB",
    received: "20.19M CZ",
    tax: "0 CZ 0%",
    price: "$0.000006",
    balance: "20.19M CZ",
    profit: "-",
    roi: "-",
    fee: "$2.42 2%",
  },
  {
    id: 4,
    time: "03/19/2025 23:09",
    chain: "Bsc",
    source: "跟单止盈",
    type: "卖",
    usd: "$2490.75",
    sent: "58.37M Habibi",
    received: "4.08 WBNB",
    tax: "0 Habibi 0%",
    price: "$0.000043",
    balance: "0 Habibi",
    profit: "$1281.83",
    roi: "+106.5%",
    fee: "$49.81 2%",
  },
  {
    id: 5,
    time: "03/19/2025 23:08",
    chain: "Bsc",
    source: "跟单交易",
    type: "买",
    usd: "$604.85",
    sent: "0.990099 WBNB",
    received: "29.18M Habibi",
    tax: "0 Habibi 0%",
    price: "$0.000021",
    balance: "58.37M Habibi",
    profit: "-",
    roi: "-",
    fee: "$12.10 2%",
  },
  {
    id: 6,
    time: "03/19/2025 23:08",
    chain: "Bsc",
    source: "跟单交易",
    type: "买",
    usd: "$604.85",
    sent: "0.990099 WBNB",
    received: "29.18M Habibi",
    tax: "0 Habibi 0%",
    price: "$0.000021",
    balance: "29.18M Habibi",
    profit: "-",
    roi: "-",
    fee: "$12.10 2%",
  },
  {
    id: 7,
    time: "03/19/2025 23:07",
    chain: "Bsc",
    source: "跟单交易",
    type: "买",
    usd: "$183.27",
    sent: "0.3 WBNB",
    received: "16.56M KVN",
    tax: "0 KVN 0%",
    price: "$0.000011",
    balance: "40.53M KVN",
    profit: "-",
    roi: "-",
    fee: "$3.67 2%",
  },
  {
    id: 8,
    time: "03/19/2025 23:06",
    chain: "Bsc",
    source: "跟单交易",
    type: "买",
    usd: "$305.45",
    sent: "0.5 WBNB",
    received: "5.90M AIRBNB",
    tax: "0 AIRBNB 0%",
    price: "$0.000052",
    balance: "5.90M AIRBNB",
    profit: "-",
    roi: "-",
    fee: "$6.11 2%",
  },
]

export function TransactionTable() {
  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[100px]">时间</TableHead>
              <TableHead>链</TableHead>
              <TableHead>来源</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>USD</TableHead>
              <TableHead>发送</TableHead>
              <TableHead>获得</TableHead>
              <TableHead>税</TableHead>
              <TableHead>价格</TableHead>
              <TableHead>余额</TableHead>
              <TableHead>利润</TableHead>
              <TableHead>ROI</TableHead>
              <TableHead>交易费用</TableHead>
              <TableHead className="text-right">链接</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-mono text-xs">{tx.time}</TableCell>
                <TableCell>{tx.chain}</TableCell>
                <TableCell>
                  <span className={tx.source.includes("止盈") ? "text-red-500" : "text-green-500"}>{tx.source}</span>
                </TableCell>
                <TableCell>
                  <Badge variant={tx.type === "买" ? "success" : "destructive"}>{tx.type}</Badge>
                </TableCell>
                <TableCell>{tx.usd}</TableCell>
                <TableCell>{tx.sent}</TableCell>
                <TableCell>{tx.received}</TableCell>
                <TableCell>{tx.tax}</TableCell>
                <TableCell>{tx.price}</TableCell>
                <TableCell>{tx.balance}</TableCell>
                <TableCell className={tx.profit !== "-" ? "text-green-500 font-medium" : ""}>{tx.profit}</TableCell>
                <TableCell className={tx.roi !== "-" ? "text-green-500 font-medium" : ""}>{tx.roi}</TableCell>
                <TableCell>{tx.fee}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Share2 className="h-3.5 w-3.5" />
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
          <Button variant="outline" size="sm" className="h-7 px-3">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm">
            第 <span className="font-medium">1</span> 页，共 <span className="font-medium">10</span> 页
          </div>
          <Button variant="outline" size="sm" className="h-7 px-3">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
