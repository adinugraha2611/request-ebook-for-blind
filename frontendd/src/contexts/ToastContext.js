import React, { createContext, useState } from 'react';

const initialState = {
  toastMsg: '',
  isShown: false,
};

export const ToastContext = createContext(initialState);
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(initialState);

  // show toast function
  // toastShown defines wether the toast is visually shown or only announced by screen reader (after completing actions that need feedback)
  const showToast = (message, toastShown) => {
    setToast({ toastMsg: message, isShown: toastShown });
    // remove toast after 3 sec
    setTimeout(() => setToast({ toastMsg: '', isShown: false }), 3000);
  };

  // render
  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
    </ToastContext.Provider>
  );
};
