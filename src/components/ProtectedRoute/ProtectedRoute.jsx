
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { DataContext } from "../DataProvider/DataProvider";

function ProtectedRoute({ children, msg, redirect }) {
  const [{ user }] = useContext(DataContext);

  if (!user) {
    return (
      <Navigate
        to="/Login"
        state={{
          msg: msg,
          redirect: redirect
        }}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;
