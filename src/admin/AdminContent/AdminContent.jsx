// import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { MdSettings, MdNotificationsActive } from "react-icons/md";
import { TfiSearch } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { Outlet } from "react-router-dom";
import { Container } from "reactstrap";

const AdminContent = () => {
  return (
    <Container fluid className="pt-3">
      <Outlet />
    </Container>
  );
};

export default AdminContent;
