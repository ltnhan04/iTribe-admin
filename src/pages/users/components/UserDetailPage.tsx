// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { User, Order } from "./types"; // Import Order type
// import { Layout, Spin, Pagination, Button, message } from "antd";
// import { UserOutlined } from "@ant-design/icons";
// import { getUserDetails, getUserOrders } from "../../../api/services/users/usersApi"; // Adjust the import based on your API structure

// const UserDetailPage: React.FC = () => {
//   const { userId } = useParams<{ userId: string }>();
//   const [user, setUser] = useState<User | null>(null);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 2;

//   useEffect(() => {
//     if (!userId) return;

//     const fetchUserDetails = async () => {
//       try {
//         const userResponse = await getUserDetails(userId);
//         setUser(userResponse.data);
//       } catch (error) {
//         message.error("Failed to fetch user details.");
//       }
//     };

//     const fetchUserOrders = async () => {
//       try {
//         const ordersResponse = await getUserOrders(userId);
//         setOrders(ordersResponse.data);
//       } catch (error) {
//         message.error("Failed to fetch user orders.");
//       }
//     };

//     fetchUserDetails();
//     fetchUserOrders();
//     setLoading(false);
//   }, [userId]);

//   const handleBanUser = () => {
//     message.success(`User ${user?.name} has been banned successfully.`);
//   };

//   if (loading) {
//     return <Spin size="large" className="flex justify-center my-8" />;
//   }

//   if (!user) {
//     return <p className="text-center">User not found</p>;
//   }

//   // Calculate pagination for orders
//   const indexOfLastOrder = currentPage * itemsPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
//   const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

//   return (
//     <div className="max-h-screen bg-gray-100 py-8 flex justify-center">
//       <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
//         <div className="text-center mb-6">
//           <div className="flex justify-center">
//             <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center">
//               <UserOutlined className="text-2xl text-gray-600" />
//             </div>
//           </div>
//           <h3 className="text-xl font-semibold mt-3">{user.name}</h3>
//           <p className="text-gray-500 text-sm mt-1 break-all sm:whitespace-normal">{user.email}</p>
//         </div>

//         <div className="flex flex-col sm:flex-row sm:space-x-6">
//           <div className="sm:w-1/2">
//             <h4 className="text-lg font-semibold mb-2">User Information</h4>
//             <ul className="border rounded-lg p-4 bg-gray-50 space-y-2">
//               <li>
//                 <strong>Name:</strong> {user.name}
//               </li>
//               <li>
//                 <strong>Mobile:</strong> {user.mobile || "Not available"}
//               </li>
//               <li>
//                 <strong>Role:</strong> {user.role}
//               </li>
//               <li>
//                 <strong>Status:</strong>
//                 <span className={`ml-1 font-semibold ${user.status === "Active" ? "text-green-600" : "text-red-600"}`}>
//                   {user.status}
//                 </span>
//               </li>
//               <li>
//                 <strong>Email:</strong> {user.email}
//               </li>
//               <li>
//                 <strong>Address:</strong>
//                 {user.address ? (
//                   <div className="mt-1">
//                     <p>{user.address.street}</p>
//                     <p>{user.address.city}, {user.address.state} {user.address.zip}</p>
//                   </div>
//                 ) : (
//                   "No address available"
//                 )}
//               </li>
//             </ul>
//           </div>

//           <div className="sm:w-1/2 mt-6 sm:mt-0">
//             <h4 className="text-lg font-semibold mb-2">Order History</h4>
//             {currentOrders.length > 0 ? (
//               <div className="border rounded-lg p-4 bg-gray-50 space-y-4">
//                 {currentOrders.map((order, index) => (
//                   <div key={index} className="border-b pb-2 last:border-b-0">
//                     <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
//                     <p><strong>Status:</strong> {order.status}</p>
//                     <p><strong>Products:</strong></p>
//                     <ul className="list-disc pl-6">
//                       {order.products.map((product: string, productIndex: number) => (
//                         <li key={productIndex}>{product}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p>No orders available</p>
//             )}
//             <Pagination
//               current={currentPage}
//               pageSize={itemsPerPage}
//               total={orders.length}
//               onChange={(page) => setCurrentPage(page)}
//               className="mt-4 text-right"
//             />
//             <div className="flex justify-end mt-4">
//               <Button
//                 danger
//                 onClick={handleBanUser}
//                 className="bg-red-500 text-white hover:bg-red-600"
//               >
//                 Ban User
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDetailPage;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User, Order } from "../types"; // Import Order type
import { Spin, Pagination, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  getUserDetails,
  getUserOrders,
  banUser,
  unBanUser,
} from "../../../api/services/users/usersApi"; // Adjust the import based on your API structure

const UserDetailPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    if (!userId) return;

    const fetchUserDetails = async () => {
      try {
        const userResponse = await getUserDetails(userId);

        setUser(userResponse.data);
      } catch (error) {
        console.log(error);
        message.error("Failed to fetch user details.");
      }
    };

    const fetchUserOrders = async () => {
      try {
        const ordersResponse = await getUserOrders(userId);
        console.log(ordersResponse.data); // Debugging: Confirm the response structure
        setOrders(ordersResponse.data.orderHistory || []); // Ensure `orderHistory` is set as an array
      } catch (error) {
        console.log(error);
        message.error("Failed to fetch user orders.");
      }
    };

    fetchUserDetails();
    fetchUserOrders();
    setLoading(false);
  }, [userId]);

  const handleBanUser = async () => {
    if (!userId) return; // Ensure userId is defined
    try {
      await banUser(userId); // Call the ban API
      setUser((prevUser) => ({ ...prevUser!, status: "Banned" })); // Update user status
      message.success(`User ${user?.name} has been banned successfully.`);
    } catch (error) {
      console.log(error);
      message.error("Failed to ban user.");
    }
  };

  const handleUnbanUser = async () => {
    if (!userId) return; // Ensure userId is defined
    console.log(userId);
    try {
      await unBanUser(userId); // Call the unban API
      setUser((prevUser) => ({ ...prevUser!, status: "Active" })); // Update user status
      message.success(`User ${user?.name} has been unbanned successfully.`);
    } catch (error) {
      console.log(error);
      message.error("Failed to unban user.");
    }
  };

  if (loading) {
    return <Spin size="large" className="flex justify-center my-8" />;
  }

  if (!user) {
    return <p className="text-center">User not found</p>;
  }

  // Calculate pagination for orders
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  console.log(user.active);
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
              <li>
                <strong>Name:</strong> {user.name}
              </li>
              <li>
                <strong>Mobile:</strong> {user.mobile || "Not available"}
              </li>
              <li>
                <strong>Role:</strong> {user.role}
              </li>
              <li>
                <strong>Status:</strong>
                <span
                  className={`ml-1 font-semibold ${
                    user.active === true ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {user.active ? "Active" : "Banned"}
                </span>
              </li>
              <li>
                <strong>Email:</strong> {user.email}
              </li>
              <li>
                <strong>Address:</strong>
                {user.address ? (
                  <div className="mt-1">
                    <p>{user.address.street}</p>
                    <p>
                      {user.address.city}, {user.address.state}{" "}
                      {user.address.zip}
                    </p>
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
              <div className="border rounded-lg p-4 bg-gray-50 space-y-4">
                {currentOrders.map((order, index) => (
                  <div key={index} className="border-b pb-2 last:border-b-0">
                    <p>
                      <strong>Total Amount:</strong> ${order.totalAmount}
                    </p>
                    <p>
                      <strong>Status:</strong> {order.status}
                    </p>
                    <p>
                      <strong>Products:</strong>
                    </p>
                    {/* <ul className="list-disc pl-6">
                      {order.products.map((productItem) => (
                        <div key={productItem._id}>
                          <p>Product: {productItem.product.name}</p>
                          <p>Quantity: {productItem.quantity}</p>
                        </div>
                      ))}
                    </ul> */}
                    <ul className="list-disc pl-6">
                      {/* {order.products && order.products.length > 0 ? (
                        <ul className="list-disc pl-6">
                          {order.products.map((productItem) => (
                            <li key={productItem._id}>
                              <p>Product Name: {productItem.product.name}</p>
                              <p>Product ID: {productItem.product._id}</p>
                              <p>Quantity: {productItem.quantity}</p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No products available.</p>
                      )} */}
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
              {user.active === true ? (
                <Button
                  danger
                  onClick={handleBanUser}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Ban User
                </Button>
              ) : (
                <Button
                  onClick={handleUnbanUser}
                  className="bg-green-500 text-white hover:bg-green-600"
                >
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
