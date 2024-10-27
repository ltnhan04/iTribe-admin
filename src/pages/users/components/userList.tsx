import React, { useState } from "react";
import UsersTable from "./userTable"; // Make sure to adjust the import based on your file structure
import UserDetail from "./userDetail"; // Your user detail component
import { User } from "./types"; // Adjust as necessary

const UsersList: React.FC = () => {
  // Sample user data for demonstration
  const [users] = useState<User[]>([
    {
      id: 1,
      name: "George Lindelof",
      mobile: "+4 315 23 62",
      role: "user",
      email: "carlsen@armand.no",
      status: "Active",
    },
    {
      id: 2,
      name: "Emma Watson",
      mobile: "+4 315 23 63",
      role: "admin",
      email: "emma@watson.com",
      status: "Inactive",
    },
    // Add more user objects as needed
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleClose = () => {
    setSelectedUser(null);
  };

  return (
    <div>
      <UsersTable 
        users={users} // Pass the users array here
        onUserClick={handleUserClick} // Pass the click handler
      />
      {selectedUser && (
        <UserDetail user={selectedUser} onClose={handleClose} />
      )}
    </div>
  );
};

export default UsersList;
