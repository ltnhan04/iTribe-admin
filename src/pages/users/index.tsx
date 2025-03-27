import React, { useState } from "react";
import { Modal, message } from "antd";
import UserTable from "./components/UserTable";
import UserDetails from "./components/UserDetails";
import { User } from "./types";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      password: "hashed_password_1",
      phoneNumber: "+1234567890",
      address: "123 Main St, City, Country",
      role: "customer",
      created_at: "2024-01-15T10:30:00Z",
      orders: [
        {
          id: 1,
          user_id: 1,
          totalAmount: 2198,
          order_status: "pending",
          shippingAddress: "123 Main St, City, Country",
          paymentMethod: "stripe",
          stripeSessionId: "cs_test_123",
          created_at: "2024-03-15T10:30:00Z",
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
      ],
      reviews: [
        {
          id: 1,
          user_id: 1,
          product_variant_id: 1,
          rating: 5,
          comment: "Great product! Very satisfied with the purchase.",
          created_at: "2024-03-16T15:20:00Z",
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
    {
      id: 2,
      name: "Admin User",
      email: "admin@example.com",
      password: "hashed_password_2",
      phoneNumber: "+9876543210",
      address: "456 Admin St, City, Country",
      role: "admin",
      created_at: "2024-01-01T00:00:00Z",
      orders: [],
      reviews: [],
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane@example.com",
      password: "hashed_password_3",
      phoneNumber: "+1122334455",
      address: "789 Oak St, City, Country",
      role: "customer",
      created_at: "2024-02-01T15:45:00Z",
      orders: [
        {
          id: 2,
          user_id: 3,
          totalAmount: 1499,
          order_status: "processing",
          shippingAddress: "789 Oak St, City, Country",
          paymentMethod: "momo",
          created_at: "2024-03-15T11:45:00Z",
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
      ],
      reviews: [
        {
          id: 2,
          user_id: 3,
          product_variant_id: 3,
          rating: 4,
          comment: "Good laptop, but a bit expensive.",
          created_at: "2024-03-17T09:15:00Z",
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
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleEdit = (user: User) => {
    // TODO: Implement edit functionality
    message.info("Edit functionality will be implemented soon");
  };

  const handleDelete = (userId: number) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this user?",
      onOk: () => {
        setUsers(users.filter((user) => user.id !== userId));
        message.success("User deleted successfully");
      },
    });
  };

  return (
    <div className="p-6">
      <UserTable
        data={users}
        onViewDetails={handleViewDetails}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        title={`User Details: ${selectedUser?.name}`}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedUser(null);
        }}
        footer={null}
        width={1000}
      >
        {selectedUser && <UserDetails user={selectedUser} />}
      </Modal>
    </div>
  );
};

export default UsersPage;
