import React, { useEffect, useState } from 'react';
import {
    fetchDailyRevenue,
    fetchWeeklyRevenue,
    fetchYearlyRevenue,
    fetchTotalRevenue,
} from '../../api/services/revenua/revenuaApi';
import {
    DailyRevenue,
    WeeklyRevenue,
    YearlyRevenue,
    TotalRevenue,
} from './types';
import { Column, Line } from '@ant-design/charts';
import { Button } from 'antd'; // Import Button từ Ant Design
import '../../index.css'; 

const Revenue: React.FC = () => {
  
    const [dailyRevenue, setDailyRevenue] = useState<DailyRevenue[]>([]);
    const [weeklyRevenue, setWeeklyRevenue] = useState<WeeklyRevenue[]>([]);
    const [yearlyRevenue, setYearlyRevenue] = useState<YearlyRevenue[]>([]);
    const [totalRevenue, setTotalRevenue] = useState<TotalRevenue | null>(null);
    const [loading, setLoading] = useState(true);
    const [chartType, setChartType] = useState<string>('daily'); // Trạng thái để theo dõi loại biểu đồ đang hiển thị

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Lấy doanh thu theo ngày
                const dailyData = await fetchDailyRevenue();
                console.log('Daily Revenue Data:', dailyData);
                
                if (dailyData.data && dailyData.data.revenue) {
                    const revenue = dailyData.data.revenue;
                    const formattedDailyData = [
                        {
                            date: new Date(revenue.date),
                            totalSales: revenue.totalSales.toLocaleString(),
                            id: revenue._id,
                        }
                    ];
                    setDailyRevenue(formattedDailyData);
                } else {
                    console.error('No revenue data available for daily:', dailyData.data);
                    alert('No daily revenue data available.');
                }

                // Lấy doanh thu theo tuần
                const weeklyData = await fetchWeeklyRevenue();
                console.log('Weekly Revenue Data:', weeklyData);
                if (weeklyData.data && Array.isArray(weeklyData.data.result)) {
                    const formattedWeeklyData = weeklyData.data.result.map((rev: any) => ({
                        week: `${rev._id.month}-${rev._id.year}`, 
                        totalSales: rev.totalSales.toLocaleString(),
                    }));
                    setWeeklyRevenue(formattedWeeklyData);
                } else {
                    console.error('No weekly revenue data available:', weeklyData.data);
                    alert('No weekly revenue data available.');
                }

                // Lấy doanh thu theo năm
                const yearlyData = await fetchYearlyRevenue();
                console.log('Yearly Revenue Data:', yearlyData);
                if (yearlyData.data && Array.isArray(yearlyData.data.result)) {
                    const formattedYearlyData = yearlyData.data.result.map((rev: any) => ({
                        year: rev._id.year,
                        totalSales: rev.totalSales.toLocaleString(),
                    }));
                    setYearlyRevenue(formattedYearlyData);
                } else {
                    console.error('No yearly revenue data available:', yearlyData.data);
                    alert('No yearly revenue data available.');
                }

                // Lấy tổng doanh thu
                const totalData = await fetchTotalRevenue();
                console.log('Total Revenue Data:', totalData);
                if (totalData.data && Array.isArray(totalData.data.result) && totalData.data.result.length > 0) {
                    setTotalRevenue(totalData.data.result[0]); 
                } else {
                    console.error('No total revenue data available:', totalData.data);
                    alert('No total revenue data available.');
                }
            } catch (error) {
                console.error("Failed to fetch revenue data:", error);
                alert("Failed to load revenue data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Cấu hình cho các biểu đồ
    const dailyConfig = {
        data: dailyRevenue,
        xField: 'date',
        yField: 'totalSales',
        label: { position: 'top', style: { fill: '#FFFFFF', opacity: 0.6 } },
        xAxis: {
            title: { text: 'Date' },
            type: 'time',
            tickInterval: 24 * 60 * 60 * 1000, // Mỗi tick là 1 ngày
        },
        yAxis: { title: { text: 'Sales' } },
    };

    const weeklyConfig = {
        data: weeklyRevenue,
        xField: 'week',
        yField: 'totalSales',
        label: { position: 'top', style: { fill: '#FFFFFF', opacity: 0.6 } },
        xAxis: { title: { text: 'Week' } },
        yAxis: { title: { text: 'Sales' } },
    };

    const yearlyConfig = {
        data: yearlyRevenue,
        xField: 'year',
        yField: 'totalSales',
        label: { position: 'top', style: { fill: '#FFFFFF', opacity: 0.6 } },
        xAxis: { title: { text: 'Year' } },
        yAxis: { title: { text: 'Sales' } },
    };

    const totalRevenueConfig = {
        data: totalRevenue ? [{ name: 'Total Sales', value: totalRevenue.totalSales.toLocaleString() }] : [],
        xField: 'name',
        yField: 'value',
        label: { position: 'top', style: { fill: '#FFFFFF', opacity: 0.6 } },
        xAxis: { title: { text: 'Type' } },
        yAxis: { title: { text: 'Amount' } },
    };

    if (loading) {
        return <p>Loading revenue data...</p>;
    }

    return (
      <div>
        <h1 className='text-center font-bold text-xl'>Revenue Dashboard</h1>  
        
        {/* Nút điều hướng để chọn biểu đồ */}
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <Button 
                type={chartType === 'daily' ? 'primary' : 'default'} 
                className='mx-2 z-auto'
                onClick={() => setChartType('daily')}
            >
                Doanh thu theo ngày
            </Button>
            <Button 
                type={chartType === 'weekly' ? 'primary' : 'default'} 
                 className='mx-2'
                onClick={() => setChartType('weekly')}
            >
                Doanh thu theo tuần
            </Button>
            <Button 
                type={chartType === 'yearly' ? 'primary' : 'default'} 
                 className='mx-2'
                onClick={() => setChartType('yearly')}
            >
                Doanh thu theo năm
            </Button>
            <Button 
                type={chartType === 'total' ? 'primary' : 'default'} 
                 className='mx-2'
                onClick={() => setChartType('total')}
            >
                Tổng doanh thu
            </Button>
        </div>

        <div className="chart-container">
            <div className="chart-header">
                {chartType === 'daily' && 'Doanh thu theo ngày'}
                {chartType === 'weekly' && 'Doanh thu theo tuần'}
                {chartType === 'yearly' && 'Doanh thu theo năm'}
                {chartType === 'total' && 'Tổng doanh thu'}
            </div>
            {chartType === 'daily' && dailyRevenue.length ? <Column {...dailyConfig} /> : chartType === 'daily' && <p>Chưa có doanh thu ngày</p>}
            {chartType === 'weekly' && weeklyRevenue.length ? <Column {...weeklyConfig} /> : chartType === 'weekly' && <p>Chưa có doanh thu tuần</p>}
            {chartType === 'yearly' && yearlyRevenue.length ? <Column {...yearlyConfig} /> : chartType === 'yearly' && <p>Chưa có doanh thu năm</p>}
            {chartType === 'total' && totalRevenue ? (
                <Column {...totalRevenueConfig} />
            ) : chartType === 'total' && (
                <p>Chưa có tổng doanh thu</p>
            )}
        </div>
    </div>
    );
};

export default Revenue;
