import React, { useContext, useState, useEffect } from 'react';
import { RequestedListContext } from '../contexts/RequestedListContext';

export const ManageUsers = () => {
  const { serverUrl } = useContext(RequestedListContext);
  const [isFetching, setIsFetching] = useState(false);
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      setIsFetching(true);
      const response = await fetch(`${serverUrl}/api/get-users`);
      const result = await response.json();
      setUsers(result);
      setIsFetching(false);
      console.log(result);
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
