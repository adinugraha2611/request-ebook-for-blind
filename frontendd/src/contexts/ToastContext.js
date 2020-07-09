import React, { createContext, useState } from 'react';

const initialState = {
  toastMsg: '',
  isShown: false,
};
export const ToastContext = createContext(initialState);
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(initialState);

  // show toast function
  const showToast = (message, toastShown) => {
    setToast({ toastMsg: message, isShown: false });
    setTimeout(() => setToast({ toastMsg: '', isShown: false }), 2000);
  };

  // render
  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
    </ToastContext.Provider>
  );
};
