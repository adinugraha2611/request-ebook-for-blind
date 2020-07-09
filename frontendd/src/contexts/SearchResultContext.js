import React, { useState, createContext, useReducer } from 'react';

export const SearchResultContext = createContext();

export const SearchResultProvider = ({ children }) => {
  const [results, setResults] = useState({
    data: {},
  });
  const [fetched, setFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const getData = (url, keywords) => {
    // don't run if searchbar is empty
    if (keywords === '') return null;

    setIsLoading(true);
    fetch(url(keywords))
      .then((res) => res.json())
      .then((json) => {
        setResults({ data: json });
        setFetched(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <SearchResultContext.Provider
      value={{ results, fetched, isLoading, getData }}
    >
      {children}
    </SearchResultContext.Provider>
  );
};
