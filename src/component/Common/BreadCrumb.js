import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Col, Row } from "reactstrap";

const BreadCrumb = ({ title, pageTitle }) => {
  return (
    <React.Fragment>
      <Row className="mt-3">
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <a href="#">{pageTitle}</a>
            </BreadcrumbItem>
            <BreadcrumbItem active>{title}</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BreadCrumb;
