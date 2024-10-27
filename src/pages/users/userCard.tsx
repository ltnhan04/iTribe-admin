import React from 'react';
import {User} from './types'
interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4">
      <img
        src={user.imageUrl}
        alt={user.name}
        className="w-20 h-20 rounded-full object-cover mb-4"
      />
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-sm text-gray-500">{user.role}</p>
      <a href={`mailto:${user.email}`} className="text-blue-500 mt-2">
        {user.email}
      </a>
    </div>
  );
};

export default UserCard;

