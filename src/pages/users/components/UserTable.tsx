import React from "react";
import { Table, Tag, Button, Space, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { User, UserRole } from "../types";
import { formatCurrency } from "../../../utils/format-currency";

interface UserTableProps {
  data: User[];
  onViewDetails: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  data,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  const getRoleColor = (role: UserRole) => {
    return role === "admin" ? "red" : "blue";
  };

  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: UserRole) => (
        <Tag color={getRoleColor(role)}>{role.toUpperCase()}</Tag>
      ),
      filters: [
        { text: "Customer", value: "customer" },
        { text: "Admin", value: "admin" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Total Orders",
      key: "totalOrders",
      render: (_, record) => record.orders.length,
      sorter: (a, b) => a.orders.length - b.orders.length,
    },
    {
      title: "Total Spent",
      key: "totalSpent",
      render: (_, record) =>
        formatCurrency(
          record.orders.reduce((sum, order) => sum + order.totalAmount, 0)
        ),
      sorter: (a, b) =>
        a.orders.reduce((sum, order) => sum + order.totalAmount, 0) -
        b.orders.reduce((sum, order) => sum + order.totalAmount, 0),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => new Date(date).toLocaleString(),
      sorter: (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button type="primary" onClick={() => onViewDetails(record)}>
              Details
            </Button>
          </Tooltip>
          <Tooltip title="Edit User">
            <Button onClick={() => onEdit(record)}>Edit</Button>
          </Tooltip>
          <Tooltip title="Delete User">
            <Button danger onClick={() => onDelete(record.id)}>
              Delete
            </Button>
          </Tooltip>
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
      bordered
    />
  );
};

export default UserTable; 