import React from "react";
import { Table, Tag, Select, Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Order, OrderStatus } from "../types";
import { formatCurrency } from "../../../utils/format-currency";

interface OrderTableProps {
  data: Order[];
  onViewDetails: (order: Order) => void;
  onUpdateStatus: (orderId: number, status: OrderStatus) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({
  data,
  onViewDetails,
  onUpdateStatus,
}) => {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "orange";
      case "processing":
        return "blue";
      case "shipped":
        return "cyan";
      case "delivered":
        return "green";
      case "cancel":
        return "red";
      default:
        return "default";
    }
  };

  const columns: ColumnsType<Order> = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Customer",
      dataIndex: ["user", "name"],
      key: "customer",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount: number) => formatCurrency(amount),
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
    {
      title: "Status",
      dataIndex: "order_status",
      key: "order_status",
      render: (status: OrderStatus) => (
        <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Processing", value: "processing" },
        { text: "Shipped", value: "shipped" },
        { text: "Delivered", value: "delivered" },
        { text: "Cancel", value: "cancel" },
      ],
      onFilter: (value, record) => record.order_status === value,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (method: string) => (
        <Tag color="blue">{method.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => new Date(date).toLocaleString(),
      sorter: (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        let availableStatuses: OrderStatus[] = [];
        switch (record.order_status) {
          case "pending":
            availableStatuses = ["processing", "cancel"];
            break;
          case "processing":
            availableStatuses = ["shipped", "cancel"];
            break;
          case "shipped":
            availableStatuses = ["delivered"];
            break;
          case "delivered":
          case "cancel":
            availableStatuses = [];
            break;
        }

        return (
          <Space>
            <Select
              defaultValue={record.order_status}
              style={{ width: 120 }}
              onChange={(value) => onUpdateStatus(record.id, value)}
              disabled={availableStatuses.length === 0}
            >
              {availableStatuses.map((status) => (
                <Select.Option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Select.Option>
              ))}
            </Select>
            <Button type="primary" onClick={() => onViewDetails(record)}>
              Details
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      bordered
    />
  );
};

export default OrderTable; 