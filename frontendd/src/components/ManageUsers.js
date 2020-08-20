import React, { useContext, useState, useEffect } from 'react';
import { RequestedListContext } from '../contexts/RequestedListContext';
import UsersTable from './UsersTable';

export const ManageUsers = () => {
  const { serverUrl } = useContext(RequestedListContext);
  const [isFetching, setIsFetching] = useState(false);
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      setIsFetching(true);
      const response = await fetch(`${serverUrl}/api/get-users`);
      const result = await response.json();

      // deconstructing
      let data = result.map((user) => {
        return {
          uid: user.uid,
          email: user.email,
          verified: !user.emailVerified ? 'no' : 'yes',
          created: user.metadata.creationTime,
          lastSignIn: user.metadata.lastSignInTime,
          role:
            !user.customClaims || !user.customClaims.admin ? 'basic' : 'admin',
        };
      });

      setUsers(data);
      setIsFetching(false);
    } catch (e) {
      console.log('failed to load users table', e);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <h3>Manage Users</h3>
      <UsersTable users={users} />
    </div>
  );
};
