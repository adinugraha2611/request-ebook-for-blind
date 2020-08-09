import React, { useContext, useState, useEffect } from 'react';
import { RequestedListContext } from '../contexts/RequestedListContext';

export const ManageUsers = () => {
  const { serverUrl } = useContext(RequestedListContext);
  const [setIsFetching, isFetching] = useState(false);
  const [setUsers, users] = useState([]);

  const getAllUsers = async () => {
    try {
      setIsFetching(true);
      const response = await fetch(`${serverUrl}/admin-tools/all-users`);
      const result = response.json();
      setUsers(result);
      setIsFetching(false);
    } catch (e) {
      console.log(e);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <h3>Manage Users</h3>
      <p>{JSON.stringify(users)}</p>
    </div>
  );
};
