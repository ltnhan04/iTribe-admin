/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Tag, Select, Button } from "antd";
import { formatCurrency } from "../../../utils/format-currency";
import { useState } from "react";
import { Order } from "../../../types/order";

function OrderList() {
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      sorter: (a: Order, b: Order) => a.orderId.localeCompare(b.orderId),
    },
    {
      title: "User Name",
      dataIndex: ["user", "name"],
      key: "userName",
      sorter: (a: Order, b: Order) =>
        a.user?.name.localeCompare(b.user?.name || ""),
    },
    {
      title: "Products",
      dataIndex: "productVariants",
      key: "products",
      render: (productVariants: Product[]) =>
        productVariants.map((product) => (
          <Tag key={product.productVariantId} color="blue">
            {product.productName} (x{product.quantity})
          </Tag>
        )),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount: number) => formatCurrency(amount),
      sorter: (a: Order, b: Order) => a.totalAmount - b.totalAmount,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Order) => {
        let availableStatus: string[] = [];
        switch (record.status) {
          case "pending":
            availableStatus = ["processing", "cancel"];
            break;
          case "processing":
            availableStatus = ["shipped", "cancel"];
            break;
          case "shipped":
          case "cancel":
            availableStatus = [];
            break;
          default:
            availableStatus = [];
            break;
        }

        return (
          <Select
            defaultValue={record.status}
            style={{ width: 120 }}
            onChange={(value) => handleUpdateStatus(record.orderId, value)}
            disabled={availableStatus.length === 0}
          >
            {availableStatus.map((status) => (
              <Select.Option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: "Detail",
      key: "detail",
      render: (record: Order) => (
        <Button type="primary" onClick={() => {}}>
          Detail
        </Button>
      ),
    },
  ];
  return (
    <Table
      loading={isLoading}
      columns={columns as any}
      dataSource={filteredOrders}
      rowKey="orderId"
      pagination={{ pageSize: 5 }}
      bordered
    />
  );
}

export default OrderList;
