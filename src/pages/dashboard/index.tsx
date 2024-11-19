import React, { useEffect, useState } from 'react';
import { Column,Pie  } from '@ant-design/charts';
import { Button } from 'antd';
import '../../index.css';
import { fetchDailyRevenue,fetchTotalRevenue } from '../../api/services/revenue/revenueApi';

const Revenue: React.FC = () => {
    const [dailyRevenue, setDailyRevenue] = useState<any[]>([]);
    const [, setTotalRevenue] = useState<any | null>(null);
    const [productRevenue, setProductRevenue] = useState<any[]>([]); // Thêm state cho doanh thu theo sản phẩm
    const [loading, setLoading] = useState(true);
    const [chartType, setChartType] = useState<string>('daily'); // Trạng thái biểu đồ

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Fetch doanh thu theo ngày
                const dailyData = await fetchDailyRevenue();
                if (dailyData.data && dailyData.data.revenue) {
                    const revenue = dailyData.data.revenue;
                    const formattedDailyData = [
                        {
                            date: new Date(revenue.date),
                            totalSales: revenue.totalSales,
                        },
                    ];
                    setDailyRevenue(formattedDailyData);
                }
                const totalData = await fetchTotalRevenue();
                if (totalData.data && Array.isArray(totalData.data.result) && totalData.data.result.length > 0) {
                    setTotalRevenue(totalData.data.result[0]);
                }
                // Fetch doanh thu theo sản phẩm
                const productData = await fetch('http://localhost:8000/api/admin/revenue/product');
                const productRevenueData = await productData.json();
                if (productRevenueData.result && Array.isArray(productRevenueData.result)) {
                    setProductRevenue(productRevenueData.result);
                }

            } catch (error) {
                console.error('Failed to fetch revenue data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);
    // Xử lý dữ liệu cho 3 ngày gần nhất (cách 1 ngày)
    const getLast3DaysData = () => {
      const today = new Date();
      const filteredData = [];
      for (let i = 2; i >= 0; i--) {
          const date = new Date();
          date.setDate(today.getDate() - i);
          const formattedDate = date.toISOString().split('T')[0]; 
          const dataForDate = dailyRevenue.find(
              (item) => new Date(item.date).toISOString().split('T')[0] === formattedDate
          );
          filteredData.push({
              date: formattedDate,
              totalSales: dataForDate ? dataForDate.totalSales : 0, 
          });
      }
      return filteredData;
  };

  // Xử lý dữ liệu cho 7 ngày trong tuần bắt đầu từ thứ Hai
  const getLast7DaysData = () => {
      const today = new Date();
      const currentDayOfWeek = today.getDay(); 
      const monday = new Date(today);
      monday.setDate(today.getDate() - currentDayOfWeek + 1); 
      const filteredData = [];
      for (let i = 0; i < 7; i++) {
          const date = new Date(monday);
          date.setDate(monday.getDate() + i); 
          const formattedDate = date.toISOString().split('T')[0]; 
          const dataForDate = dailyRevenue.find(
              (item) => new Date(item.date).toISOString().split('T')[0] === formattedDate
          );
          filteredData.push({
              date: formattedDate,
              totalSales: dataForDate ? dataForDate.totalSales : 0, 
          });
      }
      return filteredData;
  };
    const getColorBySales = (totalSales: number) => {
        if (totalSales < 100000) return '#f39c12';
        if (totalSales < 500000) return '#e67e22';
        return '#2ecc71'; 
    };
    const productRevenueConfig = {
      data: productRevenue,
      angleField: 'totalSales',  // Trường tổng doanh thu
      colorField: 'name',  // Trường tên sản phẩm
      radius: 0.8,  // Kích thước của vòng tròn
      color: (datum: any) => getColorBySales(datum.totalSales),
      label: { 
          type: 'inner', 
          content: '{name} {percentage}',  // Hiển thị tên và tỷ lệ phần trăm
          style: { fill: '#fff', fontSize: 14 },
      },
      legend: {
          position: 'top',
      },
      statistic: {
          title: {
              style: { fontSize: '16px' },
          },
          content: {
              formatter: (value: any) => `${value} $`,  // Định dạng tổng doanh thu
          },
      },
  };

    const dailyConfig = {
        data: dailyRevenue,
        xField: 'date',
        yField: 'totalSales',
        color: (datum: any) => getColorBySales(datum.totalSales),
        label: { position: 'top', style: { fill: '#FFFFFF', opacity: 0.6 } },
        xAxis: { title: { text: 'Date' }, type: 'time' },
        yAxis: { title: { text: 'Sales' } },
    };

    const last3DaysConfig = {
        data: getLast3DaysData(),
        xField: 'date',
        yField: 'totalSales',
        color: (datum: any) => getColorBySales(datum.totalSales),
        label: { position: 'top', style: { fill: '#FFFFFF', opacity: 0.6 } },
        xAxis: { title: { text: 'Date' }, type: 'time' },
        yAxis: { title: { text: 'Sales' } },
    };

    const last7DaysConfig = {
        data: getLast7DaysData(),
        xField: 'date',
        yField: 'totalSales',
        color: (datum: any) => getColorBySales(datum.totalSales),
        label: { position: 'top', style: { fill: '#FFFFFF', opacity: 0.6 } },
        xAxis: { title: { text: 'Date' }, type: 'time' },
        yAxis: { title: { text: 'Sales' } },
    };

    if (loading) {
        return <p>Loading revenue data...</p>;
    }

    return (
        <div>
            <h1 className="text-center font-bold text-xl">Revenue Dashboard</h1>

            {/* Nút điều hướng */}
            <div style={{ textAlign: 'center', margin: '20px' }}>
                <Button type={chartType === 'daily' ? 'primary' : 'default'} onClick={() => setChartType('daily')}>
                    Doanh thu theo ngày
                </Button>
                <Button type={chartType === '3days' ? 'primary' : 'default'} onClick={() => setChartType('3days')}>
                    Doanh thu 3 ngày gần nhất
                </Button>
                <Button type={chartType === '7days' ? 'primary' : 'default'} onClick={() => setChartType('7days')}>
                    Doanh thu 7 ngày trong tuần
                </Button>
                <Button type={chartType === 'product' ? 'primary' : 'default'} onClick={() => setChartType('product')}>
                    Doanh thu theo sản phẩm
                </Button>
            </div>

            <div className="chart-container">
                {chartType === 'daily' && <Column {...dailyConfig} />}
                {chartType === '3days' && <Column {...last3DaysConfig} />}
                {chartType === '7days' && <Column {...last7DaysConfig} />}
                {chartType === 'product' && <Pie {...productRevenueConfig} />}
            </div>
        </div>
    );
};

export default Revenue;
