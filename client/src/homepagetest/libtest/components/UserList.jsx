import React from 'react';
import useUserStore from '../stores/userStore';

const UserList = () => {
  const users = useUserStore((state) => state.users);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name} ({user.email})</li>
      ))}
    </ul>
  );
};

export default UserList;
