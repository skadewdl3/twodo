import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';

const SignIn = () => {
  const [error, setError] = useState(null);

  const signIn = () => {
    const email = document.querySelector('.signin__email').value;
    const password = document.querySelector('.signin__password').value;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        setError(err.message);
      });
  };

  useEffect(() => {
    let el = document.querySelector('.signin');
    el.style.height = getComputedStyle(el).getPropertyValue('height');
  }, []);

  return (
    <div className="signin">
      <form
        className="signin__form"
        onSubmit={e => {
          e.preventDefault();
          signIn();
        }}
      >
        <div className="signin__header">Sign In</div>
        <div className="signin__input__wrapper" onFocus={() => setError(null)}>
          <input
            placeholder="Email"
            type="text"
            className="signin__input signin__email"
          />
        </div>
        <div className="signin__input__wrapper" onFocus={() => setError(null)}>
          <input
            placeholder="Password"
            type="Password"
            className="signin__input signin__password"
          />
        </div>
        <button className="signin__cta">Sign In</button>
        {error && <div className="signin__error">{error}</div>}
        <div className="signin__option">
          Don't have an account yet ? <Link to="/signup">Sign Up</Link>.
        </div>
      </form>
    </div>
  );
};

export default SignIn;
