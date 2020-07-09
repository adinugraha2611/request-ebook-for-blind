import React, { useRef, useEffect, useContext } from 'react';
import { SearchResultContext } from '../contexts/SearchResultContext';

export const ResultDetails = () => {
  const { results, isLoading, fetched } = useContext(SearchResultContext);
  const totalItems = results.data.totalItems;
  let resultStatus = '';

  if (isLoading) resultStatus = 'loading...';
  else if (fetched && !isLoading)
    resultStatus =
      totalItems === 0
        ? 'Pencarian tidak ditemukan'
        : `ditemukan ${totalItems} hasil`;

  // focus handling
  const resultRef = useRef();
  useEffect(() => resultRef.current.focus(), [resultStatus]);

  return (
    <span aria-live="polite" ref={resultRef} tabIndex={0}>
      {resultStatus}
    </span>
  );
};
