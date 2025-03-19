import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpCircle, ArrowDownCircle, Clock, BarChart, PieChart } from "lucide-react"

interface Trade {
  date: string
  result: "win" | "loss"
  profit: number
}

interface KOL {
  id: number
  name: string
  avatar: string
  winRate: number
  tradeFrequency: string
  holdingTime: string
  allocation: number
  recentTrades: Trade[]
}

export function KOLCard({ kol }: { kol: KOL }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={kol.avatar} alt={kol.name} />
          <AvatarFallback>{kol.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{kol.name}</CardTitle>
          <CardDescription>
            <Badge variant={kol.winRate >= 65 ? "default" : "secondary"} className="mt-1">
              胜率: {kol.winRate}%
            </Badge>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <BarChart className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">交易频率: {kol.tradeFrequency}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">持仓时间: {kol.holdingTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <PieChart className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">资金分配: {kol.allocation}%</span>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">最近交易</h4>
          <div className="space-y-2">
            {kol.recentTrades.slice(0, 3).map((trade, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {trade.result === "win" ? (
                    <ArrowUpCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span>{trade.date}</span>
                </div>
                <span className={trade.profit > 0 ? "text-green-500" : "text-red-500"}>
                  {trade.profit > 0 ? "+" : ""}
                  {trade.profit}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          查看详情
        </Button>
        <Button size="sm">跟单</Button>
      </CardFooter>
    </Card>
  )
}

