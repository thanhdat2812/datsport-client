import React from "react";
import Revenue from "./Revenue";
import BreadCrumb from "../../component/Common/BreadCrumb";

const Dashboard = () => {
  return (
    <React.Fragment>
      <BreadCrumb pageTitle={"Admin"} title={"Dashboard"} />
      <Revenue />
    </React.Fragment>
  );
};

export default Dashboard;
