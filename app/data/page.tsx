"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, AlertTriangle, BarChart4 } from "lucide-react"

export default function DataPage() {
  const [timeframe, setTimeframe] = useState("1d")

  // Sample market data
  const marketData = {
    btcPrice: 36789.42,
    btcChange: 2.34,
    ethPrice: 1987.65,
    ethChange: -1.23,
    marketSentiment: "bullish",
    volatilityIndex: 28.5,
    tradingVolume: "127.8B",
    alerts: [
      { id: 1, message: "BTC突破阻力位36500", level: "info", time: "10:32" },
      { id: 2, message: "ETH跌破支撑位2000", level: "warning", time: "11:15" },
      { id: 3, message: "市场波动性增加", level: "alert", time: "12:05" },
    ],
  }

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6" data-component-name="DataPage">宏观数据</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1小时</SelectItem>
              <SelectItem value="4h">4小时</SelectItem>
              <SelectItem value="1d">1天</SelectItem>
              <SelectItem value="1w">1周</SelectItem>
              <SelectItem value="1m">1月</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">刷新数据</Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">最后更新: 2023-12-10 14:35</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between">
              <span>BTC/USDT</span>
              <span className={marketData.btcChange > 0 ? "text-green-500" : "text-red-500"}>
                {marketData.btcChange > 0 ? "+" : ""}
                {marketData.btcChange}%
              </span>
            </CardTitle>
            <CardDescription>比特币价格</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">${marketData.btcPrice.toLocaleString()}</div>
              {marketData.btcChange > 0 ? (
                <ArrowUp className="ml-2 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="ml-2 h-4 w-4 text-red-500" />
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between">
              <span>ETH/USDT</span>
              <span className={marketData.ethChange > 0 ? "text-green-500" : "text-red-500"}>
                {marketData.ethChange > 0 ? "+" : ""}
                {marketData.ethChange}%
              </span>
            </CardTitle>
            <CardDescription>以太坊价格</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">${marketData.ethPrice.toLocaleString()}</div>
              {marketData.ethChange > 0 ? (
                <ArrowUp className="ml-2 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="ml-2 h-4 w-4 text-red-500" />
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>市场情绪</CardTitle>
            <CardDescription>当前市场情绪指标</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold capitalize">
                {marketData.marketSentiment === "bullish" ? "看涨" : "看跌"}
              </div>
              {marketData.marketSentiment === "bullish" ? (
                <TrendingUp className="ml-2 h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="ml-2 h-4 w-4 text-red-500" />
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>波动性指数</CardTitle>
            <CardDescription>市场波动性指标</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">{marketData.volatilityIndex}</div>
              <AlertTriangle className="ml-2 h-4 w-4 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>价格图表</CardTitle>
            <CardDescription>
              BTC/USDT{" "}
              {timeframe === "1d" ? "日线" : timeframe === "1h" ? "小时线" : timeframe === "1w" ? "周线" : "月线"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-muted/30 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">价格图表将在这里显示</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>市场提醒</CardTitle>
            <CardDescription>最新市场动态提醒</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketData.alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-2 pb-3 border-b last:border-0">
                  {alert.level === "info" && <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />}
                  {alert.level === "warning" && <TrendingDown className="h-5 w-5 text-red-500 mt-0.5" />}
                  {alert.level === "alert" && <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />}
                  <div>
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>手动数据输入</CardTitle>
          <CardDescription>添加自定义市场数据</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="text-sm font-medium mb-1 block">交易对</label>
              <Select defaultValue="btc">
                <SelectTrigger>
                  <SelectValue placeholder="选择交易对" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="btc">BTC/USDT</SelectItem>
                  <SelectItem value="eth">ETH/USDT</SelectItem>
                  <SelectItem value="sol">SOL/USDT</SelectItem>
                  <SelectItem value="bnb">BNB/USDT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">价格</label>
              <Input type="number" placeholder="输入价格" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">变化百分比</label>
              <Input type="number" placeholder="输入变化百分比" />
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <BarChart4 className="mr-2 h-4 w-4" />
                添加数据
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
