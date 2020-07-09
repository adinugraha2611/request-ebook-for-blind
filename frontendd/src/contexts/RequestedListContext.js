import React, { createContext, useState } from 'react';
import firebase from '../firebaseConfig';

export const RequestedListContext = createContext();
export const RequestedListProvider = ({ children }) => {
  const [requestedList, setRequestedList] = useState({
    items: [],
  });
  const [isFetched, setIsFetched] = useState(false);

  // functions
  const getListServerSide = () => {
    // gak dipake karena harus fetch berkala, jadi kurang dinamis.
    // jangan lupa diganti ketika build dan deploy
    const serverUrl =
      'https://us-central1-mitranetra-1234.cloudfunctions.net/app';
    return fetch(`${serverUrl}/api/requests`).then((res) => res.json());
  };

  /* run local database when on localhost for testing
    if (window.location.hostname === 'localhost') {
      console.log('localhost detected!');
      db.settings({
        host: 'localhost:8080',
        ssl: false,
      });
    }
*/
  // get list on client side
  const getRequestedList = () => {
    const db = firebase.firestore();
    db.collection('buku')
      .orderBy('voteSum', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          let allData = [];
          querySnapshot.forEach((doc) => {
            allData.push(doc.data());
          });
          setRequestedList({ items: allData });
          console.log(allData);
          setIsFetched(true);
        },
        (err) => {
          setIsFetched(false);
          console.log('error while fetching requestid list:', err);
        }
      );
  };

  return (
    <RequestedListContext.Provider
      value={{ requestedList, isFetched, getRequestedList }}
    >
      {children}
    </RequestedListContext.Provider>
  );
};
