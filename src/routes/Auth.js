import AuthForm from 'components/AuthForm';
import { authService, firebaseInstance } from 'fBase';
import React, { useState } from 'react';

const Auth = () => {
  const [error, setError] = useState('');

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      //google login
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      //github login
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
      <div>{error}</div>
    </div>
  );
};
export default Auth;
