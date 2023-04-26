import React, { useRef, useState } from "react";
import CartRow from "../../component/CartRow/CartRow";
import { Link } from "react-router-dom";
//redux
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  addToCart,
  updateCartItemQuantity,
  deleteCartItem,
} from "../../redux/cartSlice";
import DefaultImg from "../../assets/images/default.png";
import { formatCurrency } from "../../utils/common";
import BreadCrumb from "../../component/Common/BreadCrumb";

const Cart = () => {
  const dispatch = useDispatch();

  //cartItems have been fetched at header/cart/dropdown
  const { cartItems, billTotal } = useSelector((state) => state.cart);

  const removeItem = ({ billdetailId }) => {
    dispatch(deleteCartItem({ billdetailId }));
  };

  return (
    <div className="container">      
    <BreadCrumb pageTitle={'Home'} title={'Cart'}/>
      {billTotal!==0&&
      <div className="row mb-3">
        <div className="col-xl-8">
          <div className="row align-items-center gy-3 mb-3">
            <div className="col-sm">
              <div>
                <h5 className="fs-14 mb-0">Your Cart (03 items)</h5>
              </div>
            </div>
            <div className="col-sm-auto">
              <a
                href="apps-ecommerce-products.html"
                className="link-primary text-decoration-underline"
              >
                Continue Shopping
              </a>
            </div>
          </div>

          {cartItems.map((cartItem, index) => (
            <CartRow key={index} cartItem={cartItem} />
          ))}
          {/* <!-- end card --> */}

          <div className="text-end mb-4">
            <Link
             to="/checkout"
              className="btn btn-success btn-label right ms-auto"
            >
              <i className="ri-arrow-right-line label-icon align-bottom fs-16 ms-2"></i>{" "}
              Checkout
            </Link>
          </div>
        </div>
        {/* <!-- end col --> */}

        <div className="col-xl-4">
          <div className="sticky-side-div">
            <div className="card">
              <div className="card-header border-bottom-dashed">
                <h5 className="card-title mb-0">Order Summary</h5>
              </div>

              <div className="card-body pt-2">
                <div className="table-responsive">
                  <table className="table table-borderless mb-0">
                    <tbody>
                      <tr>
                        <td>Sub Total :</td>
                        <td className="text-end" id="cart-subtotal">
                          {formatCurrency(billTotal)}
                        </td>
                      </tr>

                      <tr className="table-active">
                        <th>Total ($) :</th>
                        <td className="text-end">
                          <span className="fw-semibold" id="cart-total">
                            {formatCurrency(billTotal)}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* <!-- end table-responsive --> */}
              </div>
            </div>
          </div>
          {/* <!-- end stickey --> */}
        </div>
      </div>

       || (
        <div className="text-center empty-cart mt-5" id="empty-cart">
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
      )}

      {/* <!-- end row --> */}
    </div>
  );
};

export default Cart;
