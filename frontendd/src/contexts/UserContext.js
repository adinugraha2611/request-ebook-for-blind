import React, { useState, createContext } from 'react';
import firebase from '../firebaseConfig';

const initialState = {
  uid: '',
  email: '',
  emailVerified: false,
  role: '',
};
export const UserContext = createContext(initialState);
export const UserProvider = ({ children }) => {
  const [userStatus, setUserStatus] = useState(initialState);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [authCheckDone, setAuthCheckDone] = useState(false);
  const [alertMessage, setAlert] = useState('');
  const [requestList, setRequestList] = useState([]);

  // actions
  // register on server side
  const serverUrl =
    'https://us-central1-mitranetra-1234.cloudfunctions.net/app';
  const registerOnServer = async (email, password, sendEmailVerification) => {
    try {
      const fetching = await fetch(`${serverUrl}/api/users`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, sendEmailVerification }),
      });
      const result = await fetching.json();
      if (result.status === 'success') {
        setAlert('success');

        // auto sign in after register
        signIn(email, password);
      } else setAlert(result.err.message);
    } catch (err) {
      console.log('error while connecting to server:', err);
    }
  };

  // register user on client side
  const register = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => setAlert('success'))
      /*
      .then(() => {
        firebase.auth().onAuthStateChanged((user) => {
          user.sendEmailVerification();
          console.log('email verification sent');
        });
      })
      */
      .catch((error) => {
        setAlert(error.message);
      });
  };

  // sign in user
  const signIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setAlert('success');
        setAuthCheckDone(true);
      })
      .catch((error) => setAlert(error.message));
  };
  // check user access
  const checkUserStatus = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // user is signed in
        console.log(user.uid);

        // check if the user is admin
        user.getIdTokenResult().then((idTokenResult) => {
          if (!!idTokenResult.claims.admin) {
            console.log('user is admin');
            setUserStatus({
              uid: user.uid,
              email: user.email,
              emailVerified: user.emailVerified,
              role: 'admin',
            });
          } else {
            console.log('user is a basic user');
            setUserStatus({
              uid: user.uid,
              email: user.email,
              emailVerified: user.emailVerified,
              role: '',
            });
          }
        });
        getRequestList(user.uid);
        setIsSignedIn(true);
      } else {
        // user is not signed in
        setIsSignedIn(false);
        setUserStatus({
          uid: '',
          email: '',
          emailVerified: false,
          role: '',
        });
        console.log(userStatus.uid);
      }
    });
    setAuthCheckDone(true);
  };

  // sign out user
  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(
        () => console.log('sign out success'),
        (err) => {
          console.log(err);
          return { err };
        }
      );
  };

  // query user's request list
  const getRequestList = (uid) => {
    try {
      console.log(uid);
      firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .onSnapshot((snapshot) => {
          if (!snapshot.exists) return console.log('request list is empty');
          const { requestList } = snapshot.data();
          setRequestList(requestList);
        });
    } catch (err) {
      console.log(err);
    }
  };
  // render
  return (
    <UserContext.Provider
      value={{
        userStatus,
        authCheckDone,
        registerOnServer,
        isSignedIn,
        signIn,
        signOut,
        checkUserStatus,
        register,
        alertMessage,
        getRequestList,
        requestList,
        setAlert,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
