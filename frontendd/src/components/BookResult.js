import React, { useContext, useState, useEffect } from 'react';
import { ResultDetails } from './ResultDetails';
import { BookInfo } from './BookInfo';
import PageNav from './PageNav';
import { RequestedListContext } from '../contexts/RequestedListContext';
import { SearchResultContext } from '../contexts/SearchResultContext';

export const BookResult = () => {
  // get contexts
  const { requestedList } = useContext(RequestedListContext);
  const { results, isLoading, fetched } = useContext(SearchResultContext);

  // arrays for containing new filtered results data
  let requestedData = { items: [] };
  let unrequestedData = { items: [] };

  // function for separating requested and unrequested search result
  const filterSearchResults = () => {
    if (typeof results === 'undefined' || !results.data.items) return;
    const searchResults = results.data.items;
    const requestedBookList = requestedList.items;
    const requestedResults = requestedBookList.filter((item, i, arr) => {
      for (let result of searchResults) {
        if (result.id === item.id) {
          result.status = 'requested';
          return result;
        }
      }
    });

    const unrequestedResults = searchResults.filter((result) => {
      if (typeof result.status === 'undefined') return result;
    });
    requestedData.items = requestedResults.reverse();
    unrequestedData.items = unrequestedResults;
  };

  // run search filtering
  filterSearchResults();

  return (
    <div>
      <ResultDetails />
      {requestedData.items.length !== 0 ? (
        <React.Fragment>
          <h3>Hasil dari buku yang telah di request</h3>
          <BookInfo category="reqSection" data={requestedData} />
        </React.Fragment>
      ) : null}
      {unrequestedData.items.length !== 0 ? (
        <React.Fragment>
          <h3>Hasil buku yang belumdi request</h3>
          <BookInfo category="bookResult" data={unrequestedData} />
        </React.Fragment>
      ) : null}
    </div>
  );
};
