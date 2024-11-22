import { useEffect, useState } from "react";
import { Card, message, Tabs } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  fetchDailyRevenue,
  fetchTotalProduct,
  fetchTotalRevenue,
  revenueLastDays,
} from "../../api/services/revenue/revenueApi";
import { COLORS } from "../../constants";
import { formatCurrency } from "../../utils/format-currency";
import type { ProductVariant, Detail } from "./types";
import Loading from "../../loading";

interface ErrorType {
  response: {
    data: {
      error: string;
    };
  };
}

export default function RevenueDashboard() {
  const [oneDayData, setOneDayData] = useState<ProductVariant[]>([]);
  const [multiDayData, setMultiDayData] = useState<Detail[]>([]);
  const [totalRevenueData, setTotalRevenueData] = useState<Detail[]>([]);
  const [totalProductData, setTotalProductData] = useState<Detail[]>([]);
  const [days, setDays] = useState<number>(3);
  const [isLoading, setIsLoading] = useState(false);

  const getOneDayData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchDailyRevenue();
      if (response.status === 200) {
        setOneDayData(response.data.revenue.productVariants);
      }
    } catch (error: unknown) {
      const typedError = error as ErrorType;
      const errorMsg = typedError?.response?.data?.error;
      message.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const getLastDaysData = async (days: number) => {
    try {
      const response = await revenueLastDays(days);
      if (response.status === 200) {
        setMultiDayData(response.data.details);
      }
    } catch (error: unknown) {
      const typedError = error as ErrorType;
      const errorMsg = typedError?.response?.data?.error;
      message.error(errorMsg);
    }
  };

  const getTotalRevenue = async () => {
    try {
      const response = await fetchTotalRevenue();
      if (response.status === 200) {
        setTotalRevenueData(response.data.details);
      }
    } catch (error: unknown) {
      const typedError = error as ErrorType;
      const errorMsg = typedError?.response?.data?.error;
      message.error(errorMsg);
    }
  };

  const getTotalProduct = async () => {
    try {
      const response = await fetchTotalProduct();
      if (response.status === 200) {
        setTotalProductData(response.data.result);
      }
    } catch (error: unknown) {
      const typedError = error as ErrorType;
      const errorMsg = typedError?.response?.data?.error;
      message.error(errorMsg);
    }
  };

  const handleTabChange = (key: string) => {
    const selectedDays = key === "3days" ? 3 : 7;
    setDays(selectedDays);
    getLastDaysData(selectedDays);
  };

  useEffect(() => {
    getOneDayData();
    getLastDaysData(days);
    getTotalProduct();
    getTotalRevenue();
  }, [days]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto">
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="1-Day Revenue" bordered={true}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={oneDayData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                width={100}
                tickFormatter={(value) => `${formatCurrency(value)}`}
              />
              <Tooltip
                formatter={(value) => `${formatCurrency(Number(value))}`}
              />
              <Legend />
              <Bar dataKey="totalSales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="3-Day and 7-Day Revenue" bordered={true}>
          <Tabs
            defaultActiveKey="3days"
            onChange={handleTabChange}
            items={[
              {
                key: "3days",
                label: "3 Days",
                children: (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={multiDayData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis
                        width={100}
                        tickFormatter={(value) => `${formatCurrency(value)}`}
                      />
                      <Tooltip
                        formatter={(value) =>
                          `${formatCurrency(Number(value))}`
                        }
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="totalSales"
                        stroke="#8884d8"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ),
              },
              {
                key: "7days",
                label: "7 Days",
                children: (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={multiDayData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis
                        width={100}
                        tickFormatter={(value) => `${formatCurrency(value)}`}
                      />
                      <Tooltip
                        formatter={(value) =>
                          `${formatCurrency(Number(value))}`
                        }
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="totalSales"
                        stroke="#8884d8"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ),
              },
            ]}
          />
        </Card>

        <Card title="Total Revenue by Product" bordered={true}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={totalProductData}
                cx="50%"
                cy="50%"
                labelLine={true}
                width={220}
                outerRadius={80}
                fill="#8884d8"
                dataKey="totalSales"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {totalRevenueData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${formatCurrency(Number(value))}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Revenue by Product" bordered={true}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={totalRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                width={100}
                yAxisId="left"
                tickFormatter={(value) => `${formatCurrency(value)}`}
              />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value, name) =>
                  name === "totalSales"
                    ? `${formatCurrency(Number(value))}`
                    : value
                }
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="totalSales"
                fill="#8884d8"
                name="Total Sales"
              />
              <Bar
                yAxisId="right"
                dataKey="totalOrders"
                fill="#82ca9d"
                name="Total Orders"
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
