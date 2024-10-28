

// export default UsersTable;
import React from "react";
import { Table, Button, Space } from "antd";
import { CopyOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { User } from "./types";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const columns = [
    {
      title: "Member Name",
      dataIndex: "name",
      render: (text: string, user: User) => (
        <Link to={`/users/${user.id}`}>{text}</Link> // Link to user detail page
      ),
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <span style={{ color: status === "Active" ? "green" : "gray" }}>{status}</span>
      ),
    },
    {
      title: "Operation",
      render: () => (
        <Space>
          <CopyOutlined style={{ cursor: "pointer" }} />
          <EditOutlined style={{ cursor: "pointer" }} />
          <DeleteOutlined style={{ cursor: "pointer" }} />
        </Space>
      ),
    },
    {
      title: "Action",
      render: (text: string, user: User) => (
        <Link to={`/users/${user.id}`}>
          <Button type="primary">Detail</Button>
        </Link>
      ),
    },
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      rowKey="id"
      pagination={false}
      bordered
    />
  );
};

export default UsersTable;
