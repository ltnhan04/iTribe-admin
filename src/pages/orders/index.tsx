/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Modal, message } from "antd";
import OrderTable from "./components/OrderTable";
import OrderDetails from "./components/OrderDetails";
import OrderFilters from "./components/OrderFilters";
import { Order, OrderStatus } from "./types";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      user_id: 1,
      totalAmount: 2198,
      order_status: "pending",
      shippingAddress: "123 Main St, City, Country",
      paymentMethod: "stripe",
      stripeSessionId: "cs_test_123",
      created_at: "2024-03-15T10:30:00Z",
      user: {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
      },
      order_details: [
        {
          id: 1,
          order_id: 1,
          product_variant_id: 1,
          quantity: 1,
          price: 999,
          product_variant: {
            id: 1,
            name: "iPhone 15 Pro",
            storage: "128GB",
            color: "Black",
            price: 999,
            images: [
              "https://example.com/iphone15pro-1.jpg",
              "https://example.com/iphone15pro-2.jpg",
            ],
          },
        },
        {
          id: 2,
          order_id: 1,
          product_variant_id: 2,
          quantity: 1,
          price: 1199,
          product_variant: {
            id: 2,
            name: "iPhone 15 Pro",
            storage: "256GB",
            color: "White",
            price: 1199,
            images: [
              "https://example.com/iphone15pro-3.jpg",
              "https://example.com/iphone15pro-4.jpg",
            ],
          },
        },
      ],
    },
    {
      id: 2,
      user_id: 2,
      totalAmount: 1499,
      order_status: "processing",
      shippingAddress: "456 Oak St, City, Country",
      paymentMethod: "momo",
      created_at: "2024-03-15T11:45:00Z",
      user: {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+9876543210",
      },
      order_details: [
        {
          id: 3,
          order_id: 2,
          product_variant_id: 3,
          quantity: 1,
          price: 1499,
          product_variant: {
            id: 3,
            name: "MacBook Pro",
            storage: "512GB",
            color: "Space Gray",
            price: 1499,
            images: [
              "https://example.com/macbook-1.jpg",
              "https://example.com/macbook-2.jpg",
            ],
          },
        },
      ],
    },
    {
      id: 3,
      user_id: 3,
      totalAmount: 999,
      order_status: "shipped",
      shippingAddress: "789 Pine St, City, Country",
      paymentMethod: "ship-cod",
      created_at: "2024-03-14T15:20:00Z",
      user: {
        id: 3,
        name: "Mike Johnson",
        email: "mike@example.com",
        phone: "+1122334455",
      },
      order_details: [
        {
          id: 4,
          order_id: 3,
          product_variant_id: 1,
          quantity: 1,
          price: 999,
          product_variant: {
            id: 1,
            name: "iPhone 15 Pro",
            storage: "128GB",
            color: "Black",
            price: 999,
            images: [
              "https://example.com/iphone15pro-1.jpg",
              "https://example.com/iphone15pro-2.jpg",
            ],
          },
        },
      ],
    },
  ]);

  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleUpdateStatus = (orderId: number, status: OrderStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, order_status: status } : order
      )
    );
    setFilteredOrders(
      filteredOrders.map((order) =>
        order.id === orderId ? { ...order, order_status: status } : order
      )
    );
    message.success("Order status updated successfully");
  };

  const handleFilter = (filters: any) => {
    let filtered = [...orders];

    // Search filter
    if (filters.search) {
      const searchValue = filters.search.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.id.toString().includes(searchValue) ||
          order.user.name.toLowerCase().includes(searchValue) ||
          order.user.email.toLowerCase().includes(searchValue)
      );
    }

    // Status filter
    if (filters.order_status) {
      filtered = filtered.filter(
        (order) => order.order_status === filters.order_status
      );
    }

    // Payment method filter
    if (filters.paymentMethod) {
      filtered = filtered.filter(
        (order) => order.paymentMethod === filters.paymentMethod
      );
    }

    // Date range filter
    if (filters.dateRange) {
      const { start, end } = filters.dateRange;
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.created_at);
        const startDate = new Date(start);
        const endDate = new Date(end);
        return orderDate >= startDate && orderDate <= endDate;
      });
    }

    setFilteredOrders(filtered);
  };

  const handleResetFilters = () => {
    setFilteredOrders(orders);
  };

  return (
    <div className="p-6">
      <OrderFilters onFilter={handleFilter} onReset={handleResetFilters} />

      <OrderTable
        data={filteredOrders}
        onViewDetails={handleViewDetails}
        onUpdateStatus={handleUpdateStatus}
      />

      <Modal
        title={`Order Details #${selectedOrder?.id}`}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedOrder(null);
        }}
        footer={null}
        width={1000}
      >
        {selectedOrder && <OrderDetails order={selectedOrder} />}
      </Modal>
    </div>
  );
};

export default OrdersPage;
