import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { token } = useSelector((store) => store.auth);

  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: pathname }} replace />
  );
};
