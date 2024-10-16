import React from "react";
import { Navigate } from "react-router-dom";

// HOC for role-based protection
const withRole = (WrappedComponent, allowedRoles) => {
  return (props) => {
    const role = localStorage.getItem("role");

    if (!allowedRoles.includes(role)) {
      return <Navigate to="/" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withRole;
