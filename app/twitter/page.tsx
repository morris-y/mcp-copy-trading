"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, ExternalLink, MessageSquare, Play, Twitter, ArrowUp, ArrowDown, LineChart, ChevronDown, ChevronUp, Save, Info } from "lucide-react"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// 模拟数据，实际中应该从API获取
const mockTokenData = [
  {
    id: 1,
    name: "Broccoli",
    avatar: "/broccoli.png",
    balance: "$6,050.15",
    action: "买入",
    purchaseAmount: "$6,050.15",
    profit: "+8.35%",
    profitAmount: "+$86.2K",
    time: "1h 以前"
  },
  {
    id: 2,
    name: "Broccoli",
    avatar: "/broccoli.png",
    balance: "$6,093.96",
    action: "买入",
    purchaseAmount: "$6,100.20",
    profit: "+6.7%",
    profitAmount: "+$62.4K",
    time: "2h 以前"
  },
  {
    id: 3,
    name: "Broccoli",
    avatar: "/broccoli.png",
    balance: "$30.41K",
    action: "买入",
    purchaseAmount: "$27.82K",
    profit: "+12.8%",
    profitAmount: "+$103.6K",
    time: "2h 以前"
  },
  {
    id: 4,
    name: "Broccoli",
    avatar: "/broccoli.png",
    balance: "$30.43K",
    action: "买入",
    purchaseAmount: "$28.15K",
    profit: "+9.5%",
    profitAmount: "+$78.2K",
    time: "2h 以前"
  },
  {
    id: 5,
    name: "Broccoli",
    avatar: "/broccoli.png",
    balance: "$30.43K",
    action: "卖出",
    purchaseAmount: "$31.26K",
    profit: "-2.3%",
    profitAmount: "-$18.7K",
    time: "2h 以前"
  },
  {
    id: 6,
    name: "Broccoli",
    avatar: "/broccoli.png",
    balance: "$30.42K",
    action: "买入",
    purchaseAmount: "$28.50K",
    profit: "+7.2%",
    profitAmount: "+$59.4K",
    time: "2h 以前"
  },
  {
    id: 7,
    name: "Broccoli",
    avatar: "/broccoli.png",
    balance: "$30.41K",
    action: "买入",
    purchaseAmount: "$28.13K",
    profit: "+8.1%",
    profitAmount: "+$68.9K",
    time: "2h 以前"
  },
  {
    id: 8,
    name: "Broccoli",
    avatar: "/broccoli.png",
    balance: "$30.42K",
    action: "卖出",
    purchaseAmount: "$28.90K",
    profit: "+5.3%",
    profitAmount: "+$42.7K",
    time: "2h 以前"
  },
  {
    id: 9,
    name: "Broccoli",
    avatar: "/broccoli.png",
    balance: "$30.4K",
    action: "买入",
    purchaseAmount: "$29.05K",
    profit: "+4.8%",
    profitAmount: "+$38.5K",
    time: "2h 以前"
  },
  {
    id: 10,
    name: "GATSBY",
    avatar: "/gatsby.png",
    balance: "$6,239.28",
    action: "买入",
    purchaseAmount: "$5,530.50",
    profit: "+12.8%",
    profitAmount: "+$32.5K",
    time: "22h 以前"
  },
  {
    id: 11,
    name: "DODO",
    avatar: "/dodo.png",
    balance: "$5,516.51",
    action: "卖出",
    purchaseAmount: "$4,363.85",
    profit: "+26.4%",
    profitAmount: "+$72.2K",
    time: "23h 以前"
  }
];

