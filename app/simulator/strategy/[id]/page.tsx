"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Info, ChevronDown } from "lucide-react"
import Link from "next/link"

export default function StrategySettingsPage({ params }: { params: { id: string } }) {
  const [buyEnabled, setBuyEnabled] = useState(true)
  const [sellEnabled, setSellEnabled] = useState(true)
  const [buyMode, setBuyMode] = useState("fixed_amount")
  const [sellMode, setSellMode] = useState("mixed")
  const [sellAmountType, setSellAmountType] = useState("all")
  const [sellSpeedType, setSellSpeedType] = useState("accurate")
  const [autoSellMode, setAutoSellMode] = useState("single")
  const [stopLossEnabled, setStopLossEnabled] = useState(true)
  const [hasExistingToken, setHasExistingToken] = useState("continue")

  return (
    <div className="container py-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/simulator" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-1" />
          返回
        </Link>
        <h1 className="text-2xl font-bold">策略设置: {params.id}</h1>
      </div>

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
                <Input id="max-buy-amount" type="number" defaultValue="1" className="flex-1" />
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

            <div className="space-y-2 pt-2">
              <Label className="flex items-center">
                生效时间
                <Info className="h-4 w-4 inline-block ml-1 text-muted-foreground" />
              </Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  全天
                </Button>
                <span className="text-muted-foreground">/</span>
                <Button variant="outline" size="sm" className="h-8">
                  编辑
                </Button>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Label className="flex items-center">
                已持有代币时
                <Info className="h-4 w-4 inline-block ml-1 text-muted-foreground" />
              </Label>
              <RadioGroup value={hasExistingToken} onValueChange={setHasExistingToken} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="continue" id="continue" />
                  <Label htmlFor="continue" className="font-normal">
                    不买入
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="stop" id="stop" />
                  <Label htmlFor="stop" className="font-normal">
                    继续买入
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2 pt-2">
              <Label className="flex items-center">
                限买区间
                <Info className="h-4 w-4 inline-block ml-1 text-muted-foreground" />
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input type="number" defaultValue="0.1" />
                  <div className="text-xs text-muted-foreground mt-1">~$61.75</div>
                </div>
                <div className="flex items-center gap-2">
                  <span>-</span>
                  <div className="flex-1">
                    <Input type="number" defaultValue="1" />
                    <div className="text-xs text-muted-foreground mt-1">~$617.5</div>
                  </div>
                </div>
              </div>
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
                    <Input id="stop-earn" type="number" defaultValue="100" className="w-20" />
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
                    <Input id="stop-loss" type="number" defaultValue="50" className="w-20" />
                    <span>%</span>
                    <span className="text-sm text-muted-foreground">卖出代币</span>
                  </div>
                </div>
              </div>
            )}

            {autoSellMode === "group" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center">
                    移动止盈止损
                    <Info className="h-4 w-4 inline-block ml-1 text-muted-foreground" />
                  </Label>
                  <div className="flex items-center gap-2">
                    <span>当价格回调</span>
                    <Input type="number" className="w-20" />
                    <span>%</span>
                    <span>卖出</span>
                    <Input type="number" className="w-20" />
                    <span>%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center">
                    止盈止损过期时间
                    <Info className="h-4 w-4 inline-block ml-1 text-muted-foreground" />
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input type="number" defaultValue="120" />
                    <span>小时</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="stop-after-expire" />
                  <Label htmlFor="stop-after-expire" className="font-normal text-sm">
                    止盈止损过期时自动卖出
                    <Info className="h-4 w-4 inline-block ml-1 text-muted-foreground" />
                  </Label>
                </div>
              </div>
            )}

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

            <div className="space-y-2 pt-2">
              <Label className="flex items-center">
                生效时间
                <Info className="h-4 w-4 inline-block ml-1 text-muted-foreground" />
              </Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  全天
                </Button>
                <span className="text-muted-foreground">/</span>
                <Button variant="outline" size="sm" className="h-8">
                  编辑
                </Button>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Label className="flex items-center">
                限卖区间
                <Info className="h-4 w-4 inline-block ml-1 text-muted-foreground" />
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input type="number" defaultValue="0.1" />
                  <div className="text-xs text-muted-foreground mt-1">~$61.75</div>
                </div>
                <div className="flex items-center gap-2">
                  <span>-</span>
                  <div className="flex-1">
                    <Input type="number" defaultValue="1" />
                    <div className="text-xs text-muted-foreground mt-1">~$617.5</div>
                  </div>
                </div>
              </div>
            </div>
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

