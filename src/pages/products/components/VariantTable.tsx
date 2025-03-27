/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Table, Button, Space, Badge } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ProductVariant } from "../types";

interface VariantTableProps {
  data: ProductVariant[];
  onViewDetails: (variant: ProductVariant) => void;
  onEdit: (variant: ProductVariant) => void;
  onDelete: (id: number) => void;
}

const VariantTable: React.FC<VariantTableProps> = ({
  data,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Storage",
      dataIndex: "storage",
      key: "storage",
      width: 120,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 120,
      render: (price: number) => `$${price.toLocaleString()}`,
    },
    {
      title: "Stock",
      dataIndex: "stock_quantity",
      key: "stock_quantity",
      width: 100,
      render: (quantity: number) => (
        <Badge status={quantity > 0 ? "success" : "error"} text={quantity} />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: string) => (
        <Badge
          status={status === "in_stock" ? "success" : "error"}
          text={status === "in_stock" ? "In Stock" : "Out of Stock"}
        />
      ),
    },
    {
      title: "Actions",
      key: "action",
      width: 200,
      render: (_: any, record: ProductVariant) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => onViewDetails(record)}
          >
            Details
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default VariantTable;
