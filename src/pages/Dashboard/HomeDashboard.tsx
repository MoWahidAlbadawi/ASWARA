import { Card, CardContent, Typography, Grid, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import Chart from "react-apexcharts";
import clsx from "clsx";

const HomeDashboard = () => {
  // بيانات وهمية للإحصائيات
  const stats = [
    { title: "المستخدمين", value: 1200 },
    { title: "المنتجات", value: 320 },
    { title: "الفئات", value: 15 },
    { title: "الإشعارات", value: 8 },
    { title: "طلبات البيع المعلقة", value: 12 },
  ];

  // بيانات المخطط البياني (المبيعات الشهرية)
  const salesChart = {
    options: {
      chart: { id: "sales-chart" },
      xaxis: { categories: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"] },
      colors: ["#D4AF37"],
    },
    series: [{ name: "المبيعات", data: [30, 40, 45, 50, 49, 60] }],
  };

  // بيانات المخطط الدائري (المنتجات حسب الفئات)
  const categoryChart = {
    options: {
      labels: ["خواتم", "أساور", "أطقم", "أقراط", "سلاسل"],
      colors: ["#D4AF37", "#C4A000", "#FFD700", "#B8860B", "#8B7500"],
    },
    series: [40, 25, 15, 10, 10],
  };

  // بيانات آخر الطلبات
  const latestRequests = [
    { user: "أحمد علي", product: "خاتم ذهب", status: "قيد المراجعة" },
    { user: "منى خالد", product: "سوار ذهب", status: "مقبول" },
    { user: "يوسف محمد", product: "طقم ذهب", status: "مرفوض" },
  ];

  return (
    <div className="p-6">
      {/* الإحصائيات */}
      <Grid container spacing={2} className="mb-6">
        {stats.map((stat, index) => (
          <Grid  size={{xs : 12 , sm : 6 , md : 2.4}} key={index}>
            <Card className={clsx("rounded-2xl shadow-lg")} sx={{ backgroundColor: "#1F1F1F", color: "white" }}>
              <CardContent>
                <Typography variant="h6" className="mb-2">{stat.title}</Typography>
                <Typography variant="h4" sx={{ color: "#D4AF37" }}>{stat.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* المخططات */}
      <Grid container spacing={4} className="mb-6">
        <Grid  size={{xs : 12 , md : 8}}>
          <Card className="rounded-2xl shadow-lg">
            <CardContent>
              <Typography variant="h6" className="mb-4">نظرة عامة على المبيعات</Typography>
              <Chart options={salesChart.options} series={salesChart.series} type="line" height={300} />
            </CardContent>
          </Card>
        </Grid>
        <Grid  size={{xs : 12 , md : 8}}>
          <Card className="rounded-2xl shadow-lg">
            <CardContent>
              <Typography variant="h6" className="mb-4">المنتجات حسب الفئات</Typography>
              <Chart options={categoryChart.options} series={categoryChart.series} type="pie" height={300} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* آخر الطلبات */}
      <Card className="rounded-2xl shadow-lg">
        <CardContent>
          <Typography variant="h6" className="mb-4">آخر طلبات البيع</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>المستخدم</TableCell>
                <TableCell>المنتج</TableCell>
                <TableCell>الحالة</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {latestRequests.map((req, index) => (
                <TableRow key={index}>
                  <TableCell>{req.user}</TableCell>
                  <TableCell>{req.product}</TableCell>
                  <TableCell>{req.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeDashboard;
