import React, { useState } from "react";
import { Table, Button, Input, Badge } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { User } from "../types";

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8); // Items per page

  const columns: ColumnsType<User> = [
    {
      title: "ID",
      key: "id",
      render: (_: any, __: User, index: number) =>
        (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Member Name",
      dataIndex: "name",
      key: "name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: any) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Name"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) => {
        const searchValue = String(value).toLowerCase();
        return record.name.toLowerCase().includes(searchValue);
      },
      render: (text: string) => <Link to={`/users/${text}`}>{text}</Link>,
    },
    {
      title: "Mobile",
      dataIndex: "phoneNumber", // Updated field name to `phoneNumber`
      key: "phoneNumber",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: any) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Phone"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) => {
        const searchValue = String(value).toLowerCase();
        return record.mobile.toLowerCase().includes(searchValue); // Updated to `phoneNumber`
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      className: "font-medium",
      render: (active: boolean) => (
        <Badge
          color={active ? "green" : "red"}
          text={active ? "Active" : "Inactive"}
          className="font-medium"
        />
      ),
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (value, record) => record.active === value,
    },
    {
      title: "Action",
      key: "action",
      render: (user: User) => (
        <Link to={`/users/${user._id}`}>
          <Button
            type="link"
            icon={<EyeOutlined />}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 8px",
            }}
          >
            View
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
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
    </div>
  );
};

export default UsersTable;
