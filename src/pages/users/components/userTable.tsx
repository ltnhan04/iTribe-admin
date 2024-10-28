

// export default UsersTable;
import React from "react";
import { Table, Button } from "antd";
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
        <Link to={`/users/${user._id}`}>{text}</Link> // Link to user detail page
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
      render: (text: string, user: User) => (
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
      rowKey="id"
      pagination={false}
      bordered
    />
  );
};

export default UsersTable;
