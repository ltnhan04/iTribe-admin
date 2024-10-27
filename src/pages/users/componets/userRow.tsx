import React from "react";
import { User } from "./types"; // Adjust the import based on your actual structure
import { 
  CopyOutlined, 
  EditOutlined, 
  DeleteOutlined 
} from '@ant-design/icons';
interface UserRowProps {
  user: User;
  onClick: () => void; // Add this prop to handle clicks
}

const UserRow: React.FC<UserRowProps> = ({ user, onClick }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      {/* Member name with click handler */}
      <td className="px-4 py-2 text-gray-700 font-medium cursor-pointer" onClick={onClick}>
        {user.name}
      </td>
      
      {/* Other user data */}
      <td className="px-4 py-2 text-gray-600">{user.mobile}</td>
      <td className="px-4 py-2 text-gray-600">{user.email}</td>
      <td className="px-4 py-2">
        <span className={`px-2 py-1 rounded-full text-white text-sm font-semibold ${
          user.status === "Active" ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-600"
        }`}>
          {user.status}
        </span>
      </td>
      <td className="px-4 py-2 flex items-center space-x-2 text-purple-500">
        <CopyOutlined className="cursor-pointer hover:text-purple-700" />
        <EditOutlined className="cursor-pointer hover:text-purple-700" />
        <DeleteOutlined className="cursor-pointer hover:text-purple-700" />
      </td>
      <td className="px-4 py-2">
        <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
          Login
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
