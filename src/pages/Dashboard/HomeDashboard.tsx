// data
import { GetAllOrders } from "@/hooks/order/useOrder"
import { GetAllProducts } from "@/hooks/products/useProducts"
import { GetAllUsers } from "@/hooks/users/useUsers"
// style components
import { Card, CardContent, CardHeader , Typography } from "@mui/material"
// icons
import {  Users, Package, ShoppingCart , DollarSign  } from "lucide-react"
// charts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
// react hooks
import { useContext, useEffect, useMemo } from "react"
import { GoldPricesContext } from "@/context/GoldPrices"
const HomePage = () => {
  // get data
  const { data : orders } = GetAllOrders();
  const { data : users } = GetAllUsers();
  const { data : products } = GetAllProducts();
  // gold price from conext
  const { goldPrices } = useContext(GoldPricesContext);
  // Silver prices
  // get what i want from this data
  const usersCount = useMemo(() => {
    const justUsers = users?.map((user) => user.userType === 'user') || [];
    return justUsers?.length;
  },[users])

  const productsCount = useMemo(() => {
    return products?.length || 0;
  },[products])

  const ordersCount = useMemo(() => {
    return orders?.length || 0;
  },
  [orders]);


  useEffect(() => {
    console.log(goldPrices,'dd')
  })

  const pendingOrdersCount = useMemo(() => {
    const pendingOrders = orders?.map((order) => order.status === 'pending') || [];
    return pendingOrders?.length;
  },[orders])
  // Mock data for statistics
  const stats = [
    {
      title: "إجمالي العملاء",
      value: usersCount,
      change: "+8.2%",
      icon: Users,
      trend: "up",
    },
    {
      title: "المنتجات المتاحة",
      value: productsCount,
      change: "-2.1%",
      icon: Package,
      trend: "down",
    },
    {
      title: "عدد الطلبات الكلي",
      value: ordersCount,
      change: "+12%",
      icon: ShoppingCart,
      trend: "up",
    },
    {
      title: "الطلبات المعلقة",
      value: pendingOrdersCount,
      change: "+5.3%",
      icon: ShoppingCart,
      trend: "up",
    },
  ]

  // Sales chart data
  const salesData = [
    { month: "يناير", sales: 30000 },
    { month: "فبراير", sales: 45000 },
    { month: "مارس", sales: 38000 },
    { month: "أبريل", sales: 52000 },
    { month: "مايو", sales: 61000 },
    { month: "يونيو", sales: 75000 },
  ]

  // Category distribution data
  const categoryData = [
    { name: "خواتم", value: 35, color: "#d4af37" },
    { name: "أساور", value: 25, color: "#c4a000" },
    { name: "أطقم", value: 20, color: "#ffd700" },
    { name: "أقراط", value: 12, color: "#b8860b" },
    { name: "سلاسل", value: 8, color: "#8b7500" },
  ]
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8 !my-5">
        {/* Metal Prices */}
        <div className="!mb-3">
  {/* Modern Metal Prices Section */}
            {/* Market status indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Market Status: Active</span>
                </div>
                <span className="text-xs text-gray-500">
                  Last updated: {new Date().toLocaleTimeString('en-US' , {
                    hour : '2-digit',
                    minute : '2-digit',
                    hour12 : true,
                  })}
                </span>
            </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {goldPrices.map((item) => (
                <div 
                  key={item.karat}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl !p-6 border border-amber-200/50 hover:border-amber-300/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-yellow-400/5 to-orange-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Karat badge */}
                  <div className="relative flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-md">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg">{item.karat}K Gold</h4>
                        <p className="text-amber-600 text-xs font-medium">Per Gram</p>
                      </div>
                    </div>
                    
                    {/* Quality indicator */}
                    <div className="!px-3 !py-1 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full">
                      <span className="text-xs font-semibold text-amber-700">
                        {item.karat === 24 ? 'Pure' : item.karat === 21 ? 'High' : 'Standard'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Price display */}
                  <div className="relative">
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 font-medium">USD</span>
                    </div>
                    
                    {/* Purity percentage */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-amber-400 to-yellow-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(item.karat / 24) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 font-medium">
                        {((item.karat / 24) * 100).toFixed(1)}%
                      </span>
                    </div>
                    
                    {/* Additional info */}
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Live pricing</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

      </div>
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={index}
                className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl !transition-all ease-in-out duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-[#9d6b1b]"></div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-400/10 rounded-full -translate-y-10 translate-x-10"></div>
                <CardContent className="relative p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-8 h-8 text-yellow-400" />
                    <span
                      className={`text-sm font-medium px-2 py-1 rounded-full ${
                        stat.trend === "up" ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                  <div>
                    <p className="text-primary-light text-sm mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 !my-5">
          {/* Sales Chart */}
          <Card className="lg:col-span-2 border-0 shadow-lg">
            <CardHeader className="pb-4" 
              title={
                <Typography color="secondary" component="h2" variant="h6">
                  نظرة عامة على المبيعات
                </Typography>
              }
            />
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#d4af37"
                      strokeWidth={3}
                      dot={{ fill: "#d4af37", strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, fill: "#d4af37" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card className="border-0 shadow-lg">
            <CardHeader
              className="pb-4"
              title={
                <Typography color="secondary" component="h2" variant="h6">
                  توزيع المنتجات
                </Typography>
              }
            />
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {categoryData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                    <span className="font-medium text-gray-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
export default HomePage;