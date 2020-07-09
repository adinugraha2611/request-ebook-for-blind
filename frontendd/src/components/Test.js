import React, { useState, useEffect } from 'react';
import firebase from '../firebaseConfig';

export const Test = ({ uid, isSignedIn }) => {
  const [data, setData] = useState('');
  const books = [];
  const fetching = () => {
    try {
      firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .onSnapshot((snapshot) => {
          if (!snapshot.exists) return console.log('request list is empty');
          const { requestList } = snapshot.data();
          // setData(requestList);
          // getReqBookInfos(requestList);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const [test, setTest] = useState('');
  useEffect(() => {
    if (isSignedIn) {
      // fetching();
      setData('test123');
      setTest('testing testing');
    } else {
      setTest('gak login lu!');
    }
  }, [isSignedIn]);
  console.log(data);
  return <div>{data}</div>;
};
