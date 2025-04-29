import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiKeyDialog } from "@/components/ApiKeyDialog"; // Import the dialog component

// Placeholder data - replace with API calls
const accountBalances = {
  binance: { USDT: 1000.50, BTC: 0.05 },
  mexc: { USDT: 500.25, ETH: 0.1 },
};

const openOrders = [
  { id: 1, exchange: "Binance", symbol: "BTC/USDT", side: "buy", price: 60000, amount: 0.01, status: "open" },
];

const closedOrders = [
  { id: 2, exchange: "MEXC", symbol: "ETH/USDT", side: "sell", price: 3000, amount: 0.1, status: "closed", profit: 50.0 },
];

const tradeHistory = [
  { id: 1, timestamp: "2024-04-29T10:00:00Z", exchange: "Binance", symbol: "BTC/USDT", side: "buy", price: 60000, amount: 0.01, profit: null },
  { id: 2, timestamp: "2024-04-29T11:30:00Z", exchange: "MEXC", symbol: "ETH/USDT", side: "sell", price: 3000, amount: 0.1, profit: 50.0 },
];

const dailySummary = {
  profit: 50.0,
  loss: 0.0,
  totalTrades: 2,
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Trading Bot Dashboard</h1>
        <ApiKeyDialog /> {/* Add the dialog trigger button here */}
      </div>

      {/* Bot Status & Control */}
      <Card>
        <CardHeader>
          <CardTitle>Bot Status</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <p>Status: <span className="font-semibold text-green-600">Running</span></p> {/* Placeholder */}
          <div className="flex items-center space-x-2">
            <Switch id="bot-status" />
            <Label htmlFor="bot-status">Pause/Resume Bot</Label>
          </div>
        </CardContent>
      </Card>

      {/* Balances & Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Account Balances</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold">Binance:</h3>
            <ul>
              {Object.entries(accountBalances.binance).map(([asset, balance]) => (
                <li key={asset}>{asset}: {balance.toFixed(4)}</li>
              ))}
            </ul>
            <h3 className="font-semibold mt-2">MEXC:</h3>
            <ul>
              {Object.entries(accountBalances.mexc).map(([asset, balance]) => (
                <li key={asset}>{asset}: {balance.toFixed(4)}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Daily Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Profit: <span className="text-green-600">${dailySummary.profit.toFixed(2)}</span></p>
            <p>Loss: <span className="text-red-600">${dailySummary.loss.toFixed(2)}</span></p>
            <p>Net: ${ (dailySummary.profit - dailySummary.loss).toFixed(2)}</p>
            <p>Total Trades: {dailySummary.totalTrades}</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders & History */}
      <Tabs defaultValue="open-orders">
        <TabsList>
          <TabsTrigger value="open-orders">Open Orders ({openOrders.length})</TabsTrigger>
          <TabsTrigger value="closed-orders">Closed Orders</TabsTrigger>
          <TabsTrigger value="trade-history">Trade History</TabsTrigger>
        </TabsList>
        <TabsContent value="open-orders">
          <Card>
            <CardHeader>
              <CardTitle>Open Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exchange</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Side</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {openOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.exchange}</TableCell>
                      <TableCell>{order.symbol}</TableCell>
                      <TableCell className={order.side === 'buy' ? 'text-green-600' : 'text-red-600'}>{order.side}</TableCell>
                      <TableCell>{order.price}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="closed-orders">
           {/* Similar Table for Closed Orders */}
           <Card>
            <CardHeader><CardTitle>Closed Orders</CardTitle></CardHeader>
            <CardContent>Implement Table Here</CardContent>
           </Card>
        </TabsContent>
        <TabsContent value="trade-history">
           {/* Similar Table for Trade History with Filters */}
           <Card>
            <CardHeader><CardTitle>Trade History</CardTitle></CardHeader>
            <CardContent>Implement Table Here</CardContent>
           </Card>
        </TabsContent>
      </Tabs>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Bot Settings</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="risk">Risk per Trade (%)</Label>
            <Input id="risk" type="number" defaultValue={1} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stop-loss">Stop Loss (%)</Label>
            <Input id="stop-loss" type="number" defaultValue={2} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="take-profit">Take Profit (%)</Label>
            <Input id="take-profit" type="number" defaultValue={5} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-trades">Max Open Trades (per exchange)</Label>
            <Input id="max-trades" type="number" defaultValue={3} />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Settings</Button>
        </CardFooter>
      </Card>

    </div>
  );
}

