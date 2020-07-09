import React, { useEffect, useContext, useState } from 'react';
import firebase from '../firebaseConfig';
import { UserContext } from '../contexts/UserContext';

export const VoteSection = ({ bookInfo }) => {
  //jangan lupa diganti saat deploy
  const serverUrl =
    'https://us-central1-mitranetra-1234.cloudfunctions.net/app';

  const { userStatus, requestList, isSignedIn } = useContext(UserContext);
  const [voteSum, setVoteSum] = useState(bookInfo.voteSum);
  const bookRef = firebase.firestore().collection('buku').doc(bookInfo.id);
  const [votedOn, setVotedOn] = useState(false);

  // button function
  const handleVote = async () => {
    if (!isSignedIn) return alert('Anda harus  Sign In sebelum request buku!');
    if (votedOn) {
      // remove 1 voteSum from server side
      const status = await vote('remove-vote');
      // when success, update voteSum on the client-side.
      if (status === 'success') setVoteSum(voteSum - 1);
    } else {
      const status = await vote('add-vote');
      if (status === 'success') setVoteSum(voteSum + 1);
    }
    setVotedOn(!votedOn);
  };

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

  useEffect(() => {
    // if bookId exists in requestList, set votedOn to true and vise versa.
    setVotedOn(requestList.includes(bookInfo.id));
    // if signed out, return all button to initial state
    if (!isSignedIn) setVotedOn(false);
  }, [requestList, isSignedIn]);
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
