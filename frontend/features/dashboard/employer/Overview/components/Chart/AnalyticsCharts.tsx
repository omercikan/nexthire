import { AreaChart, Area, BarChart, Bar } from "recharts";
import Chart from "./Chart";

const applicantTrendsData = [
  { month: "Oca", applications: 650 },
  { month: "Şub", applications: 780 },
  { month: "Mar", applications: 920 },
  { month: "Nis", applications: 1020 },
  { month: "May", applications: 1100 },
  { month: "Haz", applications: 1270 },
];

const jobPerformanceData = [
  { job: "Frontend Dev", views: 1240, applications: 89 },
  { job: "UX Designer", views: 980, applications: 67 },
  { job: "Product Mgr", views: 856, applications: 52 },
  { job: "Data Analyst", views: 720, applications: 41 },
  { job: "DevOps Eng", views: 650, applications: 38 },
  { job: "SecOps", views: 650, applications: 383 },
];

const AnalyticsCharts = () => {
  return (
    <div className="grid grid-cols-2 max-[992px]:grid-cols-1! gap-6">
      <Chart
        cardTitle="Başvuru Sahiplerinin Eğilimleri"
        cardDescription="Son 6 aydaki başvuru sayısı"
        cartesianGridHorizontal={false}
        xAxis={{
          dataKey: "month",
          axisLine: false,
          tickLine: false,
          tick: { fill: "oklch(0.556 0 0)", fontSize: 12 },
        }}
        yAxis={{
          axisLine: false,
          tickLine: false,
          tick: { fill: "oklch(0.556 0 0)", fontSize: 12 },
        }}
        chart={
          <AreaChart
            data={applicantTrendsData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorApplicants" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="oklch(0.55 0.18 250)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="oklch(0.55 0.18 250)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="applications"
              stroke="oklch(0.55 0.18 250)"
              strokeWidth={2}
              fill="url(#colorApplicants)"
              name="Başvuru"
            />
          </AreaChart>
        }
      />

      <Chart
        cardTitle="İş İlanı Performansı"
        cardDescription="İş ilanlarına göre görüntüleme sayısı ve başvuru sayısı"
        cartesianGridHorizontal={true}
        xAxis={{
          type: "number",
          axisLine: false,
          tickLine: false,
          tick: { fill: "oklch(0.5 0.02 250)", fontSize: 12 },
        }}
        yAxis={{
          type: "category",
          dataKey: "job",
          axisLine: false,
          tickLine: false,
          tick: { fill: "oklch(0.5 0.02 250)", fontSize: 11 },
          width: 100,
        }}
        chart={
          <BarChart
            data={jobPerformanceData}
            barGap={4}
            layout="vertical"
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <Bar
              dataKey="views"
              fill="oklch(0.65 0.15 180)"
              radius={[0, 4, 4, 0]}
              name="Görüntülenme"
            />
            <Bar
              dataKey="applications"
              fill="oklch(0.55 0.18 250)"
              radius={[0, 4, 4, 0]}
              name="Başvuru"
            />
          </BarChart>
        }
      />
    </div>
  );
};

export default AnalyticsCharts;
