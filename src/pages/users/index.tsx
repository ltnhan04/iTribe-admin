// // export default UsersList;
// import React, { useState } from "react";
// import UsersTable from "./userTable";
// import { User } from "./types";
// import { Layout } from "antd";
// import { Outlet } from "react-router-dom";

// const { Content } = Layout;

// const UsersList: React.FC = () => {
//   const [users] = useState<User[]>([
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
//     {
//       id: 3,
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
//     {
//       id: 4,
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
//   ]);

//   return (
//     // <Layout style={{ minHeight: "100vh" }}>
//     //   <Content style={{ padding: "1rem" }}>
//     //     <UsersTable users={users} /> {/* Remove onUserClick prop here */}
//     //   </Content>
//     // </Layout>
//     <Layout style={{ minHeight: "100vh" }}>
//     <Content style={{ padding: "1rem" }}>
//       <UsersTable users={users} />
//       <Outlet /> {/* This allows nested route rendering */}
//     </Content>
//   </Layout>
//   );
// };

// export default UsersList;
// UsersList.tsx
import React, { useEffect, useState } from "react";
import UsersTable from "./components/user-table";
import { User } from "./types";
import { Layout } from "antd";
import { getAllUsers } from "../../api/services/users/usersApi";
const { Content } = Layout;
import Loading from "../../loading";

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // For error handling

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data); // Adjust if response structure is different
      } catch (error) {
        console.log(error);
        setError("Failed to fetch users."); // Handle error if fetching fails
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>; // Display the error message
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>
        <UsersTable users={users} />
      </Content>
    </Layout>
  );
};

export default UsersList;
