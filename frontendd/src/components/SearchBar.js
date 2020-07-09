import React, { useContext, useState } from 'react';
import { SearchResultContext } from '../contexts/SearchResultContext';
import { useLocation } from 'react-router-dom';
import { LiveMessage } from 'react-aria-live';

export const SearchBar = ({ onChange, keywords }) => {
  const searchResultContext = useContext(SearchResultContext);
  const { results, fetched, isLoading, getData } = searchResultContext;

  const getUrl = (keywords) => {
    const url = new URL('https://www.googleapis.com/books/v1/volumes');
    const params = {
      q: keywords,
      startIndex: 0,
      maxResults: 15,
    };
    url.search = new URLSearchParams(params).toString();
    return url;
  };

  const enterOnSearchField = (e) => {
    if (e.keyCode === 13) {
      getData(getUrl, keywords);
    }
  };

  return (
    <div>
      <input
        type="text"
        name="keywords"
        placeholder="ketik judul dan pengarang untuk hasil lebih akurat"
        onChange={(e) => onChange(e)}
        onKeyUp={enterOnSearchField}
        value={keywords}
      />
      <input
        type="button"
        value="Cari"
        onClick={getData.bind(this, getUrl, keywords)}
      />
    </div>
  );
};
