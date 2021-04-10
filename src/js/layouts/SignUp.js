import React, { useState, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';

const SignUp = () => {
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  useEffect(() => {
    let el = document.querySelector('.signup');
    el.style.height = getComputedStyle(el).getPropertyValue('height');
  }, []);

  const signUp = () => {
    const name = document.querySelector('.signup__name').value;
    const email = document.querySelector('.signup__email').value;
    const password = document.querySelector('.signup__password').value;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res.user.uid);
        firebase
          .firestore()
          .collection('userData')
          .doc(res.user.uid)
          .set({
            name,
            email,
            data: [],
          })
          .then(() => setRedirect(true))
          .catch(err => setError(err.message));
      })
      .catch(err => {
        setError(err.message);
        console.log(err);
      });
  };

  return (
    <div className="signin">
      {redirect && <Redirect to="/" />}
      <form
        className="signup__form"
        onSubmit={e => {
          e.preventDefault();
          signUp();
        }}
      >
        <div className="signup__header">Sign Up</div>
        <div className="signup__input__wrapper" onFocus={() => setError(null)}>
          <input
            placeholder="Name"
            type="text"
            className="signup__input signup__name"
          />
        </div>
        <div className="signup__input__wrapper" onFocus={() => setError(null)}>
          <input
            placeholder="Email"
            type="text"
            className="signup__input signup__email"
          />
        </div>
        <div className="signup__input__wrapper" onFocus={() => setError(null)}>
          <input
            placeholder="Password"
            type="Password"
            className="signup__input signup__password"
          />
        </div>
        <button className="signup__cta">Sign Up</button>
        {error && <div className="signup__error">{error}</div>}
        <div className="signup__option">
          Already have an account ? <Link to="/signin">Sign In</Link>.
        </div>
      </form>
    </div>
  );
};

export default SignUp;
