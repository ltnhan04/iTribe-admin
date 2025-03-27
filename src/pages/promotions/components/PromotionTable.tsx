import React from "react";
import { Table, Button, Space, Badge, Tag } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Promotion, Category } from "../types";
import dayjs from "dayjs";

interface PromotionTableProps {
  data: Promotion[];
  categories: Category[];
  onViewDetails: (promotion: Promotion) => void;
  onEdit: (promotion: Promotion) => void;
  onDelete: (id: number) => void;
}

const PromotionTable: React.FC<PromotionTableProps> = ({
  data,
  categories,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  const columns: ColumnsType<Promotion> = [
    {
      title: "Promotion Code",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Discount Type",
      dataIndex: "discount_type",
      key: "discount_type",
      render: (type: string) => (
        <Tag color={type === "percentage" ? "blue" : "green"}>
          {type === "percentage" ? "Percentage" : "Amount"}
        </Tag>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "valid_from",
      key: "valid_from",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
      sorter: (a, b) => new Date(a.valid_from).getTime() - new Date(b.valid_from).getTime(),
    },
    {
      title: "End Date",
      dataIndex: "valid_to",
      key: "valid_to",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
      sorter: (a, b) => new Date(a.valid_to).getTime() - new Date(b.valid_to).getTime(),
    },
    {
      title: "Applicable Category",
      dataIndex: "applicable_category_id",
      key: "applicable_category_id",
      render: (categoryId: number) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.name : "Not specified";
      },
    },
    {
      title: "Usage Count",
      dataIndex: "usedCount",
      key: "usedCount",
      render: (usedCount: number, record: Promotion) => (
        <span>
          {usedCount}/{record.maxUsage}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (isActive: boolean) => (
        <Badge status={isActive ? "success" : "default"} text={isActive ? "Active" : "Inactive"} />
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_: any, record: Promotion) => (
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
      pagination={{ pageSize: 10 }}
      className="bg-white rounded-lg shadow"
    />
  );
};

export default PromotionTable; 