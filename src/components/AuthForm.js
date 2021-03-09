import { authService } from 'fBase';
import React, { useState } from 'react';

const AuthForm = () => {
  const [newAccount, setNewAccount] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = async (event) => {
    event.preventDefault();
    let data = '';
    try {
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      //setError(error.message);
    }
  };
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const toggleAccount = () => setNewAccount((prev1) => !prev1);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? 'Create Account' : 'Log In'} />
      </form>
      <div>
        <span onClick={toggleAccount}>
          {newAccount ? 'SignIn' : 'CreateAccount'}
        </span>
      </div>
    </>
  );
};

export default AuthForm;
