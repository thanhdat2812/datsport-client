import { useSelector } from "react-redux";
// @ts-ignore
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Admin from "../admin/Admin";
import Dashboard from "../admin/DashBoard/Dashboard";
import Product from "../admin/Product/Product";
import Category from "../admin/Category/Category";
import Brand from "../admin/Brand/Brand";
import Posts from "../admin/Posts/Posts";

import Accounts from "../admin/Account/Accounts";
import Slider from "../admin/Slider/Slider";
import Order from "../admin/Order/Order";
import ProcessOrder from "../admin/Order/ProcessOrder";

import About from "../pages/About/About";
import ProductDetail from "../pages/DetailProduct/ProductDetail";

import GlobalNavigation from "../pages/GlobalNavigation/GlobalNavigation";
import Home from "../pages/Home/Home";
import PostList from "../pages/Posts/PostList";
import DetailPost from "../pages/DetailPost/DetailPost";
import InfoProfile from "../pages/InfoProfile/InfoProfile";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import ProductListing from "../pages/ProductListing/ProductListing";
import SignUp from "../pages/SignUp/SignUp";
import UserBill from "../pages/UserBill/UserBill";
import Checkout from "../pages/Checkout/Checkout";
import BillDetail from "../pages/BillDetail/BillDetail";

import UserProfile from "../pages/user_profile/UserProfile";
import Cart from "../pages/Cart/Cart";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import React, { useCallback, useMemo, useState } from "react";

const Router = () => {
  // const authToken = localStorage.getItem("auth_token");
  // const role = JSON.parse(localStorage.getItem("data_user"))?.role;
  const authToken = useSelector((state) => state.auth.authToken);
  const role = useSelector((state) => state.auth.data?.role);

  const privateRoutes = () => {
    return (
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route element={<AuthWrapper />}>
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="product" element={<Product />} />
            <Route path="account" element={<Accounts />} />
            <Route path="category" element={<Category />} />
            <Route path="brand" element={<Brand />} />
            <Route path="slider" element={<Slider />} />
            <Route path="posts" element={<Posts />} />
            <Route path="order" element={<Order />} />
            <Route path="profile" element={<InfoProfile />} />
            <Route path="process-order/:billId" element={<ProcessOrder />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    );
  };

  const publicRoutes = () => {
    return (
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/404" element={<NotFound />} />
        <Route path="/" element={<GlobalNavigation />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="home" element={<Home />} />
          <Route path="post" element={<PostList />} />
          <Route path="user/profile" element={<UserProfile />}>
            <Route index element={<InfoProfile />} />
            <Route path="info" element={<InfoProfile />} />
            <Route path="bill" element={<UserBill />} />
            <Route path="bill-detail/:billId" element={<BillDetail />} />
          </Route>
          <Route path="detail-product/:id" element={<ProductDetail />} />
          <Route path="detail-post/:id" element={<DetailPost />} />
          <Route path="product-listing/:id" element={<ProductListing />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="about" element={<About />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  };

  const AuthWrapper = () => {
    return isTokenExpired(authToken) ? (
      <Navigate to="/login" replace />
    ) : (
      <Outlet/>
    );
  };

  const isTokenExpired = (token) =>
    Date.now() >= JSON.parse(atob(token.split(".")[1])).exp * 1000;
  
  const isAuthenticated = !!authToken;

  const isAdmin = () => {
    if (!isAuthenticated) return false;
    return role === 0;
  };

  return isAdmin() ? privateRoutes() : publicRoutes();
};

export default Router;