// 模拟不同代币的详情数据
const tokensDetail = {
  1: {
    name: "Broccoli",
    symbol: "BROC",
    price: "$0.06751",
    marketCap: "$0",
    totalPnl: "+$86.2K (+8.35%)",
    unrealizedPnl: "$38.2K (+16.95%)",
    currentPosition: "$263.2K",
    positionPercentage: "22.44%",
    totalBuys: "$1M",
    totalSells: "$854.6K",
    transactions: "26/50",
    avgBuyPrice: "$0.05937",
    avgSellPrice: "$0.0634",
    chart: "/broccoli-chart.png"
  },
  10: {
    name: "GATSBY",
    symbol: "GTBY",
    price: "$0.03104",
    marketCap: "$45.2M",
    totalPnl: "+$32.5K (+12.8%)",
    unrealizedPnl: "$18.9K (+9.7%)",
    currentPosition: "$142.8K",
    positionPercentage: "18.9%",
    totalBuys: "$680K",
    totalSells: "$495.2K",
    transactions: "18/32",
    avgBuyPrice: "$0.02845",
    avgSellPrice: "$0.02993",
    chart: "/gatsby-chart.png"
  },
  11: {
    name: "DODO",
    symbol: "DODO",
    price: "$0.00043",
    marketCap: "$12.4M",
    totalPnl: "+$72.2K (+26.4%)",
    unrealizedPnl: "$45.1K (+19.2%)",
    currentPosition: "$197.3K",
    positionPercentage: "26.7%",
    totalBuys: "$820K",
    totalSells: "$560.9K",
    transactions: "32/45",
    avgBuyPrice: "$0.00031",
    avgSellPrice: "$0.00039",
    chart: "/dodo-chart.png"
  }
};

// 默认的舆情分析提示
const defaultPrompt = `## Twitter Analysis
- [ ] Search for "Broccoli" token and token CA/address mentions on Twitter
- [ ] Collect tweets from the first week post-launch
- [ ] Analyze sentiment (positive, negative, neutral)
- [ ] Identify key themes and topics
- [ ] Extract notable quotes and reactions`;

