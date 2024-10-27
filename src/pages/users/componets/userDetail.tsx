import React from "react";
import { User  } from "./types"; // Adjust the import based on your actual structure

interface UserDetailProps {
  user: User | null; // The selected user, null if no user is selected
  onClose: () => void; // Function to close the detail view
}

const UserDetail: React.FC<UserDetailProps> = ({ user, onClose }) => {
  if (!user) {
    return null; // Don't render anything if no user is selected
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-6 shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">User Details</h2>
        <div className="mb-2">
          <strong>Member Name:</strong> {user.name}
        </div>
        <div className="mb-2">
          <strong>Mobile:</strong> {user.phoneNumber}
        </div>
        <div className="mb-2">
          <strong>Email:</strong> {user.email}
        </div>
        <div className="mb-2">
          <strong>Status:</strong> {user.status}
        </div>
        <div className="mb-2">
          <strong>Address:</strong>
            <div>
                {user.address?.street && `${user.address.street}, `}
                {user.address?.ward && `${user.address.ward}, `}
                {user.address?.district && `${user.address.district}, `}
                {user.address?.city && `${user.address.city}, `}
                {user.address?.postalCode && `${user.address.postalCode}, `}
                {user.address?.country}
                </div>        
            </div>
        <div className="mb-2">
          <strong>Role:</strong> {user.role}
        </div>
        {/* Add more fields as necessary */}
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UserDetail;
