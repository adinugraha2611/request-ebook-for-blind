import React, { useContext, useEffect } from 'react';
import '../App.css';
import { UserContext } from '../contexts/UserContext';
import { Popup } from './Popup';

export const RegisterForm = ({
  onChange,
  history,
  email,
  password,
  sendEmailVerification,
  emptyForm,
}) => {
  // get contexts
  const { register, registerOnServer, setAlert, alertMessage } = useContext(
    UserContext
  );

  // reset alert message and form stuff
  useEffect(() => {
    setAlert('');
    emptyForm();
  }, []);

  // handle submit server side
  const handleSubmitOnServer = async (e) => {
    e.preventDefault();
    await registerOnServer(email, password, sendEmailVerification);
  };
  // handle submit client side
  const handleSubmit = (e) => {
    e.preventDefault();
    register(email, password);
  };

  // render
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Register dengan Alamat Email dan Password</h2>
        <form onSubmit={handleSubmitOnServer} method="post">
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="email"
            name="email"
            autoFocus
            placeholder="abc@example.com"
            value={email}
            onChange={onChange}
          />{' '}
          <br />
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />{' '}
          <br />
          <input
            type="checkbox"
            id="sendEV"
            name="sendEmailVerification"
            checked={sendEmailVerification}
            onChange={onChange}
          />
          <label htmlFor="sendEV">Kirimkan Email Verifikasi</label>
          <p role="alert">{alertMessage}</p>
          <input type="submit" value="Register" />
          <input type="button" value="Close" onClick={() => history.goBack()} />
        </form>
      </div>
      {alertMessage === 'success' ? (
        <Popup
          history={history}
          message="Registrasi sukses! Anda akan log in secara otomatis."
        />
      ) : null}
    </div>
  );
};
