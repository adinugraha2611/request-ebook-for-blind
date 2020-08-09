/**
 * props:
 * - book : detailed book info
 * - uid : user's uid
 */

import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { ToastContext } from '../contexts/ToastContext';

export const ReqButton = ({ book }) => {
  // get contexts and set status
  const { userStatus } = useContext(UserContext);
  const { uid } = userStatus;
  const { showToast } = useContext(ToastContext);
  const [isRequested, setIsRequested] = React.useState(false);

  // functions
  const sendData = async () => {
    if (uid === '') return alert('Anda harus sign in sebelum request buku');

    // add book request to 'buku' collection
    book.voteSum = 1;
    const result = await fetch(
      'https://us-central1-mitranetra-1234.cloudfunctions.net/app/api/add',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ book, uid }),
      }
    )
      .then((res) => res.json())
      .then((json) => {
        console.log('adding book status:', json);
        // setIsRequested(true);
        showToast('Buku berhasil ditambahkan ke daftar request', true);
      })
      .catch((err) => {
        console.log('error while adding book:', err);
        showToast(
          'Request gagal ditambahkan. Periksa koneksi Anda dan coba lagi',
          true
        );
      });
  };

  return (
    <React.Fragment>
      {/* <span aria-live="assertive">
        {isRequested ? 'Buku berhasil ditambahkan ke daftar request' : null}
      </span> */}
      <input
        type="button"
        value="Request Buku"
        title="Request buku ini"
        onClick={sendData}
      />
    </React.Fragment>
  );
};
