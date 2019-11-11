import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Route, Redirect } from "react-router-dom";

function AuthRoute({ component: Compoment, ...rest }) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => (user ? <Redirect to="/" /> : <Compoment {...props} />)}
    />
  );
}

export default AuthRoute;
