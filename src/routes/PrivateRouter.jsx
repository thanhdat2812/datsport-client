import React from "react";
import { Route } from "react-router-dom";

const PrivateRouter = ({ authToken, userRole, component, path }) => {
  if (authToken && userRole === 0) {
    return <Route path={path} component={component} />;
  }
  return;
};

export default PrivateRouter;
