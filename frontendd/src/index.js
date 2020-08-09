import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { RequestedListProvider } from './contexts/RequestedListContext';
import { SearchResultProvider } from './contexts/SearchResultContext';
import { withRouter, BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { ToastProvider } from './contexts/ToastContext';

ReactDOM.render(
  <BrowserRouter>
    <SearchResultProvider>
      <RequestedListProvider>
        <UserProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </UserProvider>
      </RequestedListProvider>
    </SearchResultProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
