import React, { useContext, useEffect } from 'react';
import '../App.css';
import { UserContext } from '../contexts/UserContext';
import { Popup } from './Popup';

export const SignInForm = ({
  onChange,
  email,
  password,
  emptyForm,
  history,
}) => {
  // get contexts
  const { signIn, alertMessage, setAlert } = useContext(UserContext);

  // reset alert message and form stuff
  useEffect(() => {
    setAlert('');
    emptyForm();
  }, []);

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
  };
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Sign in dengan Alamat Email dan Password Anda</h2>
        <form onSubmit={handleSubmit} method="post">
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            autoFocus
            placeholder="abc@example.com"
            onChange={(e) => onChange(e)}
          />{' '}
          <br />
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />{' '}
          <br />
          <p role="alert">{alertMessage}</p>
          <input type="submit" value="Sign in" />
          <input
            type="button"
            value="Cancel"
            onClick={() => history.goBack()}
          />
        </form>
      </div>
      {alertMessage === 'success' ? (
        <Popup history={history} message="Sign in sukses!" />
      ) : null}
    </div>
  );
};
