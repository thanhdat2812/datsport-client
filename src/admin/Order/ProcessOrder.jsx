import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  CardHeader,
  Collapse,
} from "reactstrap";


import { Link, useParams } from "react-router-dom";
import { formatCurrency } from "../../utils/common.js";

import BreadCrumb from "../../component/Common/BreadCrumb.js";

import ProductDetails from "../../pages/BillDetail/ProductDetails.jsx";


import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, fetchOrderById, updateOrder } from "../../redux/orderSlice.js";

const ProcessOrder = (props) => {
  const { billId } = useParams();
  const dispatch = useDispatch();

  const { selectedOrder, billDetails } = useSelector((state) => state.order);

  const CANCEL_STATUS = 3;
  const CONFIRM_STATUS = 2;

  const handleCancelOrder =async () => {
    await dispatch(
      updateOrder({
        bill_id: selectedOrder.billId,
        user_id: selectedOrder.account.userId,
        bill_total: selectedOrder.billTotal,
        bill_payment: selectedOrder.billPayment,
        bill_address_ship: selectedOrder.billAddressShip,
        bill_date: selectedOrder.billDate,
        bill_status: CANCEL_STATUS,
      })
    );
    dispatch(fetchOrderById({ billId }));
    dispatch(fetchAllOrders());
  };

  const handleConfirmOrder =async () => {
    await dispatch(
      updateOrder({
        bill_id: selectedOrder.billId,
        user_id: selectedOrder.account.userId,
        bill_total: selectedOrder.billTotal,
        bill_payment: selectedOrder.billPayment,
        bill_address_ship: selectedOrder.billAddressShip,
        bill_date: selectedOrder.billDate,
        bill_status: CONFIRM_STATUS,
      })
    );
    dispatch(fetchOrderById({ billId }));
    dispatch(fetchAllOrders());
  };

  useEffect(() => {
    if (selectedOrder == null || selectedOrder.billId !== billId) {
      dispatch(fetchOrderById({ billId }));
    }
  }, [dispatch, billId]);


  document.title = "Process Order";
  return (
   
      <Container fluid>
        <BreadCrumb title="Process Order" pageTitle="Admin" />

        <Row>
          <Col xl={9}>
            <Card>
              <CardHeader>
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <h5 className="card-title  mb-0">
                      Bill #{selectedOrder?.billId}
                    </h5>
                    {(selectedOrder?.billStatus == 1 && (
                      <span className="badge text-uppercase badge-soft-primary">
                        {" "}
                        Processing...{" "}
                      </span>
                    )) ||
                      (selectedOrder?.billStatus == 2 && (
                        <span className="badge text-uppercase badge-soft-success">
                          {" "}
                          Confirmed{" "}
                        </span>
                      )) ||
                      (selectedOrder?.billStatus == 3 && (
                        <span className="badge text-uppercase badge-soft-danger">
                          {" "}
                          Cancelled{" "}
                        </span>
                      ))}
                  </div>

                  <div className="flex-shrink-0 mt-2 mt-sm-0">
                  {(selectedOrder?.billStatus == 1)&&
                    <button
                      onClick={handleConfirmOrder}
                      className="btn btn-soft-success btn-sm mt-2 mr-3 mt-sm-0" 
                    >
                      <i className="mdi mdi-archive-remove-outline align-middle me-1"></i>{" "}
                      Confirm Order
                    </button>}
                    {'     '}
                  {(selectedOrder?.billStatus == 1||selectedOrder?.billStatus == 2)&&
                    <button
                      onClick={handleCancelOrder}
                      className="btn btn-soft-danger btn-sm mt-2 mt-sm-0" 
                    >
                      <i className="mdi mdi-archive-remove-outline align-middle me-1"></i>{" "}
                      Cancel Order
                    </button>}
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="table-responsive table-card">
                  <table className="table table-nowrap align-middle table-borderless mb-0">
                    <thead className="table-light text-muted">
                      <tr>
                        <th scope="col">Product Details</th>
                        <th scope="col">Item Price</th>
                        <th scope="col">Quantity</th>

                        <th scope="col" className="text-end">
                          Total Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {billDetails.map((item, key) => (
                        <ProductDetails item={item} key={key} />
                      ))}
                      <tr className="border-top border-top-dashed">
                        <td colSpan="3"></td>
                        <td colSpan="2" className="fw-medium p-0">
                          <table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                                <td>Sub Total :</td>
                                <td className="text-end">
                                  {formatCurrency(billDetails[0]?.bill?.billTotal)}
                                </td>
                              </tr>

                              <tr className="border-top border-top-dashed">
                                <th scope="row">Total ($) :</th>
                                <th className="text-end">
                                  {formatCurrency(billDetails[0]?.bill?.billTotal)}
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xl={3}>
            <Card>
              <CardHeader>
                <div className="d-flex">
                  <h5 className="card-title flex-grow-1 mb-0">
                    Customer Details
                  </h5>
                  <div className="flex-shrink-0">
                    <Link to="/user/profile/info" className="link-secondary">
                      View Profile
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled mb-0 vstack gap-3">
                  <li>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <img
                          src={selectedOrder?.account?.userImage}
                          alt=""
                          className="avatar-sm rounded"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6 className="fs-14 mb-1">
                          {selectedOrder?.account?.userFullname}
                        </h6>
                        <p className="text-muted mb-0">
                          {selectedOrder?.account?.userEmail}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <i className="ri-mail-line me-2 align-middle text-muted fs-16"></i>
                    {selectedOrder?.account?.userEmail}
                  </li>
                  <li>
                    <i className="ri-phone-line me-2 align-middle text-muted fs-16"></i>
                    {selectedOrder?.account?.userPhone}
                  </li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">
                  <i className="ri-map-pin-line align-middle me-1 text-muted"></i>{" "}
                  Billing Address
                </h5>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
                  <li className="fw-medium fs-14">
                    {selectedOrder?.account?.userFullname}
                  </li>
                  <li>{selectedOrder?.account?.userPhone}</li>
                  <li>{selectedOrder?.userAddress}</li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">
                  <i className="ri-map-pin-line align-middle me-1 text-muted"></i>{" "}
                  Shipping Address
                </h5>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
                  <li className="fw-medium fs-14">
                    {selectedOrder?.account?.userFullname}
                  </li>
                  <li>{selectedOrder?.account?.userEmail}</li>
                  <li>{selectedOrder?.billAddressShip}</li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">
                  <i className="ri-secure-payment-line align-bottom me-1 text-muted"></i>{" "}
                  Payment Details
                </h5>
              </CardHeader>
              <CardBody>
          
                <div className="d-flex align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0">Payment Method:</p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-0">{selectedOrder?.billPayment}</h6>
                  </div>
                </div>
               
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0">Total Amount:</p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-0">
                      {formatCurrency(selectedOrder?.billTotal)}
                    </h6>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

  );
};

export default ProcessOrder;
