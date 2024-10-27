import React from 'react';
import UserCard from './userCard'; // Adjust path as needed
import { User } from './types'; // Import your User type

const usersData: User[] = [
  { id: 1, name: 'Jason Price', role: 'Admin', email: 'janick_parisian@yahoo.com', imageUrl: 'path/to/image1.jpg' },
  // Add more users here
];

const Users: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {usersData.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Users;