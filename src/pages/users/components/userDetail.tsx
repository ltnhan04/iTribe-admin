// // // // userDetail.tsx
// // // import React from "react";
// // // import { User } from "./types";
// // // import { Modal } from "antd";

// // // interface UserDetailProps {
// // //   user: User;
// // //   onClose: () => void;
// // // }

// // // const UserDetail: React.FC<UserDetailProps> = ({ user, onClose }) => {
// // //   return (
// // //     <Modal title="User Details" visible={true} onCancel={onClose} footer={null}>
// // //       <p><strong>Name:</strong> {user.name}</p>
// // //       <p><strong>Mobile:</strong> {user.mobile}</p>
// // //       <p><strong>Email:</strong> {user.email}</p>
// // //       <p><strong>Status:</strong> {user.status}</p>
// // //       <p><strong>Address:</strong></p>
// // //       {user.address && (
// // //         <div>
// // //           <p>{user.address.street}</p>
// // //           <p>{user.address.city}, {user.address.state} {user.address.zip}</p>
// // //         </div>
// // //       )}
// // //     </Modal>
// // //   );
// // // };

// // // export default UserDetail;
// // import React from "react";
// // import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate
// // import { User } from "./types";
// // import { Modal } from "antd";

// // interface UserDetailProps {
// //   users: User[]; // Accept users as props
// // }

// // const UserDetail: React.FC<UserDetailProps> = ({ users }) => {
// //   const { id } = useParams<{ id: string }>(); // Get the ID from URL parameters
// //   const navigate = useNavigate(); // Use navigate to go back

// //   // Replace this with the actual user data fetching logic
// //   const user = users.find(user => user.id.toString() === id); // Find the user by ID

// //   const handleClose = () => {
// //     navigate("/users"); // Navigate back to users list
// //   };

// //   if (!user) return null; // Return null if user is not found

// //   return (
// //     <Modal title="User Details" visible={true} onCancel={handleClose} footer={null}>
// //       <p><strong>Name:</strong> {user.name}</p>
// //       <p><strong>Mobile:</strong> {user.mobile}</p>
// //       <p><strong>Email:</strong> {user.email}</p>
// //       <p><strong>Status:</strong> {user.status}</p>
// //       <p><strong>Address:</strong></p>
// //       {user.address && (
// //         <div>
// //           <p>{user.address.street}</p>
// //           <p>{user.address.city}, {user.address.state} {user.address.zip}</p>
// //         </div>
// //       )}
// //     </Modal>
// //   );
// // };

// // export default UserDetail;
// import React from "react";
// import { useParams, useNavigate, useOutletContext } from "react-router-dom"; // Import useOutletContext
// import { User } from "./types";
// import { Modal } from "antd";

// interface UserDetailProps {
//   users: User[]; // Accept users as props
// }

// const UserDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>(); // Get the ID from URL parameters
//   const navigate = useNavigate(); // Use navigate to go back
//   const { users } = useOutletContext<{ users: User[] }>(); // Access users from Outlet context

//   // Find the user by ID
//   const user = users.find(user => user.id.toString() === id);

//   const handleClose = () => {
//     navigate("/users"); // Navigate back to users list
//   };

//   if (!user) return null; // Return null if user is not found

//   return (
//     <Modal title="User Details" visible={true} onCancel={handleClose} footer={null}>
//       <p><strong>Name:</strong> {user.name}</p>
//       <p><strong>Mobile:</strong> {user.mobile}</p>
//       <p><strong>Email:</strong> {user.email}</p>
//       <p><strong>Status:</strong> {user.status}</p>
//       <p><strong>Address:</strong></p>
//       {user.address && (
//         <div>
//           <p>{user.address.street}</p>
//           <p>{user.address.city}, {user.address.state} {user.address.zip}</p>
//         </div>
//       )}
//     </Modal>
//   );
// };

// export default UserDetail;
import React from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate
import { User } from "./types";
import { Modal } from "antd";

interface UserDetailProps {
  users: User[]; // Define users prop if needed
}

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the ID from URL parameters
  const navigate = useNavigate(); // Use navigate to go back

  // Fetch or access your users data (from context, state, or API)
  // For demonstration, we are assuming users are available as props, but you can also fetch it from your state or API.
  
  // Example users array for demonstration
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

  const user = users.find(user => user.id.toString() === id); // Find user by ID

  const handleClose = () => {
    navigate("/users"); // Navigate back to users list
  };

  if (!user) return <div>User not found</div>; // Return a message if user is not found

  return (
    <Modal title="User Details" visible={true} onCancel={handleClose} footer={null}>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Mobile:</strong> {user.mobile}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Status:</strong> {user.status}</p>
      <p><strong>Address:</strong></p>
      {user.address && (
        <div>
          <p>{user.address.street}</p>
          <p>{user.address.city}, {user.address.state} {user.address.zip}</p>
        </div>
      )}
    </Modal>
  );
};

export default UserDetail;
