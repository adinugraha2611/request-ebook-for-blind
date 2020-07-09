import React, { useEffect } from 'react';

export const SignOutMessage = ({ history, signOut, isSignedIn }) => {
  signOut();
  // go back to home page and auto reload when finished signing out
  useEffect(async () => {
    await history.push('/');
    window.location.reload(false);
  }, [isSignedIn]);
  return (
    <div className="popup">
      <div className="popup-content">
        <h3 role="alert">Signing out...</h3>
      </div>
    </div>
  );
};
