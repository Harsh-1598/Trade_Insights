"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, Info, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for order book
const orderBook = {
  buy: [
    { price: 19845.5, quantity: 150, total: 2976825.0 },
    { price: 19844.25, quantity: 75, total: 1488318.75 },
    { price: 19843.0, quantity: 200, total: 3968600.0 },
    { price: 19842.5, quantity: 100, total: 1984250.0 },
    { price: 19841.75, quantity: 50, total: 992087.5 },
  ],
  sell: [
    { price: 19846.75, quantity: 120, total: 2381610.0 },
    { price: 19847.5, quantity: 80, total: 1587800.0 },
    { price: 19848.25, quantity: 180, total: 3572685.0 },
    { price: 19849.0, quantity: 90, total: 1786410.0 },
    { price: 19850.25, quantity: 60, total: 1191015.0 },
  ],
}

// Mock data for recent trades
const recentTrades = [
  { time: "15:30:45", price: 19845.5, quantity: 10, side: "buy" },
  { time: "15:30:30", price: 19846.75, quantity: 5, side: "sell" },
  { time: "15:30:15", price: 19845.5, quantity: 8, side: "buy" },
  { time: "15:30:00", price: 19847.5, quantity: 12, side: "sell" },
  { time: "15:29:45", price: 19844.25, quantity: 15, side: "buy" },
]

// Mock data for open orders
const openOrders = [
  {
    id: "ORD-001",
    time: "15:25:30",
    type: "Limit",
    side: "buy",
    price: 19840.0,
    quantity: 10,
    filled: 0,
    status: "open",
  },
  {
    id: "ORD-002",
    time: "15:20:15",
    type: "Limit",
    side: "sell",
    price: 19860.0,
    quantity: 5,
    filled: 0,
    status: "open",
  },
]

export function TradingInterface() {
  const [orderType, setOrderType] = useState("market")
  const [orderSide, setOrderSide] = useState("buy")
  const [quantity, setQuantity] = useState("1")
  const [price, setPrice] = useState("19845.50")
  const [stopPrice, setStopPrice] = useState("19835.00")
  const [isAdvanced, setIsAdvanced] = useState(false)
  const { toast } = useToast()

  const handleSubmitOrder = () => {
    // In a real app, this would submit the order to your backend
    toast({
      title: `${orderSide === "buy" ? "Buy" : "Sell"} Order Submitted`,
      description: `${orderType.charAt(0).toUpperCase() + orderType.slice(1)} order for ${quantity} units at ${orderType === "market" ? "market price" : `₹${price}`}`,
    })
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">Trade NIFTY 50</h1>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">₹19,845.50</span>
          <Badge variant="success" className="text-sm">
            +250.50 (+1.28%)
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Place Order</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Tabs value={orderSide} onValueChange={setOrderSide} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="buy" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                    Buy
                  </TabsTrigger>
                  <TabsTrigger value="sell" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                    Sell
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-2">
                <Label htmlFor="orderType">Order Type</Label>
                <Select value={orderType} onValueChange={setOrderType}>
                  <SelectTrigger id="orderType">
                    <SelectValue placeholder="Select order type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market">Market</SelectItem>
                    <SelectItem value="limit">Limit</SelectItem>
                    <SelectItem value="stop">Stop</SelectItem>
                    <SelectItem value="stopLimit">Stop Limit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              {(orderType === "limit" || orderType === "stopLimit") && (
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.05"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              )}

              {(orderType === "stop" || orderType === "stopLimit") && (
                <div className="space-y-2">
                  <Label htmlFor="stopPrice">Stop Price (₹)</Label>
                  <Input
                    id="stopPrice"
                    type="number"
                    step="0.05"
                    value={stopPrice}
                    onChange={(e) => setStopPrice(e.target.value)}
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <Label htmlFor="advanced">Advanced Options</Label>
                <Switch id="advanced" checked={isAdvanced} onCheckedChange={setIsAdvanced} />
              </div>

              {isAdvanced && (
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="tif">Time In Force</Label>
                      <Select defaultValue="day">
                        <SelectTrigger id="tif" className="w-[140px]">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="day">Day</SelectItem>
                          <SelectItem value="gtc">Good Till Cancel</SelectItem>
                          <SelectItem value="ioc">Immediate or Cancel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Take Profit</Label>
                    <div className="flex items-center gap-2">
                      <Input type="number" step="0.05" placeholder="Price" className="w-full" />
                      <span>₹</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Stop Loss</Label>
                    <div className="flex items-center gap-2">
                      <Input type="number" step="0.05" placeholder="Price" className="w-full" />
                      <span>₹</span>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="w-full rounded-md bg-muted p-3">
              <div className="flex justify-between text-sm">
                <span>Estimated Cost:</span>
                <span className="font-medium">
                  ₹{(Number.parseFloat(quantity) * Number.parseFloat(price)).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Fees:</span>
                <span className="font-medium">
                  ₹{(Number.parseFloat(quantity) * Number.parseFloat(price) * 0.0005).toLocaleString()}
                </span>
              </div>
            </div>
            <Button
              className={`w-full ${orderSide === "buy" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
              onClick={handleSubmitOrder}
            >
              {orderSide === "buy" ? "Buy" : "Sell"} NIFTY 50
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <Tabs defaultValue="orderBook">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle>Market Data</CardTitle>
                <TabsList>
                  <TabsTrigger value="orderBook">Order Book</TabsTrigger>
                  <TabsTrigger value="recentTrades">Recent Trades</TabsTrigger>
                  <TabsTrigger value="openOrders">Open Orders</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <TabsContent value="orderBook" className="m-0">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-green-500">Buy Orders</h4>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Price (₹)</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead className="hidden sm:table-cell">Total (₹)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orderBook.buy.map((order, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-green-500">{order.price.toFixed(2)}</TableCell>
                              <TableCell>{order.quantity}</TableCell>
                              <TableCell className="hidden sm:table-cell">{order.total.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-red-500">Sell Orders</h4>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Price (₹)</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead className="hidden sm:table-cell">Total (₹)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orderBook.sell.map((order, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-red-500">{order.price.toFixed(2)}</TableCell>
                              <TableCell>{order.quantity}</TableCell>
                              <TableCell className="hidden sm:table-cell">{order.total.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="recentTrades" className="m-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Price (₹)</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Side</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentTrades.map((trade, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono text-sm">{trade.time}</TableCell>
                          <TableCell className={trade.side === "buy" ? "text-green-500" : "text-red-500"}>
                            {trade.price.toFixed(2)}
                          </TableCell>
                          <TableCell>{trade.quantity}</TableCell>
                          <TableCell>
                            <Badge variant={trade.side === "buy" ? "success" : "destructive"}>
                              {trade.side === "buy" ? "Buy" : "Sell"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="openOrders" className="m-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Side</TableHead>
                        <TableHead>Price (₹)</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {openOrders.length > 0 ? (
                        openOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-mono text-xs">{order.id}</TableCell>
                            <TableCell className="text-sm">{order.time}</TableCell>
                            <TableCell>{order.type}</TableCell>
                            <TableCell>
                              <Badge variant={order.side === "buy" ? "success" : "destructive"}>
                                {order.side === "buy" ? "Buy" : "Sell"}
                              </Badge>
                            </TableCell>
                            <TableCell>{order.price.toFixed(2)}</TableCell>
                            <TableCell>{order.quantity}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                <Clock className="mr-1 h-3 w-3" />
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Cancel</span>
                                <AlertCircle className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            <div className="flex flex-col items-center justify-center gap-1">
                              <Info className="h-8 w-8 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">No open orders</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

