"use client"

import { Card, CardContent, CardHeader, Button , Typography } from "@mui/material"
import {  Users, Package, ShoppingCart } from "lucide-react"
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

export default function GoldDashboard() {
  // Mock data for statistics
  const stats = [
    {
      title: "إجمالي العملاء",
      value: "1,247",
      change: "+8.2%",
      icon: Users,
      trend: "up",
    },
    {
      title: "المنتجات المتاحة",
      value: "324",
      change: "-2.1%",
      icon: Package,
      trend: "down",
    },
    {
      title: "عدد الطلبات الكلي",
      value: "50",
      change: "+12%",
      icon: ShoppingCart,
      trend: "up",
    },
    {
      title: "الطلبات المعلقة",
      value: "18",
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
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={index}
                className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl !transition-all ease-in-out duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-secondary-main"></div>
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
              action={
                <div className="flex gap-2">
                  <Button variant="outlined" size="small">
                    الشهر
                  </Button>
                  <Button variant="outlined" size="small" className="bg-transparent">
                    الأسبوع
                  </Button>
                  <Button variant="outlined" size="small" className="bg-transparent">
                    اليوم
                  </Button>
                </div>
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
