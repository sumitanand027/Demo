import React from "react"
import { Route, Redirect } from "react-router-dom"
import { getAuth } from "@firebase/auth";

export default function PrivateRoute({ component: Component, ...rest }) {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    console.log( currentUser )
  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}
