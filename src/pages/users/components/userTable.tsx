import React from "react";
import UserRow from "./userRow"; // Ensure you have the correct import
import { User } from "./types"; // Adjust as necessary

interface UsersTableProps {
  users: User[];
  onUserClick: (user: User) => void; // Define this prop
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onUserClick }) => {
  return (
    <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
      <thead>
        <tr className="text-left bg-gray-50">
          <th className="px-4 py-2">Member Name</th>
          <th className="px-4 py-2">Mobile</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Operation</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow 
            key={user.id} 
            user={user} 
            onClick={() => onUserClick(user)} // Pass the onClick handler
          />
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
