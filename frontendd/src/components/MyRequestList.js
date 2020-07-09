import React, { useRef, useContext, useState } from 'react';
import firebase from '../firebaseConfig';
import { BookInfo } from './BookInfo';

export const MyRequestList = ({ requestList }) => {
  const [data, setData] = useState({ items: [] });
  const books = [];

  // focus handler
  const headingRef = useRef();

  // show book info
  const getReqBookInfos = async (list) => {
    if (list.length === 0) return;
    await firebase
      .firestore()
      .collection('buku')
      .where('id', 'in', list)
      .get()
      .then((query) => {
        query.forEach((doc) => {
          books.unshift(doc.data());
        });
      });
    setData({ items: books });
  };

  React.useEffect(() => {
    headingRef.current.focus();
    getReqBookInfos(requestList);
  }, [requestList]);

  return (
    <React.Fragment>
      <h2 tabIndex={0} ref={headingRef}>
        Daftar Buku yang Anda Request
      </h2>
      <BookInfo category="reqSection" data={data} />
    </React.Fragment>
  );
};
