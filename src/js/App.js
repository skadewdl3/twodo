import React, { useEffect } from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import Navbar from './components/Navbar';
import SignIn from './layouts/SignIn';
import SignUp from './layouts/SignUp';
import Todos from './layouts/Todos';
import Preloader from './components/Preloader';

const firebaseConfig = {
  apiKey: 'AIzaSyA6Exvm7sLPzXzMdw0j8Zr5C_AVPGfjSB4',
  authDomain: 'twodo-e60c2.firebaseapp.com',
  projectId: 'twodo-e60c2',
  storageBucket: 'twodo-e60c2.appspot.com',
  messagingSenderId: '357027627615',
  appId: '1:357027627615:web:2a4dfbacdf9ea01a3551ea',
};

firebase.initializeApp(firebaseConfig);

const App = () => {
  const [user, loading, error] = useAuthState(firebase.auth());

  return (
    <HashRouter>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Navbar user={user} />

          <Route
            path="/signin"
            component={() => (user ? <Redirect to="/" /> : <SignIn />)}
          />
          <Route
            to="/"
            component={() =>
              user ? <Todos userData={user} /> : <Redirect to="/signin" />
            }
          />
          <Route path="/signup" component={SignUp} />
        </>
      )}
    </HashRouter>
  );
};

export default App;
