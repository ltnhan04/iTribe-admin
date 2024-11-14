import React, { useEffect, useState } from "react";
import { Table, Tag, Select, message } from "antd";
import { Product, Order, ErrorResponse } from "./types";
import {
  getOrders,
  updateOrderStatus,
} from "../../api/services/order/orderApi";
import { formatCurrency } from "../../utils/format-currency";

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await getOrders();
        console.log(response.data);
        setOrders(response.data.orders);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        message.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
      const response = await updateOrderStatus(orderId, status);
      if (response.data.message) {
        message.success(response.data.message);
      }

      const updatedOrders = orders.map((order) =>
        order.orderId === orderId ? { ...order, status } : order
      );
      setOrders(updatedOrders);
    } catch (error: unknown) {
      const typedError = error as ErrorResponse;
      const errorMsg =
        typedError.response.data.message || "Đã xảy ra lỗi! Vui lòng thử lại.";
      message.error(errorMsg);
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "User Name",
      dataIndex: ["user", "name"],
      key: "userName",
    },
    {
      title: "Products",
      dataIndex: "productVariants",
      key: "products",
      render: (productVariants: Product[]) => (
        <>
          {productVariants.map((product) => (
            <Tag key={product.productVariantId}>
              {product.productName} (x{product.quantity})
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "delivered"
            ? "green"
            : status === "processing"
            ? "blue"
            : status === "pending"
            ? "orange"
            : "volcano";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: { status: string; orderId: string }) => (
        <Select
          defaultValue={record.status}
          style={{ width: 120 }}
          onChange={(value) => handleUpdateStatus(record.orderId, value)}
          dropdownStyle={{ zIndex: 1000 }}
        >
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="processing">Processing</Select.Option>
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
      loading={isLoading}
      rowKey="orderId"
    />
  );
};

export default OrderList;
