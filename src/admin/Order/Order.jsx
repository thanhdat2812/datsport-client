import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  Modal,
  ModalHeader,
  Form,
  ModalBody,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import * as moment from "moment";
import { Link } from "react-router-dom";
import classnames from "classnames";

import BreadCrumb from "../../component/Common/BreadCrumb";
import TableContainer from "../../component/Common/TableContainer";


// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";
import { fetchAllOrders } from "../../redux/orderSlice";
import { ToastContainer } from "react-toastify";


const Order = () => {


  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.order);

  const [orderList, setOrderList] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    setOrderList(orders);
  }, [orders]);

  const orderType={
    "all":-1,
    "processing":1,
    "confirmed":2,
    "cancelled":3
  }

  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      let filteredOrders = orders;
      if (type !== "all") {
        filteredOrders = orders.filter((order) => order.billStatus === orderType[type]);
      }
      setOrderList(filteredOrders);
    }
  };

 

  useEffect(() => {
    if (orders && !orders.length) {
      dispatch(fetchAllOrders());
    }
  }, [dispatch]);

  // Column
  const columns = useMemo(
    () => [
      {
        Header: "Order Id",
        accessor: "billId",
        filterable: false,
        Cell: (cell) => {
          return (
            <Link
              to="#"
              className="fw-medium link-primary"
            >
              #{cell.value}
            </Link>
          );
        },
      },
      {
        Header: "Customer",
        accessor: "account",
        filterable: false,
        Cell: (cell) => {
          const account = cell.row.original.account;
          return (
            <>
              <p>{account.userEmail}</p>
              <p>{account.userFullname}</p>
            </>
          );
        },
      },

      {
        Header: "Order Date",
        accessor: "orderDate",
        Cell: (order) => (
          <>
            {handleValidDate(order.row.original.billDate)}
            
          </>
        ),
      },
      {
        Header: "Amount",
        accessor: "billTotal",
        filterable: false,
      },
      {
        Header: "Payment Method",
        accessor: "billPayment",
        filterable: false,
      },
      {
        Header: "Bill Status",
        accessor: "billStatus",
        Cell: (cell) => {
          switch (cell.value) {
            case 1:
              return (
                <span className="badge text-uppercase badge-soft-primary">
                  {" "}
                  Processing...{" "}
                </span>
              );
            case 2:
              return (
                <span className="badge text-uppercase badge-soft-success">
                  {" "}
                  Confirmed{" "}
                </span>
              );
            case 3:
              return (
                <span className="badge text-uppercase badge-soft-danger">
                  {" "}
                  Cancelled{" "}
                </span>
              );
            case "Pickups":
              return (
                <span className="badge text-uppercase badge-soft-info">
                  {" "}
                  {cell.value}{" "}
                </span>
              );
            case "Returns":
              return (
                <span className="badge text-uppercase badge-soft-primary">
                  {" "}
                  {cell.value}{" "}
                </span>
              );
            case "Delivered":
              return (
                <span className="badge text-uppercase badge-soft-success">
                  {" "}
                  {cell.value}{" "}
                </span>
              );
            default:
              return (
                <span className="badge text-uppercase badge-soft-warning">
                  {" "}
                  {cell.value}{" "}
                </span>
              );
          }
        },
      },

      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item">
                <Link
                  to={`/admin/process-order/${cellProps.row.original.billId}`}
                  className="text-primary d-inline-block"
                >
                  <i className="ri-eye-fill fs-16"></i>
                </Link>
              </li>
            
            </ul>
          );
        },
      },
    ],
    []
  );

  const defaultdate = () => {
    let d = new Date(),
      months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    let h = d.getHours() % 12 || 12;
    let ampm = d.getHours() < 12 ? "AM" : "PM";
    return (
      d.getDate() +
      " " +
      months[d.getMonth()] +
      ", " +
      d.getFullYear() +
      ", " +
      h +
      ":" +
      d.getMinutes() +
      " " +
      ampm
    ).toString();
  };

  const [date, setDate] = useState(defaultdate());

  

  const handleValidDate = (date) => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };


  document.title = "All Bills";
  return (
    <Container fluid>
      <BreadCrumb title="Orders" pageTitle="Admin" />
      <Row>
        <Col lg={12}>
          <Card id="orderList">
            <CardHeader className="card-header border-0">
              <Row className="align-items-center gy-3">
                <div className="col-sm">
                  <h5 className="card-title mb-0">Order History</h5>
                </div>
             
              </Row>
            </CardHeader>

            <CardBody className="pt-0">
              <div>
                <Nav
                  className="nav-tabs nav-tabs-custom nav-success"
                  role="tablist"
                >
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => {
                        toggleTab("1", "all");
                      }}
                      href="#"
                    >
                      <i className="ri-store-2-fill me-1 align-bottom"></i> All
                      Orders
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "2" })}
                      onClick={() => {
                        toggleTab("2", "processing");
                      }}
                      href="#"
                    >
                      <i className="ri-checkbox-circle-line me-1 align-bottom"></i>{" "}
                      Processing
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "3" })}
                      onClick={() => {
                        toggleTab("3", "confirmed");
                      }}
                      href="#"
                    >
                      <i className="ri-truck-line me-1 align-bottom"></i>{" "}
                      Confirmed{" "}
                      {/* <span className="badge bg-danger align-middle ms-1">
                        2
                      </span> */}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "4" })}
                      onClick={() => {
                        toggleTab("4", "cancelled");
                      }}
                      href="#"
                    >
                      <i className="ri-arrow-left-right-fill me-1 align-bottom"></i>{" "}
                      Cancelled
                    </NavLink>
                  </NavItem>
                  
                </Nav>
                {orderList.length ? (
                  <TableContainer
                    columns={columns}
                    data={orderList || []}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    customPageSize={8}
                    divClass="table-responsive table-card mb-1"
                    tableClass="align-middle table-nowrap"
                    theadClass="table-light text-muted text-uppercase"
                    isOrderFilter={true}
                    SearchPlaceholder="Search for order ID, customer, order status or something..."
                  />
                ) : ( 
                  
                  <div className="text-center pt-5">
                    <h4>No orders to show</h4>
                  </div>                 
                )}
              </div>

              <ToastContainer closeButton={false} limit={1} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Order;
