"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Info, ChevronDown } from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// 这个组件负责处理搜索参数逻辑
function StrategyFormContent() {
  const [strategyName, setStrategyName] = useState("")
  const [buyEnabled, setBuyEnabled] = useState(true)
  const [sellEnabled, setSellEnabled] = useState(true)
  const [buyMode, setBuyMode] = useState("fixed_amount")
  const [sellMode, setSellMode] = useState("mixed")
  const [sellAmountType, setSellAmountType] = useState("all")
  const [sellSpeedType, setSellSpeedType] = useState("accurate")
  const [autoSellMode, setAutoSellMode] = useState("single")
  const [selectedChain, setSelectedChain] = useState("bsc")
  const [walletCount, setWalletCount] = useState(5)
  const [walletAddresses, setWalletAddresses] = useState<string[]>(Array(10).fill(""))
  const [memoryAdjustEnabled, setMemoryAdjustEnabled] = useState(true)
  const [macroStrategyEnabled, setMacroStrategyEnabled] = useState(false)

  const searchParams = useSearchParams()

  useEffect(() => {
    console.log("处理URL参数")
    
    // 首先检查是否有直接从URL传入的钱包地址
    const walletAddressesParam = searchParams.get('walletAddresses')
    if (walletAddressesParam) {
      console.log("找到直接传入的钱包地址:", walletAddressesParam)
      const addresses = walletAddressesParam.split(',').filter(addr => addr && addr !== "undefined" && addr !== "null")
      
      if (addresses.length > 0) {
        console.log("有效的钱包地址:", addresses)
        // 更新钱包数量和地址
        setWalletCount(Math.min(addresses.length, 10))
        
        // 创建一个新的地址数组
        const newAddresses = Array(10).fill("")
        addresses.forEach((addr, idx) => {
          if (idx < 10) newAddresses[idx] = addr
        })
        
        console.log("设置钱包地址:", newAddresses)
        setWalletAddresses(newAddresses)
        return // 已经设置了地址，不需要继续处理
      }
    }
    
    // 如果URL中没有直接的钱包地址，则尝试通过KOL ID从localStorage获取
    const kolParam = searchParams.get('kols')
    if (kolParam) {
      console.log("找到KOL参数:", kolParam)
      const kolIds = kolParam.split(',').map(id => parseInt(id, 10))
      console.log("解析后的KOL IDs:", kolIds)
      
      // 获取钱包地址
      try {
        const kolDataStr = localStorage.getItem('kolData')
        if (kolDataStr) {
          console.log("找到localStorage中的kolData")
          const kols = JSON.parse(kolDataStr)
          console.log("解析后的KOL数据:", kols)
          
          // 根据ID获取对应的钱包地址
          const addresses = kolIds
            .map(id => {
              const matchedKol = kols.find((kol: any) => kol.id === id)
              console.log(`查找ID ${id} 匹配的KOL:`, matchedKol)
              return matchedKol?.walletAddress || ""
            })
            .filter((addr: string) => addr !== "")
          
          console.log("筛选后的钱包地址:", addresses)
          
          if (addresses.length > 0) {
            // 更新钱包数量和地址
            setWalletCount(Math.min(addresses.length, 10))
            
            // 创建一个新的地址数组
            const newAddresses = Array(10).fill("")
            addresses.forEach((addr, idx) => {
              if (idx < 10) newAddresses[idx] = addr
            })
            
            console.log("设置钱包地址:", newAddresses)
            setWalletAddresses(newAddresses)
          } else {
            console.log("没有找到有效的钱包地址")
          }
        } else {
          console.log("localStorage中没有找到kolData")
        }
      } catch (e) {
        console.error('处理KOL数据时出错:', e)
      }
    }
  }, [searchParams])

  return (
    <div className="container py-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/simulator" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-1" />
          返回
        </Link>
        <h1 className="text-2xl font-bold">创建新策略</h1>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>基本信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="strategy-name">策略名称</Label>
            <Input
              id="strategy-name"
              placeholder="输入策略名称"
              value={strategyName}
              onChange={(e) => setStrategyName(e.target.value)}
              data-component-name="_c"
            />
          </div>

          <div className="flex justify-between items-center border-b pb-4">
            <div className="flex items-center gap-2">
              <Label className="flex items-center cursor-pointer" data-component-name="Primitive.label">
                推特 Memory 动态调整参数
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 inline-block ml-1.5 text-muted-foreground hover:text-foreground transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 border-gray-700 text-white max-w-[280px] p-3">
                      <p>是否要将与MCP的互动结果存入Memory？在跟单策略设置时开启Memory模式，会自动根据Memory调整跟单策略的参数，使用保守或激進的策略来买入/持有/卖出。</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
            </div>
            <Switch 
              checked={memoryAdjustEnabled} 
              onCheckedChange={setMemoryAdjustEnabled} 
              data-component-name="Primitive.button"
            />
          </div>

          <div className="flex justify-between items-center border-b pb-4">
            <div className="flex items-center gap-2">
              <Label className="flex items-center cursor-pointer" data-component-name="Primitive.label">
                宏观策略 动态调整参数
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 inline-block ml-1.5 text-muted-foreground hover:text-foreground transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 border-gray-700 text-white max-w-[280px] p-3">
                      <p>基于宏观市场趋势自动调整策略参数，在牛市使用更激进的买入/持有策略，在熊市使用更保守的买入/卖出策略。</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
            </div>
            <Switch 
              checked={macroStrategyEnabled} 
              onCheckedChange={setMacroStrategyEnabled} 
              data-component-name="Primitive.button"
            />
          </div>

          <div className="space-y-2">
            <Label>选择链</Label>
            <div className="grid grid-cols-6 gap-2">
              <div
                className={`border rounded-md p-3 cursor-pointer flex items-center justify-center gap-1 ${selectedChain === "all" ? "bg-primary/10 border-primary" : ""}`}
                onClick={() => setSelectedChain("all")}
              >
                <span className="rounded-full bg-muted w-5 h-5 flex items-center justify-center text-xs">全</span>
                <span>All</span>
              </div>
              <div
                className={`border rounded-md p-3 cursor-pointer flex items-center justify-center gap-1 ${selectedChain === "solana" ? "bg-primary/10 border-primary" : ""}`}
                onClick={() => setSelectedChain("solana")}
              >
                <span className="rounded-full bg-blue-500 w-5 h-5 flex items-center justify-center text-xs text-white">
                  S
                </span>
                <span>Solana</span>
              </div>
              <div
                className={`border rounded-md p-3 cursor-pointer flex items-center justify-center gap-1 ${selectedChain === "ethereum" ? "bg-primary/10 border-primary" : ""}`}
                onClick={() => setSelectedChain("ethereum")}
              >
                <span className="rounded-full bg-indigo-500 w-5 h-5 flex items-center justify-center text-xs text-white">
                  E
                </span>
                <span>Ethereum</span>
              </div>
              <div
                className={`border rounded-md p-3 cursor-pointer flex items-center justify-center gap-1 ${selectedChain === "base" ? "bg-primary/10 border-primary" : ""}`}
                onClick={() => setSelectedChain("base")}
              >
                <span className="rounded-full bg-blue-600 w-5 h-5 flex items-center justify-center text-xs text-white">
                  B
                </span>
                <span>Base</span>
              </div>
              <div
                className={`border rounded-md p-3 cursor-pointer flex items-center justify-center gap-1 ${selectedChain === "bsc" ? "bg-primary/10 border-primary" : ""}`}
                onClick={() => setSelectedChain("bsc")}
              >
                <span className="rounded-full bg-yellow-500 w-5 h-5 flex items-center justify-center text-xs text-white">
                  B
                </span>
                <span>BSC</span>
              </div>
              <div
                className={`border rounded-md p-3 cursor-pointer flex items-center justify-center gap-1 ${selectedChain === "tron" ? "bg-primary/10 border-primary" : ""}`}
                onClick={() => setSelectedChain("tron")}
              >
                <span className="rounded-full bg-red-500 w-5 h-5 flex items-center justify-center text-xs text-white">
                  T
                </span>
                <span>Tron</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              跟随钱包数量
              <Info className="h-4 w-4 inline-block ml-1 text-muted-foreground" />
            </Label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                value={walletCount}
                onChange={(e) => setWalletCount(Number.parseInt(e.target.value) || 1)}
                className="w-24"
                min="1"
                max="10"
                data-component-name="_c"
              />
              <div className="text-sm text-muted-foreground">最多可添加10个钱包</div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>钱包地址</Label>
            <div className="space-y-2">
              {[...Array(walletCount)].map((_, index) => (
                <Input 
                  key={index} 
                  placeholder={`输入钱包地址 ${index + 1}`} 
                  value={walletAddresses[index] || ""}
                  onChange={(e) => {
                    const newAddresses = [...walletAddresses]
                    newAddresses[index] = e.target.value
                    setWalletAddresses(newAddresses)
                  }}
                  data-component-name="_c"
                />
              ))}
            </div>
            {walletCount < 10 && (
              <Button variant="outline" size="sm" onClick={() => setWalletCount((prev) => Math.min(prev + 1, 10))}>
                添加钱包
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Buy Settings */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>买入设置</CardTitle>
              <Switch checked={buyEnabled} onCheckedChange={setBuyEnabled} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>买入模式</Label>
                <Button variant="outline" size="sm" className="h-7 px-3">
                  重置
                </Button>
              </div>

              <RadioGroup value={buyMode} onValueChange={setBuyMode} className="grid grid-cols-3 gap-2">
                <div
                  className={`border rounded-md p-3 cursor-pointer ${buyMode === "fixed_amount" ? "bg-primary/10 border-primary" : ""}`}
                  onClick={() => setBuyMode("fixed_amount")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed_amount" id="fixed_amount" className="sr-only" />
                    <Label htmlFor="fixed_amount" className="cursor-pointer font-normal text-sm">
                      最大金额
                    </Label>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div
                  className={`border rounded-md p-3 cursor-pointer ${buyMode === "fixed_ratio" ? "bg-primary/10 border-primary" : ""}`}
                  onClick={() => setBuyMode("fixed_ratio")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed_ratio" id="fixed_ratio" className="sr-only" />
                    <Label htmlFor="fixed_ratio" className="cursor-pointer font-normal text-sm">
                      固定金额
                    </Label>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div
                  className={`border rounded-md p-3 cursor-pointer ${buyMode === "follow_amount" ? "bg-primary/10 border-primary" : ""}`}
                  onClick={() => setBuyMode("follow_amount")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="follow_amount" id="follow_amount" className="sr-only" />
                    <Label htmlFor="follow_amount" className="cursor-pointer font-normal text-sm">
                      固定比例
                    </Label>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-buy-amount" className="flex items-center">
                最大买入金额
                <Info className="h-4 w-4 inline-block ml-1 text-muted-foreground" />
              </Label>
              <div className="flex items-center gap-2">
                <Input id="max-buy-amount" type="number" defaultValue="1" className="flex-1" data-component-name="_c" />
                <span className="font-medium">BNB</span>
              </div>
              <div className="text-xs text-muted-foreground">~$617.5</div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center">
                Gas增量 (Gwei)
                <Info className="h-4 w-4 inline-block ml-1 text-muted-foreground" />
              </Label>
              <div className="flex items-center gap-2">
                <div className="font-medium">+5</div>
                <Slider defaultValue={[5]} max={20} step={1} className="flex-1" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center">
                最大Gas (Gwei)
                <Info className="h-4 w-4 inline-block ml-1 text-muted-foreground" />
              </Label>
              <div className="flex items-center gap-2">
                <div className="font-medium">100</div>
                <Slider defaultValue={[100]} max={200} step={1} className="flex-1" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center">
                滑点容忍度
                <Info className="h-4 w-4 inline-block ml-1 text-muted-foreground" />
              </Label>
              <div className="flex items-center gap-2">
                <div className="font-medium">20%</div>
                <Slider defaultValue={[20]} max={100} step={1} className="flex-1" />
              </div>
            </div>

            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1">
                高级设置
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sell Settings */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>卖出设置</CardTitle>
              <Switch checked={sellEnabled} onCheckedChange={setSellEnabled} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>卖出模式</Label>
                <Button variant="outline" size="sm" className="h-7 px-3">
                  重置
                </Button>
              </div>

              <RadioGroup value={sellMode} onValueChange={setSellMode} className="grid grid-cols-3 gap-2">
                <div
                  className={`border rounded-md p-3 cursor-pointer ${sellMode === "mixed" ? "bg-primary/10 border-primary" : ""}`}
                  onClick={() => setSellMode("mixed")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mixed" id="mixed" className="sr-only" />
                    <Label htmlFor="mixed" className="cursor-pointer font-normal text-sm">
                      混合
                    </Label>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div
                  className={`border rounded-md p-3 cursor-pointer ${sellMode === "only_copy" ? "bg-primary/10 border-primary" : ""}`}
                  onClick={() => setSellMode("only_copy")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="only_copy" id="only_copy" className="sr-only" />
                    <Label htmlFor="only_copy" className="cursor-pointer font-normal text-sm">
                      只跟卖
                    </Label>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div
                  className={`border rounded-md p-3 cursor-pointer ${sellMode === "only_pnl" ? "bg-primary/10 border-primary" : ""}`}
                  onClick={() => setSellMode("only_pnl")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="only_pnl" id="only_pnl" className="sr-only" />
                    <Label htmlFor="only_pnl" className="cursor-pointer font-normal text-sm">
                      只止盈止损
                    </Label>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>卖出比例</Label>
              <RadioGroup value={sellAmountType} onValueChange={setSellAmountType} className="grid grid-cols-3 gap-2">
                <div
                  className={`border rounded-md p-3 cursor-pointer ${sellAmountType === "all" ? "bg-primary/10 border-primary" : ""}`}
                  onClick={() => setSellAmountType("all")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" className="sr-only" />
                    <Label htmlFor="all" className="cursor-pointer font-normal text-sm">
                      跟随比例
                    </Label>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div
                  className={`border rounded-md p-3 cursor-pointer ${sellAmountType === "follow_ratio" ? "bg-primary/10 border-primary" : ""}`}
                  onClick={() => setSellAmountType("follow_ratio")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="follow_ratio" id="follow_ratio" className="sr-only" />
                    <Label htmlFor="follow_ratio" className="cursor-pointer font-normal text-sm">
                      固定比例
                    </Label>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div
                  className={`border rounded-md p-3 cursor-pointer ${sellAmountType === "x_target_ratio" ? "bg-primary/10 border-primary" : ""}`}
                  onClick={() => setSellAmountType("x_target_ratio")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="x_target_ratio" id="x_target_ratio" className="sr-only" />
                    <Label htmlFor="x_target_ratio" className="cursor-pointer font-normal text-sm">
                      100%卖出
                    </Label>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center">
                快速卖出
                <Info className="h-4 w-4 inline-block ml-1 text-muted-foreground" />
              </Label>
              <RadioGroup value={sellSpeedType} onValueChange={setSellSpeedType} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="accurate" id="accurate" />
                  <Label htmlFor="accurate" className="font-normal">
                    准确优先
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fast" id="fast" />
                  <Label htmlFor="fast" className="font-normal">
                    速度优先
                  </Label>
                </div>
              </RadioGroup>
              <div className="text-xs text-muted-foreground">* 启用后卖出速度优先，但比例可能与聪明钱不同</div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center">
                自动止盈止损模式
                <Info className="h-4 w-4 inline-block ml-1 text-muted-foreground" />
              </Label>
              <RadioGroup value={autoSellMode} onValueChange={setAutoSellMode} className="grid grid-cols-2 gap-2">
                <div
                  className={`border rounded-md p-3 cursor-pointer ${autoSellMode === "single" ? "bg-primary/10 border-primary" : ""}`}
                  onClick={() => setAutoSellMode("single")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single" id="single" className="sr-only" />
                    <Label htmlFor="single" className="cursor-pointer font-normal text-sm">
                      单次
                    </Label>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div
                  className={`border rounded-md p-3 cursor-pointer ${autoSellMode === "group" ? "bg-primary/10 border-primary" : ""}`}
                  onClick={() => setAutoSellMode("group")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="group" id="group" className="sr-only" />
                    <Label htmlFor="group" className="cursor-pointer font-normal text-sm">
                      分段
                    </Label>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </RadioGroup>
            </div>

            {autoSellMode === "single" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="stop-earn" className="flex items-center">
                      自动止盈
                      <Info className="h-4 w-4 inline-block ml-1 text-muted-foreground" />
                    </Label>
                    <div className="text-sm font-medium">100%</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input id="stop-earn" type="number" defaultValue="100" className="w-20" data-component-name="_c" />
                    <span>%</span>
                    <span className="text-sm text-muted-foreground">卖出代币</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="stop-loss" className="flex items-center">
                      自动止损
                      <Info className="h-4 w-4 inline-block ml-1 text-muted-foreground" />
                    </Label>
                    <div className="text-sm font-medium">50%</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input id="stop-loss" type="number" defaultValue="50" className="w-20" data-component-name="_c" />
                    <span>%</span>
                    <span className="text-sm text-muted-foreground">卖出代币</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" asChild>
          <Link href="/simulator">取消</Link>
        </Button>
        <Button asChild>
          <Link href="/simulator">保存</Link>
        </Button>
      </div>
    </div>
  )
}

// 使用Suspense边界包裹主组件
export default function NewStrategyPage() {
  return (
    <Suspense fallback={<div className="container py-6">加载中...</div>}>
      <StrategyFormContent />
    </Suspense>
  )
}
