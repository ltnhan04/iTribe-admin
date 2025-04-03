import { Card, DatePicker, Row, Col, Statistic, Tabs } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { useState } from "react";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

// Generate fake data for different time periods
const generateFakeData = (days: number) => {
  const data = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: dayjs(date).format("DD/MM/YYYY"),
      revenue: Math.floor(Math.random() * 10000000) + 5000000,
    });
  }
  return data;
};

// Generate monthly data
const generateMonthlyData = (months: number) => {
  const data = [];
  const today = new Date();
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setMonth(date.getMonth() - i);
    data.push({
      date: dayjs(date).format("MM/YYYY"),
      revenue: Math.floor(Math.random() * 100000000) + 50000000,
    });
  }
  return data;
};

// Generate yearly data
const generateYearlyData = (years: number) => {
  const data = [];
  const today = new Date();
  for (let i = years - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setFullYear(date.getFullYear() - i);
    data.push({
      date: dayjs(date).format("YYYY"),
      revenue: Math.floor(Math.random() * 1000000000) + 500000000,
    });
  }
  return data;
};

function DashboardPage() {
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null
  );
  const [dailyData] = useState(generateFakeData(30));
  const [monthlyData] = useState(generateMonthlyData(12));
  const [yearlyData] = useState(generateYearlyData(5));

  const totalRevenue = dailyData.reduce((sum, item) => sum + item.revenue, 0);
  const averageRevenue = Math.floor(totalRevenue / dailyData.length);

  const items = [
    {
      key: "daily",
      label: "Daily",
      children: (
        <LineChart
          width={1200}
          height={400}
          data={dailyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [
              `$${value.toLocaleString()}`,
              "Revenue",
            ]}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#8884d8"
            name="Revenue"
            dot={false}
          />
        </LineChart>
      ),
    },
    {
      key: "monthly",
      label: "Monthly",
      children: (
        <BarChart
          width={1200}
          height={400}
          data={monthlyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [
              `$${value.toLocaleString()}`,
              "Revenue",
            ]}
          />
          <Legend />
          <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
        </BarChart>
      ),
    },
    {
      key: "yearly",
      label: "Yearly",
      children: (
        <BarChart
          width={1200}
          height={400}
          data={yearlyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [
              `$${value.toLocaleString()}`,
              "Revenue",
            ]}
          />
          <Legend />
          <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
        </BarChart>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title="Total Revenue"
                  value={totalRevenue}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Average Revenue"
                  value={averageRevenue}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
              </Col>
              <Col span={8}>
                <RangePicker
                  onChange={(dates) =>
                    setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])
                  }
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <Tabs defaultActiveKey="daily" items={items} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default DashboardPage;
