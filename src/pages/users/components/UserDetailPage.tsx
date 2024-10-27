// // UserDetailPage.tsx
// import React from "react";
// import { useParams } from "react-router-dom";
// import { User } from "./types";
// import { Layout } from "antd";

// const { Content } = Layout;

// const UserDetailPage: React.FC = () => {
//   const { userId } = useParams<{ userId: string }>();
  
//   // Here you would typically fetch the user details from your API or context
//   // For example, using a hardcoded user data array for now
//   const users: User[] = [
//     {
//       id: 1,
//       name: "George Lindelof",
//       mobile: "+4 315 23 62",
//       role: "user",
//       email: "carlsen@armand.no",
//       status: "Active",
//       address: {
//         street: "123 Elm St",
//         city: "Somewhere",
//         state: "CA",
//         zip: "90210",
//       },
//     },
//     {
//       id: 2,
//       name: "Emma Watson",
//       mobile: "+4 315 23 63",
//       role: "admin",
//       email: "emma@watson.com",
//       status: "Inactive",
//       address: {
//         street: "456 Maple Ave",
//         city: "Anywhere",
//         state: "NY",
//         zip: "10001",
//       },
//     },
//   ];

//   // Find the user by ID
//   const user = users.find(user => user.id.toString() === userId);

//   if (!user) {
//     return <p>User not found</p>;
//   }

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Content style={{ padding: "1rem" }}>
//         <h1>User Details</h1>
//         <p><strong>Name:</strong> {user.name}</p>
//         <p><strong>Mobile:</strong> {user.mobile}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Status:</strong> {user.status}</p>
//         <p><strong>Address:</strong></p>
//         <p>{user.address.street}</p>
//         <p>{user.address.city}, {user.address.state} {user.address.zip}</p>
//         {/* Add more user details here as needed */}
//       </Content>
//     </Layout>
//   );
// };

// export default UserDetailPage;
// UserDetailPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { User } from "./types";
import { Layout } from "antd";

const { Content } = Layout;

const UserDetailPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  // Hardcoded user data for demonstration; replace this with your data fetching logic.
  const users: User[] = [
    {
      id: 1,
      name: "George Lindelof",
      mobile: "+4 315 23 62",
      role: "user",
      email: "carlsen@armand.no",
      status: "Active",
      address: {
        street: "123 Elm St",
        city: "Somewhere",
        state: "CA",
        zip: "90210",
      },
    },
    {
      id: 2,
      name: "Emma Watson",
      mobile: "+4 315 23 63",
      role: "admin",
      email: "emma@watson.com",
      status: "Inactive",
      address: {
        street: "456 Maple Ave",
        city: "Anywhere",
        state: "NY",
        zip: "10001",
      },
    },
  ];

  // Find the user by ID
  const user = users.find(user => user.id.toString() === userId);

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "1rem" }}>
        <h1>User Details</h1>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Status:</strong> {user.status}</p>
        <p><strong>Address:</strong></p>
        {user.address ? (
          <>
            <p>{user.address.street}</p>
            <p>{user.address.city}, {user.address.state} {user.address.zip}</p>
          </>
        ) : (
          <p>No address available</p>
        )}
        {/* Add more user details here as needed */}
      </Content>
    </Layout>
  );
};

export default UserDetailPage;
