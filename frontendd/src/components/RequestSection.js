import React, { useEffect, useState } from 'react';
import { BookInfo } from './BookInfo';
import { useContext } from 'react';
import { RequestedListContext } from '../contexts/RequestedListContext';

export const RequestSection = () => {
  const { requestedList } = useContext(RequestedListContext);
  return (
    <div>
      <h2>Buku Paling Banyak Di Request</h2>
      <BookInfo category="reqSection" data={requestedList} />
    </div>
  );
};
