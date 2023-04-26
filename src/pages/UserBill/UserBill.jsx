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
import Select from "react-select";
import classnames from "classnames";
import Flatpickr from "react-flatpickr";
import BreadCrumb from "../../component/Common/BreadCrumb";
import TableContainer from "../../component/Common/TableContainer";

import { isEmpty } from "lodash";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderById, fetchOrders } from "../../redux/orderSlice";

// //Import actions
// import {
//   getOrders as onGetOrders,
//   addNewOrder as onAddNewOrder,
//   updateOrder as onUpdateOrder,
//   deleteOrder as onDeleteOrder,
// } from "../../../store/ecommerce/action";

import Loader from "../../component/Common/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserBill = () => {
  const [orderStatus, setorderStatus] = useState(null);
  const [orderPayement, setorderPayement] = useState(null);

  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.auth.data);

  const { orders } = useSelector((state) => state.order);

  const [orderList, setOrderList] = useState([]);
  const [order, setOrder] = useState([]);

  const orderstatus = [
    {
      options: [
        { label: "Status", value: "Status" },
        { label: "All", value: -1 },
        { label: "Processing", value: 1 },
        { label: "Confirmed", value: 2 },
        { label: "Cancelled", value: 3 },
        
      ],
    },
  ];

  const orderpayement = [
    {
      options: [
        { label: "Select Payment", value: "Select Payment" },
        { label: "All", value: "All" },
        { label: "Mastercard", value: "Mastercard" },
        { label: "Paypal", value: "Paypal" },
        { label: "Visa", value: "Visa" },
        { label: "COD", value: "COD" },
      ],
    },
  ];

  const productname = [
    {
      options: [
        { label: "Product", value: "Product" },
        { label: "Puma Tshirt", value: "Puma Tshirt" },
        { label: "Adidas Sneakers", value: "Adidas Sneakers" },
        {
          label: "350 ml Glass Grocery Container",
          value: "350 ml Glass Grocery Container",
        },
        {
          label: "American egale outfitters Shirt",
          value: "American egale outfitters Shirt",
        },
        { label: "Galaxy Watch4", value: "Galaxy Watch4" },
        { label: "Apple iPhone 12", value: "Apple iPhone 12" },
        { label: "Funky Prints T-shirt", value: "Funky Prints T-shirt" },
        {
          label: "USB Flash Drive Personalized with 3D Print",
          value: "USB Flash Drive Personalized with 3D Print",
        },
        {
          label: "Oxford Button-Down Shirt",
          value: "Oxford Button-Down Shirt",
        },
        {
          label: "Classic Short Sleeve Shirt",
          value: "Classic Short Sleeve Shirt",
        },
        {
          label: "Half Sleeve T-Shirts (Blue)",
          value: "Half Sleeve T-Shirts (Blue)",
        },
        { label: "Noise Evolve Smartwatch", value: "Noise Evolve Smartwatch" },
      ],
    },
  ];

  const [isEdit, setIsEdit] = useState(false);

  function handleorderStatus(orderStatus) {
    setorderStatus(orderStatus);
  }

  function handleorderPayement(orderPayement) {
    setorderPayement(orderPayement);
  }

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);

  // const onClickDelete = (order) => {
  //   setOrder(order);
  //   setDeleteModal(true);
  // };

  useEffect(() => {
    setOrderList(orders);
  }, [orders]);

  // useEffect(() => {
  //   if (!isEmpty(orders)) setOrderList(orders);
  // }, [orders]);
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

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      orderId: (order && order.orderId) || "",
      customer: (order && order.customer) || "",
      product: (order && order.product) || "",
      orderDate: (order && order.orderDate) || "",
      // ordertime: (order && order.ordertime) || '',
      amount: (order && order.amount) || "",
      payment: (order && order.payment) || "",
      status: (order && order.status) || "",
    },
    validationSchema: Yup.object({
      orderId: Yup.string().required("Please Enter order Id"),
      customer: Yup.string().required("Please Enter Customer Name"),
      product: Yup.string().required("Please Enter Product Name"),
      // orderDate: Yup.string().required("Please Enter Order Date"),
      // ordertime: Yup.string().required("Please Enter Order Time"),
      amount: Yup.string().required("Please Enter Total Amount"),
      payment: Yup.string().required("Please Enter Payment Method"),
      status: Yup.string().required("Please Enter Delivery Status"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateOrder = {
          _id: order ? order._id : 0,
          orderId: values.orderId,
          customer: values.customer,
          product: values.product,
          orderDate: date,
          // ordertime: values.ordertime,
          amount: values.amount,
          payment: values.payment,
          status: values.status,
        };
        // update order
        // dispatch(onUpdateOrder(updateOrder));
        validation.resetForm();
      } else {
        const newOrder = {
          _id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          orderId: values["orderId"],
          customer: values["customer"],
          product: values["product"],
          orderDate: date,
          // ordertime: values["ordertime"],
          amount: values["amount"],
          payment: values["payment"],
          status: values["status"],
        };
        // save new order
        // dispatch(onAddNewOrder(newOrder));
        validation.resetForm();
      }
      toggle();
    },
  });

  useEffect(() => {
    if (orders && !orders.length) {
      dispatch(fetchOrders({ accountId: userDetail.id, status: -1 }));
    }
  }, [dispatch]);

  // useEffect(() => {
  //   setOrder(orders);
  // }, [orders]);

  // useEffect(() => {
  //   if (!isEmpty(orders)) {
  //     setOrder(orders);
  //     setIsEdit(false);
  //   }
  // }, [orders]);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setOrder(null);
    } else {
      setModal(true);
      setDate(defaultdate());
    }
  }, [modal]);

  const handleOrderClicks = () => {
    setOrder("");
    setIsEdit(false);
    toggle();
  };

  const handleOrderClick = useCallback(
    (arg) => {
      const order = arg;
      setOrder({
        _id: order._id,
        orderId: order.orderId,
        customer: order.customer,
        product: order.product,
        orderDate: order.orderDate,
        ordertime: order.ordertime,
        amount: order.amount,
        payment: order.payment,
        status: order.status,
      });

      setIsEdit(true);
      toggle();
    },
    [toggle]
  );

  // Node API
  // useEffect(() => {
  //   if (isOrderCreated) {
  //     setOrder(null);
  //     dispatch(onGetOrders());
  //   }
  // }, [
  //   dispatch,
  //   isOrderCreated,
  // ]);

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
              to="/apps-ecommerce-order-details"
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
            {handleValidDate(order.row.original.billDate)},
            <small className="text-muted">
              {" "}
              {handleValidTime(order.row.original.billDate)}
            </small>
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
                  to={`/user/profile/bill-detail/${cellProps.row.original.billId}`}
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
    [handleOrderClick]
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

  const dateformate = (e) => {
    const dateString = e.toString().split(" ");

    let time = dateString[4];
    let H = +time.substr(0, 2);
    let h = H % 12 || 12;
    h = h <= 9 ? (h = "0" + h) : h;
    let ampm = H < 12 ? "AM" : "PM";
    time = h + time.substr(2, 3) + " " + ampm;

    const date = dateString[2] + " " + dateString[1] + ", " + dateString[3];
    const orderDate = (date + ", " + time).toString();
    setDate(orderDate);
  };

  const handleValidDate = (date) => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  const handleValidTime = (time) => {
    const time1 = new Date(time);
    const getHour = time1.getUTCHours();
    const getMin = time1.getUTCMinutes();
    const getTime = `${getHour}:${getMin}`;
    var meridiem = "";
    if (getHour >= 12) {
      meridiem = "PM";
    } else {
      meridiem = "AM";
    }
    const updateTime =
      moment(getTime, "hh:mm").format("hh:mm") + " " + meridiem;
    return updateTime;
  };



  document.title = "My Bills";
  return (
    <Container fluid>
      <BreadCrumb title="Orders" pageTitle="Ecommerce" />
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
                    handleOrderClick={handleOrderClicks}
                    isOrderFilter={true}
                    SearchPlaceholder="Search for order ID, customer, order status or something..."
                  />
                ) : (
                  <p className="w-full text-center mt-3">No bills to show</p>
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

export default UserBill;
