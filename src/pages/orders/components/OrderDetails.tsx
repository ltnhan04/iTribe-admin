import React from "react";
import { Card, Descriptions, Table, Tag, Image, Carousel } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Order, OrderDetails as OrderDetailsType } from "../types";
import { formatCurrency } from "../../../utils/format-currency";

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
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

  const columns: ColumnsType<OrderDetailsType> = [
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
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => formatCurrency(price),
    },
    {
      title: "Total",
      key: "total",
      render: (_, record) => formatCurrency(record.price * record.quantity),
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
      <Card title="Order Information" className="bg-white rounded-lg shadow">
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Order ID">{order.id}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={getStatusColor(order.order_status)}>
              {order.order_status.toUpperCase()}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Total Amount">
            {formatCurrency(order.totalAmount)}
          </Descriptions.Item>
          <Descriptions.Item label="Payment Method">
            <Tag color="blue">{order.paymentMethod.toUpperCase()}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Shipping Address">
            {order.shippingAddress}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {new Date(order.created_at).toLocaleString()}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Customer Information" className="bg-white rounded-lg shadow">
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Name">{order.user.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{order.user.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{order.user.phone}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Order Items" className="bg-white rounded-lg shadow">
        <Table
          columns={columns}
          dataSource={order.order_details}
          rowKey="id"
          pagination={false}
          bordered
        />
      </Card>
    </div>
  );
};

export default OrderDetails; 