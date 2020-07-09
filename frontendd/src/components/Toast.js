import React, { useContext } from 'react';
import { ToastContext } from '../contexts/ToastContext';
import { LiveMessage } from 'react-aria-live';

export const Toast = () => {
  const { toast } = useContext(ToastContext);
  const { toastMsg, isShown } = toast;
  return (
    <div>
      <LiveMessage message={toastMsg} aria-live="assertive" />
      {isShown ? <span aria-live="assertive">{toastMsg}</span> : null}
    </div>
  );
};
