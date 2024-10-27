import React, { useEffect, useState } from 'react';
import { Table, Tag, Select, message } from 'antd';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateAccessToken } from '../../redux/features/authentication/authSlice';
import { refreshToken } from '../../api/services/auth/authApi';

interface Product {
  productId: string;
  productName: string;
  productColor: string;
  productStorage: string;
  quantity: number;
}

interface User {
  id: string;
  name: string;
}

interface Order {
  orderId: string;
  user: User;
  products: Product[];
  totalAmount: number;
  status: string;
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  let isRefreshing = false;
  let failedQueue: any[] = [];

  const processQueue = (error: any, token: string | null) => {
    failedQueue.forEach((cb) => {
      if (token) {
        cb.resolve(token);
      } else {
        cb.reject(error);
      }
    });
    failedQueue = [];
  };

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const response = await refreshToken();
          const newAccessToken = response.data.accessToken;
          dispatch(updateAccessToken(newAccessToken));
          processQueue(null, newAccessToken);
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (error) {
          processQueue(error, null);
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/api/orders'); 
        setOrders(response.data.orders);
      } catch (error) {
        message.error('Error fetching orders');
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [accessToken]);

  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
    
      await axiosInstance.put(`/api/admin/orders/${orderId}`, { status });
      message.success('Order status updated successfully!');
   
      const updatedOrders = orders.map(order => 
        order.orderId === orderId ? { ...order, status } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      message.error('Failed to update order status');
      console.error('Failed to update order status:', error);
    }
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'User Name',
      dataIndex: ['user', 'name'],
      key: 'userName',
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      render: (products: Product[]) => (
        <>
          {products.map(product => (
            <Tag key={product.productId}>
              {product.productName} (x{product.quantity})
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        
        const color = status === 'delivered' ? 'green' 
                     : status === 'processing' ? 'blue' 
                     : status === 'pending' ? 'orange' 
                     : 'volcano'; 
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: { status: any; orderId: string; }) => (
        <Select
          defaultValue={record.status}
          style={{ width: 120 }}
          onChange={(value) => handleUpdateStatus(record.orderId, value)}
          dropdownStyle={{ zIndex: 1000 }} 
        >
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="processing">Processing</Select.Option>
          <Select.Option value="shipped">Shipped</Select.Option>
          <Select.Option value="delivered">Delivered</Select.Option>
          <Select.Option value="cancel">Cancel</Select.Option>
        </Select>
      ),
    },
  ];

  return (
    <Table
      dataSource={orders}
      columns={columns}
      loading={loading}
      rowKey="orderId"
    />
  );
};

export default OrderList;