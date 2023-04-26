import React, { useRef, useState } from "react";
import { Col, Dropdown, DropdownMenu, DropdownToggle, Row } from "reactstrap";
import { Link } from "react-router-dom";
//SimpleBar
import SimpleBar from "simplebar-react";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, deleteCartItem } from "../../../redux/cartSlice";
import { formatCurrency } from "../../../utils/common";
import useUserDetail from "../../../hooks/useUserDetail";

const CartDropdown = () => {
  const userDetail = useUserDetail();
  const dispatch = useDispatch();
  const { cartItems, billTotal } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!userDetail.id) dispatch(fetchProducts());
  }, [dispatch]);

  const [isCartDropdown, setIsCartDropdown] = useState(false);

  const [cartItem, setCartItem] = useState(0);

  const toggleCartDropdown = () => {
    setIsCartDropdown(!isCartDropdown);
    setCartItem(cartItems.length);
  };

  const removeItem = ({ billdetailId }) => {
    dispatch(deleteCartItem({ billdetailId }));
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={isCartDropdown}
        toggle={toggleCartDropdown}
        className="topbar-head-dropdown ms-1 header-item"
      >
        <DropdownToggle
          type="button"
          tag="button"
          className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle shadow-none"
        >
          <i className="bx bx-shopping-bag fs-22"></i>
          <span className="position-absolute cartitem-badge topbar-badge fs-10 translate-middle badge rounded-pill bg-info">
            {cartItems.length}
          </span>
        </DropdownToggle>
        <DropdownMenu
          className="dropdown-menu-xl dropdown-menu-end p-0 dropdown-menu-cart"
          aria-labelledby="page-header-cart-dropdown"
        >
          <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0 fs-16 fw-semibold"> My Cart</h6>
              </Col>
              <div className="col-auto">
                <span className="badge badge-soft-warning fs-13">
                  <span className="cartitem-badge"> {cartItems.length} </span>{" "}
                  items
                </span>
              </div>
            </Row>
          </div>

          <SimpleBar style={{ maxHeight: "300px" }}>
            <div className="p-2">
              {cartItems.length == 0 && (
                <div className="text-center empty-cart" id="empty-cart">
                  <div className="avatar-md mx-auto my-3">
                    <div className="avatar-title bg-soft-info text-info fs-36 rounded-circle">
                      <i className="bx bx-cart"></i>
                    </div>
                  </div>
                  <h5 className="mb-3">Your Cart is Empty!</h5>
                  <Link
                    to="/"
                    onClick={toggleCartDropdown}
                    className="btn btn-success w-md mb-3"
                  >
                    Shop Now
                  </Link>
                </div>
              )}

              {cartItems.length > 0 &&
                cartItems.map((item, key) => (
                  <div
                    className="d-block dropdown-item text-wrap dropdown-item-cart px-3 py-2"
                    key={key}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={item.product.productImage1}
                        className="me-3 rounded-circle avatar-sm p-2 bg-light"
                        alt="user-pic"
                      />
                      <div className="flex-1">
                        <h6 className="mt-0 mb-1 fs-14">
                          <Link
                            to={`/detail-product/${item.product.productId}`}
                            className="text-reset"
                          >
                            {item.product.productName}
                          </Link>
                        </h6>
                        <p className="mb-0 fs-12 text-muted">
                          Size: <span>{item.billdetailSize}</span>
                        </p>
                        <p className="mb-0 fs-12 text-muted">
                          Quantity:{" "}
                          <span>
                            {item.billdetailQuantity} x{" "}
                            {formatCurrency(item.billdetailPrice)}
                          </span>
                        </p>
                      </div>
                      <div className="px-2">
                        <h5 className="m-0 fw-normal">
                          <span className="cart-item-price">
                            {formatCurrency(
                              item.billdetailQuantity * item.billdetailPrice
                            )}
                          </span>
                        </h5>
                      </div>
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
                    </div>
                  </div>
                ))}
            </div>
          </SimpleBar>
          {cartItems.length > 0 && (
            <div
              className="p-3 border-bottom-0 border-start-0 border-end-0 border-dashed border"
              id="checkout-elem"
            >
              <div className="d-flex justify-content-between align-items-center pb-3">
                <h5 className="m-0 text-muted">Total:</h5>
                <div className="px-2">
                  <h5 className="m-0">
                    <span id="cart-item-total">
                      {formatCurrency(billTotal)}
                    </span>
                  </h5>
                </div>
              </div>

              <Link to="/cart" className="btn btn-success text-center w-100">
                Go to cart
              </Link>
            </div>
          )}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default CartDropdown;
