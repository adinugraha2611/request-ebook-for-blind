import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export const Popup = ({ history, message }) => {
  // automatically redirected to home after 1.5 seconds
  setTimeout(() => history.push('/'), 1500);
  return (
    <div className="popup">
      <div className="popup-content">
        <h3 role="alert">{message}</h3>
      </div>
    </div>
  );
};
