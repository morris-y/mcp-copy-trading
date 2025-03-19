import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Pause, BarChart2 } from "lucide-react"

export default function ABTestPage() {
  // Sample A/B test data
  const tests = [
    {
      id: 1,
      name: "MCP 监控推特，动态调整参数",
      status: "running",
      progress: 68,
      startDate: "2023-11-01",
      strategyA: {
        name: "跟单模拟器 默认参数",
        winRate: 62,
        profit: 8.7,
        trades: 42,
      },
      strategyB: {
        name: "MCP 监控推特，动态调整参数",
        winRate: 58,
        profit: 7.2,
        trades: 38,
      },
    },
    {
      id: 2,
      name: "MCP 监控宏观数据，动态调整参数",
      status: "completed",
      progress: 100,
      startDate: "2023-10-15",
      strategyA: {
        name: "跟单模拟器 默认参数",
        winRate: 55,
        profit: 5.3,
        trades: 65,
      },
      strategyB: {
        name: "MCP 监控宏观数据，动态调整参数",
        winRate: 59,
        profit: 6.8,
        trades: 58,
      },
    },
    {
      id: 3,
      name: "MCP 混合推特/宏观数据，动态调整参数",
      status: "paused",
      progress: 45,
      startDate: "2023-11-10",
      strategyA: {
        name: "跟单模拟器 默认参数",
        winRate: 48,
        profit: 3.2,
        trades: 32,
      },
      strategyB: {
        name: "MCP 混合推特/宏观数据，动态调整参数",
        winRate: 52,
        profit: 5.1,
        trades: 30,
      },
    },
  ]

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">A/B测试</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>测试总数</CardTitle>
            <CardDescription>当前运行的测试数量</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>运行中</CardTitle>
            <CardDescription>正在运行的测试</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>已完成</CardTitle>
            <CardDescription>已完成的测试</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>已暂停</CardTitle>
            <CardDescription>暂停中的测试</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">测试列表</h2>
        <Button>
          <BarChart2 className="mr-2 h-4 w-4" />
          创建新测试
        </Button>
      </div>

      <div className="space-y-6">
        {tests.map((test) => (
          <Card key={test.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{test.name}</CardTitle>
                  <CardDescription>开始日期: {test.startDate}</CardDescription>
                </div>
                <Badge
                  variant={
                    test.status === "running" ? "default" : test.status === "completed" ? "success" : "secondary"
                  }
                >
                  {test.status === "running" ? "运行中" : test.status === "completed" ? "已完成" : "已暂停"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">测试进度</span>
                  <span className="text-sm">{test.progress}%</span>
                </div>
                <Progress value={test.progress} />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">策略A: {test.strategyA.name}</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{test.strategyA.winRate}%</div>
                      <div className="text-xs text-muted-foreground">胜率</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500">+{test.strategyA.profit}%</div>
                      <div className="text-xs text-muted-foreground">收益</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{test.strategyA.trades}</div>
                      <div className="text-xs text-muted-foreground">交易数</div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">策略B: {test.strategyB.name}</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{test.strategyB.winRate}%</div>
                      <div className="text-xs text-muted-foreground">胜率</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500">+{test.strategyB.profit}%</div>
                      <div className="text-xs text-muted-foreground">收益</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{test.strategyB.trades}</div>
                      <div className="text-xs text-muted-foreground">交易数</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4 gap-2">
                {test.status === "running" ? (
                  <Button variant="outline" size="sm">
                    <Pause className="mr-2 h-4 w-4" />
                    暂停
                  </Button>
                ) : test.status === "paused" ? (
                  <Button variant="outline" size="sm">
                    <Play className="mr-2 h-4 w-4" />
                    继续
                  </Button>
                ) : null}
                <Button size="sm">查看详情</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
