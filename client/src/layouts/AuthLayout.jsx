import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

const AuthLayout = (props) => {
  return (
    <>
      <Outlet />
    </>
  );
};

AuthLayout.propTypes = {};

export default AuthLayout;
