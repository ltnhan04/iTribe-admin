
import React, { useState } from "react";
import { Table, Button } from "antd";
import { User } from "../types";
import { Link } from "react-router-dom";

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4); // Items per page

  const columns = [
    {
      title: "Member Name",
      dataIndex: "name",
      render: (text: string, user: User) => (
        <Link to={`/users/${user._id}`}>{text}</Link>
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
      title: "Action",
      render: (user: User) => (
        <Link to={`/users/${user._id}`}>
          <Button type="primary">Detail</Button>
        </Link>
      ),
    },
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      rowKey="_id"
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        onChange: (page, pageSize) => {
          setCurrentPage(page);
          setPageSize(pageSize || 10); // Handle undefined pageSize
        },
      }}
      bordered
    />
  );
};

export default UsersTable;
