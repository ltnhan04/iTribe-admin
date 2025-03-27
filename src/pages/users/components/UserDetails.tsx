import React from "react";
import { Card, Descriptions, Table, Tag, Rate, Image, Carousel } from "antd";
import type { ColumnsType } from "antd/es/table";
import { User, Review, Order } from "../types";
import { formatCurrency } from "../../../utils/format-currency";

interface UserDetailsProps {
  user: User;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  const getRoleColor = (role: string) => {
    return role === "admin" ? "red" : "blue";
  };

  const getStatusColor = (status: string) => {
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

  const orderColumns: ColumnsType<Order> = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: "Status",
      dataIndex: "order_status",
      key: "order_status",
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
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
    },
    {
      title: "Items",
      key: "items",
      render: (_, record) => (
        <div>
          {record.order_details.map((detail) => (
            <div key={detail.id}>
              {detail.product_variant.name} ({detail.quantity}x) -{" "}
              {formatCurrency(detail.price)}
            </div>
          ))}
        </div>
      ),
    },
  ];

  const reviewColumns: ColumnsType<Review> = [
    {
      title: "Product",
      dataIndex: ["product_variant", "name"],
      key: "product",
    },
    {
      title: "Storage",
      dataIndex: ["product_variant", "storage"],
      key: "storage",
    },
    {
      title: "Color",
      dataIndex: ["product_variant", "color"],
      key: "color",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Images",
      key: "images",
      render: (_, record) => (
        <div style={{ width: 100 }}>
          <Carousel autoplay>
            {record.product_variant.images.map((image, index) => (
              <div key={index}>
                <Image
                  src={image}
                  alt={`Product image ${index + 1}`}
                  width={80}
                  height={80}
                  preview={true}
                />
              </div>
            ))}
          </Carousel>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Card title="User Information" className="bg-white rounded-lg shadow">
        <Descriptions bordered column={2}>
          <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
          <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{user.phoneNumber}</Descriptions.Item>
          <Descriptions.Item label="Address">{user.address}</Descriptions.Item>
          <Descriptions.Item label="Role">
            <Tag color={getRoleColor(user.role)}>{user.role.toUpperCase()}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {new Date(user.created_at).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Total Orders">
            {user.orders.length}
          </Descriptions.Item>
          <Descriptions.Item label="Total Spent">
            {formatCurrency(
              user.orders.reduce((sum, order) => sum + order.totalAmount, 0)
            )}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Order History" className="bg-white rounded-lg shadow">
        <Table
          columns={orderColumns}
          dataSource={user.orders}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
        />
      </Card>

      <Card title="Reviews" className="bg-white rounded-lg shadow">
        <Table
          columns={reviewColumns}
          dataSource={user.reviews}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
        />
      </Card>
    </div>
  );
};

export default UserDetails; 