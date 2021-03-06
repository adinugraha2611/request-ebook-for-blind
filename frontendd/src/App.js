import React, { useReducer, useEffect, useContext } from 'react';
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
import { AdminTools } from './components/AdminTools';
import { SearchResultContext } from './contexts/SearchResultContext';
import CssBaseline from '@material-ui/core/CssBaseline';

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

  // connect to local server if on localhost (development stage)
  const { setServerUrl } = useContext(RequestedListContext);
  useEffect(() => {
    if (window.location.hostname === 'localhost') {
      setServerUrl('http://localhost:5000');
      console.log(
        'You are on Development stage. Connected to server at localhost:5000'
      );
    }
  }, []);

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
      <CssBaseline />
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
            <Route path="/admin-tools">
              {userStatus.role === 'admin' ? (
                <AdminTools />
              ) : (
                <h2>error 401: unauthorized client!</h2>
              )}
            </Route>

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

      {/* show action notifications  */}
      <Toast />
    </div>
  );

  /**
   * end render components
   */
};
