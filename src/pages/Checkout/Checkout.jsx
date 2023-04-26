import React, { useState } from "react";
import { formatCurrency } from "../../utils/common";
//Import Breadcrumb
import BreadCrumb from "../../component/Common/BreadCrumb";
import { useEffect } from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Form
import { useForm } from "react-hook-form";
import { fetchProducts, deleteCartItem, checkout } from "../../redux/cartSlice";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";

import classnames from "classnames";
import { BiLoader } from "react-icons/bi";

const Checkout = () => {
  const [activeTab, setactiveTab] = useState(1);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [modal, setModal] = useState(false);
  const [deletemodal, setDeleteModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, status, loading, billTotal, successBill } =
    useSelector((state) => state.cart);
  const userDetail = useSelector((state) => state.auth.data);

  useEffect(() => {
    //Check user logged in
    if (!userDetail) navigate("/login");
    //Fetch product from cart
    dispatch(fetchProducts());
  }, [dispatch]);

  const removeItem = ({ billdetailId }) => {
    dispatch(deleteCartItem({ billdetailId }));
  };

  const toggledeletemodal = () => {
    setDeleteModal(!deletemodal);
  };

  const togglemodal = () => {
    setModal(!modal);
  };

  function toggleTab(tab) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab];

      if (tab >= 1 && tab <= 3) {
        setactiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
  }

  //Form process

  const handleClickBtnSubmit = async (data) => {
    await dispatch(checkout(data));
    toggleTab(activeTab + 1);
  };
  const handleErrors = (errors) => {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bill_id: cartItems[0]?.bill?.billId,
      user_id: userDetail?.id,
      bill_total: billTotal,
      bill_payment: "COD",
      bill_address_ship: "",
      bill_date: new Date().toISOString().split("T")[0], //yyyy-mm-dd
      bill_status: 1,
    },
  });

  const checkoutOptions = {
    bill_address_ship: {
      required: "PLease enter bill shipping address!",
    },
  };

  document.title = "Checkout";

  return (
    <React.Fragment>
      
        <Container fluid>
          <BreadCrumb title="Checkout" pageTitle="DatSport" />
          {(billTotal !== 0 && (
            <Row>
              <Col xl="8">
                <Card>
                  <CardBody className="checkout-tab">
                    <form
                      onSubmit={handleSubmit(
                        handleClickBtnSubmit,
                        handleErrors
                      )}
                    >
                      <div className="step-arrow-nav mt-n3 mx-n3 mb-3">
                        <Nav
                          className="nav-pills nav-justified custom-nav"
                          role="tablist"
                        >
                          <NavItem role="presentation">
                            <NavLink
                              href="#"
                              className={classnames(
                                {
                                  active: activeTab === 1,
                                  done: activeTab <= 2 && activeTab > 1,
                                },
                                "fs-15 p-3"
                              )}
                            >
                              <i className="ri-bank-card-line fs-16 p-2 bg-soft-primary text-primary rounded-circle align-middle me-2"></i>
                              Payment Info
                            </NavLink>
                          </NavItem>
                          <NavItem role="presentation">
                            <NavLink
                              href="#"
                              className={classnames(
                                {
                                  active: activeTab === 2,
                                  done: activeTab <= 2 && activeTab > 2,
                                },
                                "fs-15 p-3"
                              )}
                            >
                              <i className="ri-checkbox-circle-line fs-16 p-2 bg-soft-primary text-primary rounded-circle align-middle me-2"></i>
                              Finish
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </div>

                      <TabContent activeTab={activeTab}>
                        <TabPane tabId={1}>
                          <div>
                            <h5 className="mb-1">Shipping Information</h5>
                            
                            <p className="text-muted mb-4">
                              Please fill all information below
                            </p>
                          </div>
                          <Row>
                            <Col sm={6}>
                              <div className="mb-3">
                                <Label
                                  htmlFor="billinginfo-firstName"
                                  className="form-label"
                                >
                                  <h6 className="mb-1 mt-3">Shipping address</h6>
                                </Label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="billinginfo-firstName"
                                  name="bill_address_ship"
                                  placeholder="Enter shipping address"
                                  {...register(
                                    "bill_address_ship",
                                    checkoutOptions.bill_address_ship
                                  )}
                                />
                                {errors.bill_address_ship &&
                                  errors.bill_address_ship.type ===
                                    "required" && (
                                    <span className="text-danger">
                                      Please enter shipping address
                                    </span>
                                  )}
                              </div>
                            </Col>
                          </Row>
                          <div>
                            <h5 className="mb-1 mt-3">Payment Selection</h5>
                            <p className="text-muted mb-4">
                              Please select and enter your billing information
                            </p>
                          </div>

                          <Row className="g-4">
                            <Col lg={4} sm={6}>
                              <div>
                                <div className="form-check card-radio ">
                                  <input
                                    disabled
                                    id="paymentMethod01"
                                    name="paymentMethod"
                                    type="radio"
                                    className="form-check-input"
                                  />
                                  <Label
                                    className="form-check-label"
                                    htmlFor="paymentMethod01"
                                  >
                                    <span className="fs-16 text-muted me-2">
                                      <i className="ri-paypal-fill align-bottom"></i>
                                    </span>
                                    <span className="fs-14 text-wrap">
                                      Paypal
                                    </span>
                                  </Label>
                                </div>
                              </div>
                            </Col>
                            <Col lg={4} sm={6}>
                              <div>
                                <div className="form-check card-radio">
                                  <input
                                    disabled
                                    id="paymentMethod02"
                                    name="paymentMethod"
                                    type="radio"
                                    className="form-check-input"
                                    defaultChecked
                                  />
                                  <Label
                                    className="form-check-label"
                                    htmlFor="paymentMethod02"
                                  >
                                    <span className="fs-16 text-muted me-2">
                                      <i className="ri-bank-card-fill align-bottom"></i>
                                    </span>
                                    <span className="fs-14 text-wrap">
                                      Credit / Debit Card
                                    </span>
                                  </Label>
                                </div>
                              </div>
                            </Col>

                            <Col lg={4} sm={6}>
                              <div>
                                <div className="form-check card-radio">
                                  <input
                                    id="paymentMethod03"
                                    name="paymentMethod"
                                    type="radio"
                                    checked
                                    className="form-check-input"
                                  />
                                  <Label
                                    className="form-check-label"
                                    htmlFor="paymentMethod03"
                                  >
                                    <span className="fs-16 text-muted me-2">
                                      <i className="ri-money-dollar-box-fill align-bottom"></i>
                                    </span>
                                    <span className="fs-14 text-wrap">
                                      Cash on Delivery
                                    </span>
                                  </Label>
                                </div>
                              </div>
                            </Col>
                          </Row>

                          <div className="d-flex align-items-end gap-3 mt-4">
                            
                            <button
                              type="submit"
                              className="btn btn-secondary btn-label right ms-auto nexttab"
                            >
                              <i className="ri-shopping-basket-line label-icon align-middle fs-16 ms-2"></i>
                              {(loading&&<BiLoader/>)||'Complete Order'}
                            </button>
                        </div>
                        </TabPane>

                        <TabPane tabId={2} id="pills-finish">
                          <div className="text-center py-5">
                            <div className="mb-4">
                              <lord-icon
                                src="https://cdn.lordicon.com/lupuorrc.json"
                                trigger="loop"
                                colors="primary:#0ab39c,secondary:#405189"
                                style={{ width: "120px", height: "120px" }}
                              ></lord-icon>
                            </div>
                            <h5>Thank you ! Your Order is Completed !</h5>
                            {status === "loading" ? (
                              "Processing..."
                            ) : (
                              <h3 className="fw-semibold">
                                Order ID:{" "}
                                <a
                                  href="apps-ecommerce-order-details"
                                  className="text-decoration-underline"
                                >
                                  #
                                  <div>
                                    {successBill.bill_id}
                                    <Link
                                      to={`/user/profile/bill-detail/${successBill.bill_id}`}
                                      className="btn btn-success w-md mb-3"
                                    >
                                      View order detail
                                    </Link>
                                  </div>
                                </a>
                              </h3>
                            )}
                          </div>
                        </TabPane>
                      </TabContent>
                    </form>
                  </CardBody>
                </Card>
              </Col>

              <Col xl={4}>
                <Card>
                  <CardHeader>
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-0">Order Summary</h5>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="table-responsive table-card">
                      <table className="table table-borderless align-middle mb-0">
                        <thead className="table-light text-muted">
                          <tr>
                            <th style={{ width: "90px" }} scope="col">
                              Product
                            </th>
                            <th scope="col">Product Info</th>
                            <th scope="col" className="text-end">
                              Price
                            </th>
                            <th scope="col" className="text-end">
                              &nbsp;
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item, key) => (
                            <React.Fragment key={key}>
                              <tr>
                                <td>
                                  <div className="avatar-md bg-light rounded p-1">
                                    <img
                                      src={item.product.productImage1}
                                      alt=""
                                      className="img-fluid d-block"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <h5 className="fs-14">
                                    <Link
                                      to={`/detail-product/${item.product.productId}`}
                                      className="text-dark"
                                    >
                                      {item.billdetailSize +
                                        " - " +
                                        item.product.productName}
                                    </Link>
                                  </h5>
                                  <p className="text-muted mb-0">
                                    {formatCurrency(item.billdetailPrice)} x{" "}
                                    {item.billdetailQuantity}
                                  </p>
                                </td>
                                <td className="text-end">
                                  {formatCurrency(
                                    item.billdetailPrice *
                                      item.billdetailQuantity
                                  )}
                                </td>
                                <td>
                                  {" "}
                                  <div className="ps-2">
                                    <button
                                      type="button"
                                      className="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"
                                      onClick={(e) => {
                                        removeItem({
                                          billdetailId: item.billdetailId,
                                        });
                                      }}
                                    >
                                      <i className="ri-close-fill fs-16"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            </React.Fragment>
                          ))}

                          <tr>
                            <td className="fw-semibold" colSpan="2">
                              Sub Total :
                            </td>
                            <td className="fw-semibold text-end">
                              {formatCurrency(billTotal)}
                            </td>
                            <td>&nbsp;</td>
                          </tr>
                          {/* <tr>
                          <td colSpan="2">
                            Discount{" "}
                            <span className="text-muted">(VELZON15)</span>:{" "}
                          </td>
                          <td className="text-end">- $ 50.00</td>
                        </tr>
                        <tr>
                          <td colSpan="2">Shipping Charge :</td>
                          <td className="text-end">$ 24.99</td>
                        </tr>
                        <tr>
                          <td colSpan="2">Estimated Tax (12%): </td>
                          <td className="text-end">$ 18.20</td>
                        </tr> */}
                          <tr className="table-active">
                            <th colSpan="2">Total (USD) :</th>
                            <td className="text-end">
                              <span className="fw-semibold">
                                {formatCurrency(
                                  cartItems.reduce(
                                    (acc, product) =>
                                      acc +
                                      product.billdetailPrice *
                                        product.billdetailQuantity,
                                    0
                                  )
                                )}
                              </span>
                            </td>
                            <td>&nbsp;</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )) || (
            <Row>
              <div className="text-center empty-cart" id="empty-cart">
                <div className="avatar-md mx-auto my-3">
                  <div className="avatar-title bg-soft-info text-info fs-36 rounded-circle">
                    <i className="bx bx-cart"></i>
                  </div>
                </div>
                <h5 className="mb-3">Your Cart is Empty!</h5>
                <Link to="/" className="btn btn-success w-md mb-3">
                  Shop Now
                </Link>
              </div>
            </Row>
          )}
        </Container>
     
      {/* modal Delete Address */}
      <Modal
        isOpen={deletemodal}
        role="dialog"
        autoFocus={true}
        centered
        id="removeItemModal"
        toggle={toggledeletemodal}
      >
        <ModalHeader
          toggle={() => {
            setDeleteModal(!deletemodal);
          }}
        ></ModalHeader>
        <ModalBody>
          <div className="mt-2 text-center">
            <lord-icon
              src="https://cdn.lordicon.com/gsqxdxog.json"
              trigger="loop"
              colors="primary:#f7b84b,secondary:#f06548"
              style={{ width: "100px", height: "100px" }}
            ></lord-icon>
            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
              <h4>Are you sure ?</h4>
              <p className="text-muted mx-4 mb-0">
                Are you Sure You want to Remove this Address ?
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            <button
              type="button"
              className="btn w-sm btn-light"
              onClick={() => {
                setDeleteModal(!deletemodal);
              }}
            >
              Close
            </button>
            <button
              type="button"
              className="btn w-sm btn-danger"
              onClick={() => {
                setDeleteModal(!deletemodal);
              }}
            >
              Yes, Delete It!
            </button>
          </div>
        </ModalBody>
      </Modal>

      {/* modal Add Address */}
      <Modal
        isOpen={modal}
        role="dialog"
        autoFocus={true}
        centered
        id="addAddressModal"
        toggle={togglemodal}
      >
        <ModalHeader
          toggle={() => {
            setModal(!modal);
          }}
        >
          <h5 className="modal-title" id="addAddressModalLabel">
            Address
          </h5>
        </ModalHeader>
        <ModalBody>
          <div>
            <div className="mb-3">
              <Label for="addaddress-Name" className="form-label">
                Name
              </Label>
              <input
                type="text"
                className="form-control"
                id="addaddress-Name"
                placeholder="Enter Name"
              />
            </div>

            <div className="mb-3">
              <Label for="addaddress-textarea" className="form-label">
                Address
              </Label>
              <textarea
                className="form-control"
                id="addaddress-textarea"
                placeholder="Enter Address"
                rows="2"
              ></textarea>
            </div>

            <div className="mb-3">
              <Label for="addaddress-Name" className="form-label">
                Phone
              </Label>
              <input
                type="text"
                className="form-control"
                id="addaddress-Name"
                placeholder="Enter Phone No."
              />
            </div>

            <div className="mb-3">
              <Label for="state" className="form-label">
                Address Type
              </Label>
              <select className="form-select" id="state" data-plugin="choices">
                <option value="homeAddress">Home (7am to 10pm)</option>
                <option value="officeAddress">Office (11am to 7pm)</option>
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              setModal(!modal);
            }}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              setModal(!modal);
            }}
          >
            Save
          </button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default Checkout;
