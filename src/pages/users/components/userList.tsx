// // import React, { useState } from "react";
// // import { Layout } from "antd";
// // import { Outlet, useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate
// // import UsersTable from "./userTable";
// // import UserDetail from "./userDetail"; // Import UserDetail if you still need it
// // import { User } from "./types";

// // const { Content } = Layout;

// // const UsersList: React.FC = () => {
// //   const [users] = useState<User[]>([
// //     {
// //       id: 1,
// //       name: "George Lindelof",
// //       mobile: "+4 315 23 62",
// //       role: "user",
// //       email: "carlsen@armand.no",
// //       status: "Active",
// //       address: {
// //         street: "123 Elm St",
// //         city: "Somewhere",
// //         state: "CA",
// //         zip: "90210",
// //       },
// //     },
// //     {
// //       id: 2,
// //       name: "Emma Watson",
// //       mobile: "+4 315 23 63",
// //       role: "admin",
// //       email: "emma@watson.com",
// //       status: "Inactive",
// //       address: {
// //         street: "456 Maple Ave",
// //         city: "Anywhere",
// //         state: "NY",
// //         zip: "10001",
// //       },
// //     },
// //   ]);

// //   const navigate = useNavigate(); // Initialize useNavigate

// //   // Handle user click
// //   const handleUserClick = (user: User) => {
// //     navigate(`/users/${user.id}`); // Navigate to the user detail page
// //   };

// //   return (
// //     <Layout style={{ minHeight: "100vh" }}>
// //       <Content style={{ padding: "1rem" }}>
// //         <UsersTable users={users} onUserClick={handleUserClick} /> {/* Pass onUserClick here */}
// //         <Outlet /> {/* This will render any nested route */}
// //       </Content>
// //     </Layout>
// //   );
// // };

// // export default UsersList;
// // import React, { useState } from "react";
// // import { Layout } from "antd";
// // import { Outlet, useNavigate } from "react-router-dom"; // Import Outlet and useNavigate
// // import UsersTable from "./userTable";
// // import { User } from "./types";

// // const { Content } = Layout;

// // const UsersList: React.FC = () => {
// //   const [users] = useState<User[]>([
// //     {
// //       id: 1,
// //       name: "George Lindelof",
// //       mobile: "+4 315 23 62",
// //       role: "user",
// //       email: "carlsen@armand.no",
// //       status: "Active",
// //       address: {
// //         street: "123 Elm St",
// //         city: "Somewhere",
// //         state: "CA",
// //         zip: "90210",
// //       },
// //     },
// //     {
// //       id: 2,
// //       name: "Emma Watson",
// //       mobile: "+4 315 23 63",
// //       role: "admin",
// //       email: "emma@watson.com",
// //       status: "Inactive",
// //       address: {
// //         street: "456 Maple Ave",
// //         city: "Anywhere",
// //         state: "NY",
// //         zip: "10001",
// //       },
// //     },
// //   ]);

// //   const navigate = useNavigate(); // Initialize useNavigate

// //   // Handle user click
// //   const handleUserClick = (user: User) => {
// //     navigate(`/users/${user.id}`); // Navigate to the user detail page
// //   };

// //   return (
// //     <Layout style={{ minHeight: "100vh" }}>
// //       <Content style={{ padding: "1rem" }}>
// //         <UsersTable users={users} onUserClick={handleUserClick} /> {/* Pass onUserClick here */}
// //         <Outlet /> {/* This will render any nested route like UserDetail */}
// //       </Content>
// //     </Layout>
// //   );
// // };

// // export default UsersList;

// import React, { useState } from "react";
// import { Layout } from "antd";
// import { Outlet, useNavigate } from "react-router-dom"; // Import Outlet and useNavigate
// import UsersTable from "./userTable";
// import { User } from "./types";

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
//   ]);

//   const navigate = useNavigate(); // Initialize useNavigate

//   // Handle user click
//   const handleUserClick = (user: User) => {
//     navigate(`/users/${user.id}`); // Navigate to the user detail page
//   };

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Content style={{ padding: "1rem" }}>
//         <UsersTable users={users} onUserClick={handleUserClick} /> {/* Pass onUserClick here */}
//         <Outlet context={{ users }} /> {/* Pass users to Outlet context */}
//       </Content>
//     </Layout>
//   );
// };

// export default UsersList;
import React, { useState } from "react";
import UsersTable from "./userTable";
import { User } from "./types";
import { Layout } from "antd";

const { Content } = Layout;

const UsersList: React.FC = () => {
  const [users] = useState<User[]>([
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
  ]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "1rem" }}>
        <UsersTable users={users} /> {/* Remove onUserClick prop here */}
      </Content>
    </Layout>
  );
};

export default UsersList;
