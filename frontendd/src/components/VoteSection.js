import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { RequestedListContext } from '../contexts/RequestedListContext';
import { ToastContext } from '../contexts/ToastContext';

export const VoteSection = ({ bookInfo }) => {
  const { userStatus, requestList, isSignedIn } = useContext(UserContext);
  const { serverUrl } = useContext(RequestedListContext);
  const [voteSum, setVoteSum] = useState(bookInfo.voteSum);
  const [votedOn, setVotedOn] = useState(false);
  const { showToast } = useContext(ToastContext);

  // add/remove vote function
  const vote = async (action) => {
    try {
      const res = await fetch(`${serverUrl}/api/${action}`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ uid: userStatus.uid, book: bookInfo }),
      });

      return await res.json();
    } catch (err) {
      console.log(`${action} failed`, err);
    }
  };

  // button function
  const handleVote = async () => {
    if (!isSignedIn) return alert('Anda harus  Sign In sebelum request buku!');
    if (votedOn) {
      // remove 1 voteSum from server side
      const response = await vote('remove-vote');
      // when success, update voteSum on the client-side and toggle the button.
      if (response.status === 'success') {
        setVoteSum(voteSum - 1);
        setVotedOn(!votedOn);
        showToast('Request telah dibatalkan', true);
      } else {
        console.log(`removing request failed: ${response.err}`);
        showToast(
          'Request gagal dihapus. Periksa Koneksi Anda dan coba lagi',
          true
        );
      }
    } else {
      // add 1 vote from server side
      const response = await vote('add-vote');
      // when success, update vote sum on client side and toggle the button
      if (response.status === 'success') {
        setVoteSum(voteSum + 1);
        setVotedOn(!votedOn);
        showToast('Request telah ditambahkan.', true);
      } else {
        console.log(`Adding request failed: ${response.err}`);
        showToast(
          'Request gagal ditambahkan. Periksa koneksi Anda dan coba lagi',
          true
        );
      }
    }
  };

  useEffect(() => {
    // if bookId exists in requestList, set votedOn to true and vise versa.
    setVotedOn(requestList.includes(bookInfo.id));
  }, [requestList]);
  return (
    <React.Fragment>
      <div className="voteSum">
        <div>Telah diminta sebanyak:</div>
        {/* ini gak tau kenapa kalo di gabung jadi satu div, voteSum gak mau update */}
        <div>{voteSum}</div>
      </div>
      <input
        className="vote-btn"
        type="button"
        value={votedOn ? 'Batalkan Request' : '+ Request Buku'}
        onClick={handleVote}
      />
    </React.Fragment>
  );
};
