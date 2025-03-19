"use client";

import { KOLStats } from "@/components/kol-stats"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button";
import { Users, ArrowUpDown, Plus, Check, ChevronRight, BookmarkPlus, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link";

// 定义KOL类型接口
interface KOL {
  id: number;
  name: string;
  avatar: string;
  balance: string;
  followers: number;
  profit: string;
  profitPercentage: string;
  interactions: number;
  lastActive: string;
  walletAddress?: string;
}

// 硬编码的钱包地址
const walletAddressList = [
  "0x7e8fb0392542812476d9f2d0d71c01d1fa0776c5",
  "0x2e87ac5b1af0d5c418365df3f2cf91240964e514",
  "0x28816c4c4792467390c90e5b426f198570e29307",
  "0x1f5ffa4c6f70666a48b9f7c4c09c8ab4e86f29ec",
  "0x0bdde6377f27ece8b772771bbfd9a7f5cf663a0f",
  "0x58870c4a29d7d270bd0421c5861f4229de77b673",
  "0x146af161a4a8fab6a4d4553683ce6aac9562729f"
];

// KOL表格数据
const kolTableData: KOL[] = [
  { 
    id: 1, 
    name: "KH1000pips", 
    avatar: "/placeholder.svg?height=40&width=40",
    balance: "$90.1K",
    followers: 99.1,
    profit: "+$78.7K",
    profitPercentage: "+87.3%",
    interactions: 339,
    lastActive: "11m"
  },
  { 
    id: 2, 
    name: "EMBpalu", 
    avatar: "/placeholder.svg?height=40&width=40",
    balance: "$29.5K",
    followers: 2.2,
    profit: "+$28.1K",
    profitPercentage: "+61.6%",
    interactions: 80,
    lastActive: "27m"
  },
  { 
    id: 3, 
    name: "crypto", 
    avatar: "/placeholder.svg?height=40&width=40",
    balance: "$263.1K",
    followers: 15.4,
    profit: "+$502.4K",
    profitPercentage: "+32.3%",
    interactions: 410,
    lastActive: "35m"
  },
  { 
    id: 4, 
    name: "0x188...342", 
    avatar: "/placeholder.svg?height=40&width=40",
    balance: "$288K",
    followers: 20.3,
    profit: "+$418.6K",
    profitPercentage: "+16.3%",
    interactions: 27,
    lastActive: "45m"
  },
  { 
    id: 5, 
    name: "kbitbx", 
    avatar: "/placeholder.svg?height=40&width=40",
    balance: "$31.2K",
    followers: 42.3,
    profit: "+$47.9K",
    profitPercentage: "+13.4%",
    interactions: 292,
    lastActive: "44m"
  },
  { 
    id: 6, 
    name: "BBfimuharak", 
    avatar: "/placeholder.svg?height=40&width=40",
    balance: "$1.7K",
    followers: 2.1,
    profit: "+$99.5K",
    profitPercentage: "+12.1%",
    interactions: 335,
    lastActive: "1h"
  },
  { 
    id: 7, 
    name: "box96...61", 
    avatar: "/placeholder.svg?height=40&width=40",
    balance: "$90.4K",
    followers: 0.678,
    profit: "+$268.8K",
    profitPercentage: "+8.5%",
    interactions: 159,
    lastActive: "1h"
  }
];

// 统计数据KOL接口，保留与KOLStats组件兼容性
interface StatsKOL {
  id: number;
  name: string;
  winRate: number;
  avatar: string;
  tradeFrequency: string;
  holdingTime: string;
  allocation: number;
  recentTrades: { date: string; result: "win" | "loss"; profit: number }[];
}

// 将表格数据转换为统计组件所需格式
const statsKolData: StatsKOL[] = kolTableData.map((kol, index) => {
  // 使用确定性数据而非随机值，避免hydration错误
  const winRates = [68, 72, 65, 58, 63, 70, 61];
  const tradeFrequencies = ["高", "中", "低", "高", "中", "高", "低"];
  const holdingTimes = ["2.5天", "4.8天", "0.8天", "12.5天", "3.2天", "1.5天", "7.6天"];
  const allocations = [25, 30, 20, 25, 15, 35, 18];
  const trades = [
    [
      { date: "2023-11-01", result: "win" as "win" | "loss", profit: 5.2 },
      { date: "2023-11-03", result: "loss" as "win" | "loss", profit: -2.1 },
      { date: "2023-11-05", result: "win" as "win" | "loss", profit: 3.7 }
    ],
    [
      { date: "2023-11-02", result: "win" as "win" | "loss", profit: 6.3 },
      { date: "2023-11-07", result: "win" as "win" | "loss", profit: 4.2 },
      { date: "2023-11-12", result: "win" as "win" | "loss", profit: 5.1 }
    ],
    [
      { date: "2023-11-01", result: "win" as "win" | "loss", profit: 1.2 },
      { date: "2023-11-01", result: "loss" as "win" | "loss", profit: -0.8 },
      { date: "2023-11-02", result: "win" as "win" | "loss", profit: 1.5 }
    ],
    [
      { date: "2023-10-15", result: "win" as "win" | "loss", profit: 8.7 },
      { date: "2023-10-28", result: "loss" as "win" | "loss", profit: -4.3 },
      { date: "2023-11-10", result: "win" as "win" | "loss", profit: 9.2 }
    ],
    [
      { date: "2023-11-05", result: "win" as "win" | "loss", profit: 3.8 },
      { date: "2023-11-10", result: "loss" as "win" | "loss", profit: -1.5 },
      { date: "2023-11-15", result: "win" as "win" | "loss", profit: 4.6 }
    ],
    [
      { date: "2023-11-08", result: "win" as "win" | "loss", profit: 2.3 },
      { date: "2023-11-12", result: "win" as "win" | "loss", profit: 3.1 },
      { date: "2023-11-18", result: "loss" as "win" | "loss", profit: -1.2 }
    ],
    [
      { date: "2023-11-03", result: "loss" as "win" | "loss", profit: -2.5 },
      { date: "2023-11-09", result: "win" as "win" | "loss", profit: 6.7 },
      { date: "2023-11-15", result: "win" as "win" | "loss", profit: 4.3 }
    ]
  ];
  
  const idx = index % winRates.length;
  
  return {
    id: kol.id,
    name: kol.name,
    winRate: winRates[idx],
    avatar: kol.avatar,
    tradeFrequency: tradeFrequencies[idx],
    holdingTime: holdingTimes[idx],
    allocation: allocations[idx],
    recentTrades: trades[idx]
  };
});

export default function KOLPage() {
  const [kols, setKols] = useState<KOL[]>(kolTableData);
  const [selectedKOL, setSelectedKOL] = useState<KOL | null>(null);
  const [selectedKOLs, setSelectedKOLs] = useState<number[]>([]);
  const [watchlistKOLs, setWatchlistKOLs] = useState<number[]>([]);
  const [statsData, setStatsData] = useState<StatsKOL | null>(null);

  useEffect(() => {
    // 添加钱包地址到KOL数据
    const updatedKols = kolTableData.map((kol, index) => {
      if (index < walletAddressList.length) {
        return {
          ...kol,
          walletAddress: walletAddressList[index]
        };
      }
      return kol;
    });
    setKols(updatedKols);
    
    // 保存完整KOL数据到localStorage，包括钱包地址
    localStorage.setItem('kolData', JSON.stringify(updatedKols));
    
    // 从本地存储加载关注列表
    const savedWatchlist = localStorage.getItem('kolWatchlist');
    if (savedWatchlist) {
      try {
        setWatchlistKOLs(JSON.parse(savedWatchlist));
      } catch (e) {
        console.error('Failed to parse watchlist:', e);
      }
    }
  }, []);

  // 保存关注列表到本地存储
  useEffect(() => {
    localStorage.setItem('kolWatchlist', JSON.stringify(watchlistKOLs));
  }, [watchlistKOLs]);

  // 当选择KOL时，更新统计数据
  useEffect(() => {
    if (selectedKOL) {
      // 根据selectedKOL查找统计数据
      const kolStats = statsKolData.find(k => k.id === selectedKOL.id);
      if (kolStats) {
        setStatsData(kolStats);
      }
    }
  }, [selectedKOL]);

  // 选择或取消选择KOL
  const toggleSelectKOL = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // 防止点击事件传播到行
    
    if (selectedKOLs.includes(id)) {
      setSelectedKOLs(selectedKOLs.filter(kolId => kolId !== id));
    } else {
      setSelectedKOLs([...selectedKOLs, id]);
    }
  };

  // 处理KOL行点击
  const handleRowClick = (kol: KOL) => {
    setSelectedKOL(kol);
  };

  // 添加选中的KOL到关注列表
  const addToWatchlist = () => {
    const newWatchlist = [...new Set([...watchlistKOLs, ...selectedKOLs])];
    setWatchlistKOLs(newWatchlist);
    setSelectedKOLs([]);
  };

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">KOL管理</h1>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center" data-component-name="KOLManagementPage">
            <div className="w-3 h-3 bg-[#00FF9D] rounded-full animate-pulse mr-2"></div>
            <span className="text-[#00FF9D]">实时连接</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">全部KOL</TabsTrigger>
          <TabsTrigger value="active">活跃KOL</TabsTrigger>
          <TabsTrigger value="watchlist">关注列表</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>总KOL数量</CardTitle>
                <CardDescription>平台跟踪的KOL总数</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{kols.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>平均胜率</CardTitle>
                <CardDescription>所有KOL的平均胜率</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">65.8%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>平均持仓时间</CardTitle>
                <CardDescription>所有KOL的平均持仓时间</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3.2天</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>资金分配</CardTitle>
                <CardDescription>已分配资金百分比</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">85%</div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">KOL列表</h2>
              <div className="flex gap-2">
                {selectedKOLs.length > 0 && (
                  <>
                    <Button 
                      className="bg-gray-800 text-white font-medium hover:scale-102 transition-transform border border-gray-700"
                      onClick={addToWatchlist}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      关注列表
                    </Button>
                    <Link href={`/simulator/strategy/new?kols=${selectedKOLs.join(',')}&walletAddresses=${selectedKOLs.map(id => kols.find(kol => kol.id === id)?.walletAddress).join(',')}`}>
                      <Button className="bg-[#00FF9D] text-black font-medium hover:scale-102 transition-transform">
                        <Plus className="h-4 w-4 mr-2" />
                        新建跟单任务
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 px-2 w-10 font-medium"></th>
                    <th className="py-3 px-4 font-medium">
                      <div className="flex items-center gap-1">
                        交易员
                        <button className="ml-1 p-0.5 rounded hover:bg-gray-800 transition-colors">
                          <ArrowUpDown className="h-3 w-3 text-gray-400" />
                        </button>
                      </div>
                    </th>
                    <th className="py-3 px-4 font-medium">
                      <div className="flex items-center gap-1">
                        余额
                        <button className="ml-1 p-0.5 rounded hover:bg-gray-800 transition-colors">
                          <ArrowUpDown className="h-3 w-3 text-gray-400" />
                        </button>
                      </div>
                    </th>
                    <th className="py-3 px-4 font-medium">
                      <div className="flex items-center gap-1">
                        盈利
                        <button className="ml-1 p-0.5 rounded hover:bg-gray-800 transition-colors">
                          <ArrowUpDown className="h-3 w-3 text-gray-400" />
                        </button>
                      </div>
                    </th>
                    <th className="py-3 px-4 font-medium">
                      <div className="flex items-center gap-1">
                        30D交易数
                        <button className="ml-1 p-0.5 rounded hover:bg-gray-800 transition-colors">
                          <ArrowUpDown className="h-3 w-3 text-gray-400" />
                        </button>
                      </div>
                    </th>
                    <th className="py-3 px-4 font-medium">
                      <div className="flex items-center gap-1">
                        最近活动
                        <button className="ml-1 p-0.5 rounded hover:bg-gray-800 transition-colors">
                          <ArrowUpDown className="h-3 w-3 text-gray-400" />
                        </button>
                      </div>
                    </th>
                    <th className="py-3 px-4 font-medium">全部交易</th>
                  </tr>
                </thead>
                <tbody>
                  {kols.map((kol) => (
                    <tr 
                      key={kol.id} 
                      className={`border-b border-gray-800 hover:bg-gray-900 cursor-pointer transition-colors ${selectedKOL?.id === kol.id ? 'bg-gray-900' : ''}`}
                      onClick={() => handleRowClick(kol)}
                    >
                      <td className="py-4 px-2 w-10">
                        <div 
                          className={`w-5 h-5 rounded border ${selectedKOLs.includes(kol.id) ? 'bg-[#00FF9D] border-[#00FF9D]' : 'border-gray-600'} flex items-center justify-center`}
                          onClick={(e) => toggleSelectKOL(e, kol.id)}
                        >
                          {selectedKOLs.includes(kol.id) && <Check className="h-3 w-3 text-black" />}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700">
                            <img src={kol.avatar} alt={kol.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="font-medium">{kol.name}</div>
                            <div className="text-xs text-gray-400 truncate max-w-[150px]">
                              {kol.walletAddress ? `${kol.walletAddress.substring(0, 6)}...${kol.walletAddress.substring(kol.walletAddress.length - 4)}` : "0x..."}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium">{kol.balance}</td>
                      <td className="py-4 px-4">
                        <div className="text-green-500 font-medium">{kol.profit}</div>
                        <div className="text-xs text-green-400">{kol.profitPercentage}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <span>{kol.interactions}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-400">{kol.lastActive}</td>
                      <td className="py-4 px-4">
                        <Link href={`/twitter?kol=${kol.id}`}>
                          <button className="p-2 rounded-full bg-[#222] hover:bg-[#333] transition-colors">
                            <ExternalLink className="h-4 w-4 text-[#00FF9D]" />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8" id="KOLPage">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">KOL统计数据</h2>
            </div>
            {selectedKOL ? (
              <KOLStats kol={statsData} />
            ) : (
              <div className="p-6 text-center text-muted-foreground border rounded-lg">
                请选择一个KOL查看详细统计数据
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="active">
          <div className="p-4 text-center text-muted-foreground">活跃KOL列表将在这里显示</div>
        </TabsContent>
        <TabsContent value="watchlist">
          {watchlistKOLs.length > 0 ? (
            <div className="mt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-3 px-2 w-10 font-medium"></th>
                      <th className="py-3 px-4 font-medium">
                        <div className="flex items-center gap-1">
                          交易员
                          <button className="ml-1 p-0.5 rounded hover:bg-gray-800 transition-colors">
                            <ArrowUpDown className="h-3 w-3 text-gray-400" />
                          </button>
                        </div>
                      </th>
                      <th className="py-3 px-4 font-medium">
                        <div className="flex items-center gap-1">
                          余额
                          <button className="ml-1 p-0.5 rounded hover:bg-gray-800 transition-colors">
                            <ArrowUpDown className="h-3 w-3 text-gray-400" />
                          </button>
                        </div>
                      </th>
                      <th className="py-3 px-4 font-medium">
                        <div className="flex items-center gap-1">
                          盈利
                          <button className="ml-1 p-0.5 rounded hover:bg-gray-800 transition-colors">
                            <ArrowUpDown className="h-3 w-3 text-gray-400" />
                          </button>
                        </div>
                      </th>
                      <th className="py-3 px-4 font-medium">互动量</th>
                      <th className="py-3 px-4 font-medium">最后活跃</th>
                      <th className="py-3 px-4 font-medium">全部交易</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kols.filter(kol => watchlistKOLs.includes(kol.id)).map((kol) => (
                      <tr 
                        key={kol.id} 
                        className={`border-b border-gray-800 hover:bg-gray-900 cursor-pointer transition-colors ${selectedKOL?.id === kol.id ? 'bg-gray-950' : ''}`}
                        onClick={() => handleRowClick(kol)}
                      >
                        <td className="py-4 pl-2">
                          <div 
                            className={`w-5 h-5 rounded border ${selectedKOLs.includes(kol.id) ? 'bg-[#00FF9D] border-[#00FF9D]' : 'border-gray-600'} flex items-center justify-center`}
                            onClick={(e) => toggleSelectKOL(e, kol.id)}
                          >
                            {selectedKOLs.includes(kol.id) && <Check className="h-3 w-3 text-black" />}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700">
                              <img src={kol.avatar} alt={kol.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-medium">{kol.name}</div>
                              <div className="text-xs text-gray-400 truncate max-w-[150px]">
                                {kol.walletAddress ? `${kol.walletAddress.substring(0, 6)}...${kol.walletAddress.substring(kol.walletAddress.length - 4)}` : "0x..."}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 font-medium">{kol.balance}</td>
                        <td className="py-4 px-4">
                          <div className="text-green-500 font-medium">{kol.profit}</div>
                          <div className="text-xs text-green-400">{kol.profitPercentage}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            <span>{kol.interactions}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-400">{kol.lastActive}</td>
                        <td className="py-4 px-4">
                          <Link href={`/twitter?kol=${kol.id}`}>
                            <button className="p-2 rounded-full bg-[#222] hover:bg-[#333] transition-colors">
                              <ExternalLink className="h-4 w-4 text-[#00FF9D]" />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-8" id="KOLPage">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">KOL统计数据</h2>
                </div>
                {selectedKOL ? (
                  <KOLStats kol={statsData} />
                ) : (
                  <div className="p-6 text-center text-muted-foreground border rounded-lg">
                    请选择一个KOL查看详细统计数据
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground border border-gray-800 rounded-lg mt-4">
              <div className="mb-4">
                <BookmarkPlus className="w-12 h-12 mx-auto text-gray-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">您的关注列表为空</h3>
              <p>请从KOL列表中选择KOL，然后点击"+ 关注列表"按钮添加到您的关注列表</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
