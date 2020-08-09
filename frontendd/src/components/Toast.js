import React, { useContext } from 'react';
import { ToastContext } from '../contexts/ToastContext';

export const Toast = () => {
  const { toast } = useContext(ToastContext);
  // isShown defines wether the toast is visibly shown or not, will be done through css
  const { toastMsg, isShown } = toast;
  return (
    <div>
      <span aria-live="assertive">{toastMsg}</span>
    </div>
  );
};
