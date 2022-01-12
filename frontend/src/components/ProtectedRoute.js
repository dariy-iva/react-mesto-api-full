import React from "react";
import { Navigate } from "react-router-dom";
import { LoggedInContext } from "../contexts/LoggedInContext";

export default function ProtectedRoute({ children }) {
  const loggedIn = React.useContext(LoggedInContext);
  return loggedIn ? children : <Navigate to="/sign-in" />;
}
