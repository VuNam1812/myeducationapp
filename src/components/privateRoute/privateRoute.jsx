// @flow
import React, { useEffect } from "react";
import { Route, useParams, Redirect } from "react-router-dom";
export const PrivateRoute = ({ path, account, children, ...rest }) => {
  const params = useParams();

  useEffect(() => {
    console.log(path);
  }, []);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return +params.accountId === +account.id ? (
          children
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};
