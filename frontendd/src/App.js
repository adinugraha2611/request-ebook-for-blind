import React, { useReducer, useContext, useEffect } from 'react';
import { BookResult } from './components/BookResult';
import { SearchBar } from './components/SearchBar';
import { RequestSection } from './components/RequestSection';
import { RequestedListContext } from './contexts/RequestedListContext';
import { Tabs } from './components/Tabs';
import { Route, useHistory, Switch } from 'react-router-dom';
import { RegisterForm } from './components/RegisterForm';
import { UserContext } from './contexts/UserContext';
import { SignInForm } from './components/SignInForm';
import { SignOutMessage } from './components/SignOutMessage';
import { Toast } from './components/Toast';
import { MyRequestList } from './components/MyRequestList';
import { Test } from './components/Test';
import { SearchResultContext } from './contexts/SearchResultContext';

export const App = () => {
  /**
   * start input stuff
   */

  const [input, setInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    // initial form state
    { keywords: '', email: '', password: '', sendEmailVerification: true }
  );
  const onChange = (e) => {
    const value =
      e.target.name === 'sendEmailVerification'
        ? e.target.checked
        : e.target.value;
    const name = e.target.name;
    setInput({ [name]: value });
  };

  // reset form field to empty
  const emptyForm = () => {
    setInput({ keywords: '', email: '', password: '' });
  };

  /**
   * end input stuff
   */

  /**
   * start fetch data
   */
  // get required contexts
  const { getRequestedList } = useContext(RequestedListContext);
  const { fetched } = useContext(SearchResultContext);

  // useHistory() for page history navigation
  const history = useHistory();

  // get current user account status
  const {
    userStatus,
    isSignedIn,
    signOut,
    checkUserStatus,
    requestList,
    authCheckDone,
  } = useContext(UserContext);

  // get user status and fetch global requested list
  useEffect(() => {
    checkUserStatus();
    getRequestedList();
  }, [isSignedIn]);

  /**
   * end fetch data
   */
  /**
   * start render components
   */
  return (
    <div className="App">
      <h1>Request Buku Format EPUB dan Braille</h1>

      <React.Fragment>
        {authCheckDone ? (
          <Tabs userStatus={userStatus} isSignedIn={isSignedIn} />
        ) : null}
        <main>
          <Switch>
            {/* // home page */}
            <Route exact path="/">
              <SearchBar onChange={onChange} keywords={input.keywords} />
              {fetched ? <BookResult /> : null}
              <RequestSection />
            </Route>

            <Route path="/register">
              <RegisterForm
                onChange={onChange}
                emptyForm={emptyForm}
                email={input.email}
                password={input.password}
                sendEmailVerification={input.sendEmailVerification}
                history={history}
              />
            </Route>

            {/* // sign in page */}
            <Route path="/sign-in">
              <SignInForm
                onChange={onChange}
                email={input.email}
                password={input.password}
                history={history}
                emptyForm={emptyForm}
              />
            </Route>

            {/* // sign out page */}
            <Route path="/sign-out">
              <SignOutMessage
                history={history}
                isSignedIn={isSignedIn}
                signOut={signOut}
              />
            </Route>

            {/* // admin tools page */}
            <Route path="/admin-tools"></Route>

            {/* // my request list page */}
            <Route path="/user/requests">
              <MyRequestList requestList={requestList} />
            </Route>

            {/* // error page */}
            <Route>
              <h2>Halaman tidak ditemukan.</h2>
            </Route>
          </Switch>
        </main>
      </React.Fragment>

      <Toast />
    </div>
  );

  /**
   * end render components
   */
};
