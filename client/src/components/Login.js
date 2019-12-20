import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';

const Login = () => {
  // make a post request to retrieve a token from the api

  const [credentials, updateCreds] = useState ({
    username: "",
    password: ""
  })


  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", credentials)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("token", res.data.payload);
        // props.history.push(/) BubblePage
      })
      .catch(err => console.error(err) );

  }

  const handleChange = e => {
    updateCreds ({
      ...credentials,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="User Name"
            onChange={handleChange}
            value={credentials.username}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            value={credentials.password}
          />
          <button
            type="button"
            onClick={handleSubmit}
          >
          Log In
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
