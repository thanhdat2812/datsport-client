import React from "react";
import { Route } from "react-router-dom";

const ClientRouter = ({ authToken, userRole, path, component }) => {
  return <Route path={path} component={component} />;
};

export default ClientRouter;
