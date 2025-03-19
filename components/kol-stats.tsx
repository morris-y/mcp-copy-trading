"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import { BarChart, LineChart, PieChart, ArrowUpDown, Activity } from "lucide-react"
import { Progress } from "@/components/ui/progress"

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

export function KOLStats({ kol }: { kol: KOL | null }) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  
  if (!kol) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>KOL统计分析</CardTitle>
          <CardDescription>请选择一个KOL查看详细数据</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center text-muted-foreground">
            选择一个KOL以查看其详细的交易统计数据
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
            <img src={kol.avatar} alt={kol.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <CardTitle>{kol.name}的统计分析</CardTitle>
            <CardDescription>查看该KOL的表现数据和趋势</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="winrate">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="winrate" className="flex items-center gap-1">
              <BarChart className="h-4 w-4" />
              胜率分析
            </TabsTrigger>
            <TabsTrigger value="frequency" className="flex items-center gap-1">
              <LineChart className="h-4 w-4" />
              交易频率
            </TabsTrigger>
            <TabsTrigger value="allocation" className="flex items-center gap-1">
              <PieChart className="h-4 w-4" />
              资金分配
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="winrate" className="mt-4">
            <div className="space-y-4">
              {/* 胜率分析卡片，基于图片1和图片2 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border">
                  <div className="text-sm text-muted-foreground mb-1">7D 已实现利润</div>
                  <div className="flex items-baseline">
                    <div className="text-4xl font-bold text-green-500">+{(kol.winRate * 1.15).toFixed(2)}%</div>
                    <div className="text-lg text-green-500 ml-1">+${(kol.winRate * 5000).toFixed(1)}K</div>
                  </div>
                  <div className="flex flex-col mt-3 space-y-1 text-sm">
                    <div>总盈亏: ${(kol.winRate * 7500).toFixed(1)}K</div>
                    <div>未实现利润: ${(kol.winRate * 1200).toFixed(1)}K</div>
                  </div>
                </div>
                
                <div className="bg-card p-4 rounded-lg border">
                  <div className="text-sm text-muted-foreground mb-1">胜率</div>
                  <div className="flex items-baseline">
                    <div className="text-4xl font-bold">{kol.winRate.toFixed(2)}%</div>
                  </div>
                  <div className="flex items-center text-green-500 mt-1">
                    <span>+${(kol.winRate * 6000).toFixed(1)}K (+{(kol.winRate * 0.5).toFixed(1)}%)</span>
                  </div>
                  <div className="text-sm mt-3">
                    <div className="flex justify-between">
                      <span>未实现利润</span>
                      <span>${(kol.winRate * 350).toFixed(1)}K</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 交易分析卡片，基于图片3 */}
              <div className="bg-card p-4 rounded-lg border">
                <div className="text-lg font-semibold mb-3">分析</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">余额</span>
                    <span>{(3 + kol.winRate / 10).toFixed(2)} BNB (${(3 + kol.winRate / 10) * 650})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">7D 交易数</span>
                    <div>
                      <span className="text-green-500">{Math.floor(kol.winRate)}</span>
                      <span className="text-muted-foreground">/</span>
                      <span className="text-red-500">{Math.floor(100 - kol.winRate)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">7D 买入总成本</span>
                    <span>${(kol.winRate * 20000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">7D 代币平均买入成本</span>
                    <span>${(kol.winRate * 500).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">7D 代币平均实现利润</span>
                    <span className="text-green-500">+${(kol.winRate * 125).toFixed(0)}</span>
                  </div>
                </div>
              </div>
              
              {/* 钓鱼检测，基于图片4 */}
              <div className="bg-card p-4 rounded-lg border">
                <div className="flex items-center mb-3">
                  <Activity className="h-4 w-4 mr-2" />
                  <span className="text-lg font-semibold">钓鱼检测</span>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">黑名单: 0 (0%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">卖出量大于买入量: 0 (0%)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm">未购买: {Math.floor(100 - kol.winRate)} ({(100 - kol.winRate).toFixed(2)}%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">十秒内完成买/卖: 0 (0%)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 7日收益曲线图表 */}
              <div className="h-[200px] w-full bg-card rounded-lg border p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">7日收益曲线</span>
                </div>
                <div className="h-[150px] flex items-end justify-end space-x-1">
                  {/* 使用KOL的最近交易数据生成曲线图 */}
                  {kol.recentTrades.map((trade, idx) => (
                    <div key={idx} className="w-8 relative">
                      <div 
                        className={`w-full rounded-t-sm ${trade.result === 'win' ? 'bg-primary' : 'bg-muted'}`} 
                        style={{ height: `${Math.abs(trade.profit) * 4}px` }}
                      ></div>
                      <div className="text-xs mt-1 text-center">{`D-${kol.recentTrades.length-1-idx}`}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="frequency" className="mt-4">
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border">
                <div className="text-lg font-semibold mb-3">交易频率</div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">每日平均交易次数</div>
                    <div className="text-3xl font-bold">{(kol.winRate / 5).toFixed(1)}</div>
                    <div className="mt-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">最近7天交易活跃度</span>
                        <span className="text-sm">{kol.winRate}%</span>
                      </div>
                      <Progress value={kol.winRate} />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">平均持仓时间</div>
                    <div className="text-3xl font-bold">{kol.holdingTime}</div>
                    <div className="mt-4">
                      <div className="text-sm text-muted-foreground">常用交易时间:</div>
                      <div className="text-sm">09:30 - 11:30, 13:30 - 15:00</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="h-[300px] bg-card rounded-lg border p-4">
                <div className="text-lg font-semibold mb-3">近期交易频率趋势</div>
                <div className="h-[250px] flex items-end justify-center space-x-2">
                  {/* 使用KOL的特定数据生成交易频率图 */}
                  {[
                    kol.winRate * 0.4, 
                    kol.winRate * 0.6, 
                    kol.winRate * 0.8, 
                    kol.winRate * 0.5, 
                    kol.winRate * 0.7, 
                    kol.winRate * 0.9, 
                    kol.winRate * 0.65
                  ].map((height, idx) => (
                    <div key={idx} className="w-10 relative">
                      <div 
                        className="bg-primary rounded-t-sm" 
                        style={{ height: `${height * 2}px` }}
                      ></div>
                      <div className="text-xs mt-1 text-center">{`D-${6-idx}`}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="allocation" className="mt-4">
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border">
                <div className="text-lg font-semibold mb-3">资金分配</div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">总资金分配</div>
                    <div className="text-3xl font-bold">{kol.allocation}%</div>
                    <div className="mt-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">资金使用率</span>
                        <span className="text-sm">{kol.allocation}%</span>
                      </div>
                      <Progress value={kol.allocation} />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">KOL分布</div>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>头部KOL (前5名)</span>
                        <span>{Math.max(30, Math.min(70, kol.winRate))}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>中部KOL (6-15名)</span>
                        <span>{Math.max(20, Math.min(40, 100 - kol.winRate))}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>其他KOL</span>
                        <span>{Math.max(5, Math.min(25, 100 - kol.allocation))}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card p-4 rounded-lg border">
                <div className="text-lg font-semibold mb-3">币种分布</div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="inline-block w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      {Math.floor(45 + (kol.winRate - 50) * 0.2)}%
                    </div>
                    <div className="mt-2 text-sm">BTC</div>
                  </div>
                  <div className="text-center">
                    <div className="inline-block w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                      {Math.floor(30 + (kol.winRate - 50) * 0.1)}%
                    </div>
                    <div className="mt-2 text-sm">ETH</div>
                  </div>
                  <div className="text-center">
                    <div className="inline-block w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                      {Math.floor(25 - (kol.winRate - 50) * 0.3)}%
                    </div>
                    <div className="mt-2 text-sm">其他</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