export default function TwitterPage() {
  const [selectedToken, setSelectedToken] = useState<number | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [message, setMessage] = useState("");
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [currentTokenDetail, setCurrentTokenDetail] = useState<any>(null);
  const [savedToMemory, setSavedToMemory] = useState(false);

  const handleTokenSelect = (id: number) => {
    setSelectedToken(id);
    
    // 获取选中代币的详情
    const tokenName = mockTokenData.find(t => t.id === id)?.name || "Unknown";
    setPrompt(defaultPrompt.replace("Broccoli", tokenName));
    
    // 设置当前代币详情
    setCurrentTokenDetail(tokensDetail[id as keyof typeof tokensDetail] || tokensDetail[1]);
  };

  const handleRowSelection = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // 这里实际应该与后端通信
    console.log("Sending message:", message);
    setMessage("");
  };

  const startAnalysis = () => {
    setAnalysisStarted(true);
    
    // 模拟分析过程
    setTimeout(() => {
      setAnalysisResult(`# Twitter Sentiment Analysis Report for ${mockTokenData.find(t => t.id === selectedToken)?.name}

## Summary
- Overall Sentiment: Positive (72%)
- Total Tweets Analyzed: 1,243
- Timeframe: Last 7 days since launch

## Key Themes
1. **Price Performance** - Many users discussing the token's price increase
2. **Community Growth** - Discussion about growing community and holders
3. **Partnerships** - Speculation about future partnerships
4. **Tokenomics** - Discussions about the token's economic model

## Notable Influencer Mentions
- @crypto_influencer1: "This token has real potential, already up 2x since launch"
- @whale_watcher: "Seeing major wallet accumulation in the last 24 hours"
- @defi_analyst: "Interesting tokenomics, better than most new launches"

## Sentiment Breakdown
- 🟢 Positive: 72%
- 🟡 Neutral: 18%
- 🔴 Negative: 10%

## Market Impact Analysis
- Tweet volume increased 215% when price moved from $0.035 to $0.067
- Highest engagement during price breakout at $0.05

## Recommendations
- Monitor increasing Twitter activity as a potential indicator for price movement
- Track mentions from key influencers who have historically preceded price action
      `);
    }, 3000);
  };

  const saveToMemory = () => {
    // 模拟保存到Memory的功能
    setSavedToMemory(true);
    
    // 2秒后重置状态，以便显示成功消息后恢复按钮状态
    setTimeout(() => {
      setSavedToMemory(false);
    }, 2000);
  };

  return (
    <div className="container py-6 h-screen flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">推特数据分析</h1>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#00FF9D] rounded-full animate-pulse mr-2"></div>
            <span className="text-[#00FF9D]">实时连接</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 h-full">
        {/* 左侧：KOL代币表格 */}
        <div className="bg-[#1E1E1E] rounded-lg p-4 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">KOL交易代币</h2>
            <div className="flex gap-2">
              <Input
                placeholder="搜索代币..."
                className="w-64 bg-[#292929] border-0"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 font-medium">
                    <div className="flex items-center gap-1">
                      代币
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
                      买入金额
                      <button className="ml-1 p-0.5 rounded hover:bg-gray-800 transition-colors">
                        <ArrowUpDown className="h-3 w-3 text-gray-400" />
                      </button>
                    </div>
                  </th>
                  <th className="py-3 px-4 font-medium">利润</th>
                  <th className="py-3 px-4 font-medium">时间</th>
                  <th className="py-3 px-4 font-medium text-center">区块浏览器</th>
                </tr>
              </thead>
              <tbody>
                {mockTokenData.map((token) => (
                  <tr 
                    key={token.id} 
                    className={`border-b border-gray-800 hover:bg-[#292929] cursor-pointer ${selectedToken === token.id ? 'bg-[#054035]' : ''}`}
                    onClick={() => handleTokenSelect(token.id)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-yellow-500 flex items-center justify-center text-black font-bold">
                          {token.name.charAt(0)}
                        </div>
                        <div>
                          <span>{token.name}</span>
                          <div>
                            <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium ${token.action === '买入' ? 'bg-green-900/30 text-green-500' : 'bg-red-900/30 text-red-500'}`}>
                              {token.action}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{token.balance}</td>
                    <td className="py-3 px-4">{token.purchaseAmount}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className={token.profit.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                          {token.profit}
                        </span>
                        <span className="text-xs text-gray-400">{token.profitAmount}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{token.time}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-7 w-7"
                          onClick={(e) => {
                            e.stopPropagation();
                            // 实际应该跳转到其它页面
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#00FF9D]">
                            <path d="M17 16L21 12L17 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 16V17C3 18.6569 4.34315 20 6 20H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 12V8C3 6.34315 4.34315 5 6 5H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 右侧：数据分析面板 */}
        <div className="bg-[#1E1E1E] rounded-lg p-4 flex flex-col h-full">
          {selectedToken ? (
            <div className="flex flex-col h-full">
              {/* 代币信息 */}
              <div className="mb-4 p-4 bg-[#292929] rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-yellow-500 flex items-center justify-center text-black font-bold">
                      {currentTokenDetail?.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{currentTokenDetail?.name} {currentTokenDetail?.price}</h3>
                      <p className="text-sm text-gray-400">市值 {currentTokenDetail?.marketCap}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-400">总利润:</p>
                    <p className="text-md text-green-500">{currentTokenDetail?.totalPnl}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">未实现利润:</p>
                    <p className="text-md text-green-500">{currentTokenDetail?.unrealizedPnl}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">当前持仓:</p>
                    <p className="text-md">{currentTokenDetail?.currentPosition}</p>
                  </div>
                </div>
              </div>
              
              {/* 价格图表区域 */}
              <div className="mb-4 p-4 bg-[#292929] rounded-lg">
                <h3 className="text-lg font-semibold mb-3">价格走势图</h3>
                <div className="relative h-40 bg-[#1A1A1A] rounded p-3">
                  {/* 简化的网格 */}
                  <div className="absolute inset-0 grid grid-cols-5 grid-rows-4">
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className="border-[0.5px] border-gray-800"></div>
                    ))}
                  </div>
                  
                  {/* 蜡烛图 - 使用SVG实现 */}
                  <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
                    {/* 蜡烛1 */}
                    <rect x="3" y="28" width="2" height="10" fill="#EF4444" rx="0.1" />
                    <line x1="4" y1="40" x2="4" y2="28" stroke="#EF4444" strokeWidth="0.5" />
                    <line x1="4" y1="28" x2="4" y2="25" stroke="#EF4444" strokeWidth="0.5" />
                    
                    {/* 蜡烛2 */}
                    <rect x="9" y="30" width="2" height="5" fill="#EF4444" rx="0.1" />
                    <line x1="10" y1="36" x2="10" y2="30" stroke="#EF4444" strokeWidth="0.5" />
                    <line x1="10" y1="30" x2="10" y2="27" stroke="#EF4444" strokeWidth="0.5" />
                    
                    {/* 蜡烛3 */}
                    <rect x="15" y="33" width="2" height="7" fill="#10B981" rx="0.1" />
                    <line x1="16" y1="33" x2="16" y2="28" stroke="#10B981" strokeWidth="0.5" />
                    <line x1="16" y1="40" x2="16" y2="39" stroke="#10B981" strokeWidth="0.5" />
                    
                    {/* 蜡烛4 */}
                    <rect x="21" y="31" width="2" height="4" fill="#10B981" rx="0.1" />
                    <line x1="22" y1="31" x2="22" y2="29" stroke="#10B981" strokeWidth="0.5" />
                    <line x1="22" y1="35" x2="22" y2="34" stroke="#10B981" strokeWidth="0.5" />
                    
                    {/* 蜡烛5 */}
                    <rect x="27" y="25" width="2" height="6" fill="#10B981" rx="0.1" />
                    <line x1="28" y1="25" x2="28" y2="20" stroke="#10B981" strokeWidth="0.5" />
                    <line x1="28" y1="31" x2="28" y2="30" stroke="#10B981" strokeWidth="0.5" />
                    
                    {/* 蜡烛6 */}
                    <rect x="33" y="30" width="2" height="8" fill="#EF4444" rx="0.1" />
                    <line x1="34" y1="40" x2="34" y2="30" stroke="#EF4444" strokeWidth="0.5" />
                    <line x1="34" y1="30" x2="34" y2="26" stroke="#EF4444" strokeWidth="0.5" />
                    
                    {/* 蜡烛7 */}
                    <rect x="39" y="38" width="2" height="10" fill="#EF4444" rx="0.1" />
                    <line x1="40" y1="49" x2="40" y2="38" stroke="#EF4444" strokeWidth="0.5" />
                    <line x1="40" y1="38" x2="40" y2="35" stroke="#EF4444" strokeWidth="0.5" />
                    
                    {/* 蜡烛8 */}
                    <rect x="45" y="40" width="2" height="5" fill="#10B981" rx="0.1" />
                    <line x1="46" y1="40" x2="46" y2="37" stroke="#10B981" strokeWidth="0.5" />
                    <line x1="46" y1="45" x2="46" y2="44" stroke="#10B981" strokeWidth="0.5" />
                    
                    {/* 蜡烛9 - 买入点 */}
                    <rect x="51" y="35" width="2" height="8" fill="#10B981" rx="0.1" />
                    <line x1="52" y1="35" x2="52" y2="30" stroke="#10B981" strokeWidth="0.5" />
                    <line x1="52" y1="43" x2="52" y2="42" stroke="#10B981" strokeWidth="0.5" />
                    
                    <rect x="48" y="28" width="8" height="5" rx="1" fill="#10B981" />
                    <text x="52" y="32" textAnchor="middle" fill="white" fontSize="3" fontWeight="bold">BUY</text>
                    
                    {/* 蜡烛10 */}
                    <rect x="57" y="33" width="2" height="4" fill="#10B981" rx="0.1" />
                    <line x1="58" y1="33" x2="58" y2="31" stroke="#10B981" strokeWidth="0.5" />
                    <line x1="58" y1="37" x2="58" y2="36" stroke="#10B981" strokeWidth="0.5" />
                    
                    {/* 蜡烛11 */}
                    <rect x="63" y="30" width="2" height="6" fill="#10B981" rx="0.1" />
                    <line x1="64" y1="30" x2="64" y2="27" stroke="#10B981" strokeWidth="0.5" />
                    <line x1="64" y1="36" x2="64" y2="35" stroke="#10B981" strokeWidth="0.5" />
                    
                    {/* 蜡烛12 */}
                    <rect x="69" y="25" width="2" height="4" fill="#10B981" rx="0.1" />
                    <line x1="70" y1="25" x2="70" y2="22" stroke="#10B981" strokeWidth="0.5" />
                    <line x1="70" y1="29" x2="70" y2="28" stroke="#10B981" strokeWidth="0.5" />
                    
                    {/* 蜡烛13 */}
                    <rect x="75" y="28" width="2" height="6" fill="#EF4444" rx="0.1" />
                    <line x1="76" y1="35" x2="76" y2="28" stroke="#EF4444" strokeWidth="0.5" />
                    <line x1="76" y1="28" x2="76" y2="25" stroke="#EF4444" strokeWidth="0.5" />
                    
                    {/* 蜡烛14 */}
                    <rect x="81" y="20" width="2" height="5" fill="#10B981" rx="0.1" />
                    <line x1="82" y1="20" x2="82" y2="15" stroke="#10B981" strokeWidth="0.5" />
                    <line x1="82" y1="25" x2="82" y2="24" stroke="#10B981" strokeWidth="0.5" />
                    
                    {/* 蜡烛15 */}
                    <rect x="87" y="15" width="2" height="6" fill="#10B981" rx="0.1" />
                    <line x1="88" y1="15" x2="88" y2="10" stroke="#10B981" strokeWidth="0.5" />
                    <line x1="88" y1="21" x2="88" y2="20" stroke="#10B981" strokeWidth="0.5" />
                    
                    {/* 蜡烛16 - 买入点 */}
                    <rect x="93" y="10" width="2" height="4" fill="#10B981" rx="0.1" />
                    <line x1="94" y1="10" x2="94" y2="7" stroke="#10B981" strokeWidth="0.5" />
                    <line x1="94" y1="14" x2="94" y2="13" stroke="#10B981" strokeWidth="0.5" />
                    
                    <rect x="90" y="3" width="8" height="5" rx="1" fill="#10B981" />
                    <text x="94" y="7" textAnchor="middle" fill="white" fontSize="3" fontWeight="bold">BUY</text>
                  </svg>
                  
                  {/* 横轴时间标记 */}
                  <div className="absolute -bottom-4 left-0 text-xs text-gray-400">2:30</div>
                  <div className="absolute -bottom-4 left-1/3 text-xs text-gray-400">3:15</div>
                  <div className="absolute -bottom-4 left-2/3 text-xs text-gray-400">4:00</div>
                  <div className="absolute -bottom-4 right-0 text-xs text-gray-400">4:45</div>
                </div>
              </div>

              {/* 分析内容 */}
              <div className="flex-grow overflow-auto bg-[#292929] rounded-lg p-4 mb-4">
                {analysisResult ? (
                  <div className="prose prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: analysisResult.replace(/\n/g, '<br>') }} />
                  </div>
                ) : analysisStarted ? (
                  <div className="h-full flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00FF9D] mb-4"></div>
                    <p className="text-gray-400">正在分析推特数据，请稍候...</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold mb-2">推特舆情分析</h3>
                    <p className="text-gray-400 mb-4">
                      选择一个代币后，MCP将分析该代币的推特舆情和叙事。分析结果将帮助你了解市场情绪和趋势。
                    </p>
                    <div className="bg-[#1E1E1E] p-4 rounded-lg">
                      <h4 className="text-md font-semibold mb-2">分析范围:</h4>
                      <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full h-48 bg-[#292929] border border-gray-700 rounded-lg p-3 text-sm font-mono"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* 聊天框和控制按钮 */}
              <div className="flex flex-col">
                <div className="flex gap-2 mb-2" data-component-name="TwitterPage">
                  <Button 
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-[#054035] text-[#00FF9D] hover:bg-[#065045] hover:scale-105 transition-all"
                    onClick={startAnalysis}
                    disabled={analysisStarted && !analysisResult}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    执行舆情分析
                  </Button>
                  <Button 
                    className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 ${savedToMemory ? 'bg-[#00FF9D] text-[#054035]' : 'bg-[#054035] text-[#00FF9D]'} hover:bg-[#065045] hover:scale-105 transition-all`}
                    onClick={saveToMemory}
                    disabled={!analysisResult}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {savedToMemory ? '已存入' : '存入 Memory'}
                  </Button>
                  <TooltipProvider>
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-10 w-10 bg-transparent text-[#00FF9D] hover:bg-[#054035] hover:scale-105 transition-all p-0"
                        >
                          <Info className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs bg-[#292929] border-[#054035] text-white p-3">
                        <p>是否要将与MCP的互动结果存入Memory？在跟单策略设置时开启Memory模式，会自动根据Memory调整跟单策略的参数，使用保守或激進的策略来买入/持有/卖出。</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              
                <div className="flex gap-2">
                  <Input
                    placeholder="输入消息..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-grow bg-[#292929] border-gray-700"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    size="icon"
                    onClick={handleSendMessage}
                    className="bg-[#054035] text-[#00FF9D] hover:bg-[#065045] hover:scale-105 transition-all"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[#054035] flex items-center justify-center mb-4">
                <Twitter className="h-8 w-8 text-[#00FF9D]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">推特舆情分析</h3>
              <p className="text-gray-400 max-w-md mb-6">
                请在左侧选择一个代币，MCP将分析该代币的推特舆情和叙事，帮助你了解市场情绪和趋势。
              </p>
              <p className="text-sm text-gray-500">
                通过分析推特上的讨论，MCP可以帮助你识别关键主题、情绪变化和影响力人物的观点。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
