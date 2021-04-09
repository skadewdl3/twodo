import React from 'react';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
  const signOut = () => {
    firebase.auth().signOut();
  };

  return (
    <div className="navbar">
      <Link id="home-link" to="/" style={{ display: 'none' }}>
        Home
      </Link>
      <div className="navbar__left">
        <div
          onClick={() => document.querySelector('#home-link').click()}
          className="navbar__logo"
        >
          <span>Two</span>do
        </div>
      </div>
      <div className="navbar__right">
        {user ? (
          <div onClick={signOut} className="navbar__link navbar__link--signout">
            Sign Out
          </div>
        ) : (
          <>
            <div className="navbar__link navbar__link--signin">
              <Link to="/signin">Sign In</Link>
            </div>
            <div className="navbar__link navbar__link--signup">
              <Link to="/signup">Sign Up</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
