
// export default UserDetailPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User, Order, ProductVariant } from "../types";
import { Spin, Pagination, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  getUserDetails,
  getUserOrders,
  getProductVariantDetail,
  banUser,
  unBanUser,
} from "../../../api/services/users/usersApi";
import { formatCurrency } from "../../../utils/format-currency";

const UserDetailPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const [orderDetails, setOrderDetails] = useState<{ [key: string]: ProductVariant[] }>({});

  useEffect(() => {
    if (!userId) return;

    const fetchUserDetails = async () => {
      try {
        const userResponse = await getUserDetails(userId);
        setUser(userResponse.data);
      } catch (error) {
        console.error(error);
        message.error("Failed to fetch user details.");
      }
    };

    const fetchUserOrders = async () => {
      try {
        const ordersResponse = await getUserOrders(userId);
        setOrders(ordersResponse.data.orderHistory || []);
        const orderVariants: { [key: string]: ProductVariant[] } = {};

        // for (const order of ordersResponse.data.orderHistory) {
        //   await Promise.all(
        //     order.productVariants.map(async (productItem: any) => {
        //       try {
        //         const variantId = productItem.productVariant;
        //         if (variantId) {
        //           const response = await getProductVariantDetail(variantId);
        //           orderVariants[order._id] = orderVariants[order._id] || [];
        //           orderVariants[order._id].push(response.data.productVariant);
        //         }
        //       } catch (error) {
        //         console.error("Error fetching product variant details:", error);
        //       }
        //     })
        //   );
        // }
        for (const order of ordersResponse.data.orderHistory) {
          await Promise.all(
            order.productVariants.map(async (productItem: any) => {
              try {
                const variantId = productItem.productVariant._id; // Extracting _id from the productVariant object
                if (variantId) {
                  const response = await getProductVariantDetail(variantId);
                  orderVariants[order._id] = orderVariants[order._id] || [];
                  orderVariants[order._id].push(response.data.productVariant);
                }
              } catch (error) {
                console.error("Error fetching product variant details:", error);
              }
            })
          );
        }
        setOrderDetails(orderVariants);
      } catch (error) {
        console.error(error);
        message.error("Failed to fetch user orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
    fetchUserOrders();
  }, [userId]);

  const handleBanUser = async () => {
    if (!userId) return;
    try {
      await banUser(userId);
      setUser((prevUser) => ({ ...prevUser!, active: false }));
      message.success(`User ${user?.name} has been banned successfully.`);
    } catch (error) {
      console.error(error);
      message.error("Failed to ban user.");
    }
  };

  const handleUnbanUser = async () => {
    if (!userId) return;
    try {
      await unBanUser(userId);
      setUser((prevUser) => ({ ...prevUser!, active: true }));
      message.success(`User ${user?.name} has been unbanned successfully.`);
    } catch (error) {
      console.error(error);
      message.error("Failed to unban user.");
    }
  };

  if (loading) {
    return <Spin size="large" className="flex justify-center my-8" />;
  }

  if (!user) {
    return <p className="text-center">User not found</p>;
  }

  const currentOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-h-screen bg-gray-100 py-8 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <div className="text-center mb-6">
          <div className="flex justify-center">
            <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center">
              <UserOutlined className="text-2xl text-gray-600" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mt-3">{user.name}</h3>
          <p className="text-gray-500 text-sm mt-1 break-all sm:whitespace-normal">
            {user.email}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-6">
          <div className="sm:w-1/2">
            <h4 className="text-lg font-semibold mb-2">User Information</h4>
            <ul className="border rounded-lg p-4 bg-gray-50 space-y-2">
              <li><strong>Name:</strong> {user.name}</li>
              <li><strong>Mobile:</strong> {user.mobile || "Not available"}</li>
              <li><strong>Role:</strong> {user.role}</li>
              <li>
                <strong>Status:</strong>
                <span className={`ml-1 font-semibold ${user.active ? "text-green-600" : "text-red-600"}`}>
                  {user.active ? "Active" : "Banned"}
                </span>
              </li>
              <li><strong>Email:</strong> {user.email}</li>
              <li>
                <strong>Address:</strong>
                {user.address ? (
                  <div className="mt-1">
                    <p>{user.address.street}</p>
                    <p>{user.address.city}, {user.address.state} {user.address.zip}</p>
                  </div>
                ) : (
                  "No address available"
                )}
              </li>
            </ul>
          </div>

          <div className="sm:w-1/2 mt-6 sm:mt-0">
            <h4 className="text-lg font-semibold mb-2">Order History</h4>
            {currentOrders.length > 0 ? (
              <div className="max-h-[400px] overflow-y-auto border rounded-lg p-4 bg-gray-50 space-y-4">
                {currentOrders.map((order, index) => (
                  <div key={index} className="border-b pb-2 last:border-b-0">
                    <p><strong>Total Amount:</strong> {formatCurrency(order.totalAmount)}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Products:</strong></p>
                    <ul className="list-disc pl-6">
                      {order.productVariants.map((productItem) => (
                        <li key={productItem._id}>
                          <p>Quantity: {productItem.quantity}</p>
                          <p><strong>Variant Details:</strong></p>
                          {orderDetails[order._id]?.map((variant, idx) => (
                            <div key={idx}>
                              <p>Variant Name: {variant.name}</p>
                              <p>Price: {formatCurrency(variant.price)}</p>
                            </div>
                          ))}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p>No orders available</p>
            )}
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={orders.length}
              onChange={(page) => setCurrentPage(page)}
              className="mt-4 text-right"
            />
            <div className="flex justify-end mt-4">
              {user.active ? (
                <Button onClick={handleBanUser} className="bg-red-500 text-black w-auto py-2 px-4 rounded border-2 border-red-500 hover:bg-red-600 focus:border-red-500 focus:ring-0">
                  Ban User
                </Button>
              ) : (
                <Button onClick={handleUnbanUser} className="bg-green-500 text-white w-auto py-2 px-4 rounded">
                  Unban User
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
