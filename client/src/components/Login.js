import React from "react";
import { useState } from 'react';
import { auth } from "../utils/auth";

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    username: 'Lambda School',
    password: 'i<3Lambd4'
  })

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const login = e => {
    e.preventDefault();
    auth()
      .post(`/api/login`, credentials)
      .then(res => {
        console.log({res});
        window.localStorage.setItem('token', res.data.payload);
        props.history.push('/bubbles');
      })
      .catch(err => console.log(err));
  }

  return ( 
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={login}>
        <input
            type='text'
            name='username'
            placeholder='username'
            value={credentials.username}
            onChange={handleChange}
        />
        <input
            type='text'
            name='password'
            placeholder='password'
            value={credentials.password}
            onChange={handleChange}
        />
        <button>Log in</button>
      </form>
    </>
  );
};

export default Login;
