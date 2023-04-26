import React from "react";
import AdminContent from "./AdminContent/AdminContent";
import "./Admin.scss";
import Sidebar from "./SideBar/SideBar";
import { Col, Container, Row } from "reactstrap";

const Admin = () => {
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col md={3}>
            <div className="position-relative">
              <Sidebar />
            </div>
          </Col>
          <Col className="col-11" md={9}>
            <AdminContent />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Admin;
