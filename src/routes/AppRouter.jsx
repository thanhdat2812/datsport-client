import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes } from "react-router-dom";
import * as view from "../pages";
import Login from "../pages/login/Login";
import ClientRouter from "./ClientRouter";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  const { authToken, data } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<view.Login />} /> */}
        <PrivateRouter
          path="/admin"
          authToken={authToken}
          userRole={data.role}
          element={view.Admin}
        />
        <ClientRouter path="/home" authToken={authToken} element={view.Home} />
        <ClientRouter
          path="/singup"
          authToken={authToken}
          element={view.SignUp}
        />
        <ClientRouter
          path="/"
          authToken={authToken}
          userRole={data.role}
          element={<Login />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
