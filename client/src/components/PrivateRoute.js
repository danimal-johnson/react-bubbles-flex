import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const isLoggedIn = () => {
  return (localStorage.getItem("token") ? true : false);
}

// If we're logged in (see above), follow the rest of the
// route. Otherwise, redirect with the rest of the arguments
// to the children
export const PrivateRoute = ({ component: Component, ...rest}) => {

  return (
    <Route
      {...rest}
      render={ props =>
        isLoggedIn() ? 
          (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
      }
    />
  );
}