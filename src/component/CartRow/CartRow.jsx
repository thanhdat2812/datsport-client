import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatCurrency } from "../../utils/common";
import {
  fetchProducts,
  addToCart,
  updateCartItemQuantity,
  deleteCartItem,
} from "../../redux/cartSlice";

const CartRow = ({ cartItem }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.data);

  const [quantity, setQuantity] = useState(cartItem.billdetailQuantity);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      handleChangeQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    handleChangeQuantity(quantity + 1);
  };

  const handleChangeQuantity = (quantity) => {
    dispatch(
      updateCartItemQuantity({
        productId: cartItem.product.productId,
        accountId: user.id,
        productSize: cartItem.billdetailSize,
        price: cartItem.billdetailPrice,
        quantity: quantity,
      })
    );

    setQuantity(quantity);
  };

  const removeItem = ({ billdetailId }) => {
    dispatch(deleteCartItem({ billdetailId }));
  };

  return (
    <div className="card product">
      <div className="card-body">
        <div className="row gy-3">
          <div className="col-sm-auto">
            <div className="avatar-lg bg-light rounded p-1">
              <img
                src={cartItem.product.productImage1}
                alt=""
                className="img-fluid d-block"
              />
            </div>
          </div>
          <div className="col-sm">
            <h5 className="fs-14 text-truncate">
              <a href="ecommerce-product-detail.html" className="text-dark">
                {cartItem.product.productName}
              </a>
            </h5>
            <ul className="list-inline text-muted">
              <li className="list-inline-item">
                Size :{" "}
                <span className="fw-medium">{cartItem.billdetailSize}</span>
              </li>
            </ul>

            <div className="input-step light">
              <button
                onClick={decreaseQuantity}
                type="button"
                className="minus shadow"
              >
                –
              </button>
              <input
                type="number"
                className="product-quantity"
                value={quantity}
                min="0"
                max="100"
              />
              <button
                onClick={increaseQuantity}
                type="button"
                className="plus shadow"
              >
                +
              </button>
            </div>
          </div>
          <div className="col-sm-auto">
            <div className="text-lg-end">
              <p className="text-muted mb-1">Item Price:</p>
              <h5 className="fs-14">
                
                <span id="ticket_price" className="product-price">
                {formatCurrency(cartItem.billdetailPrice)}
                </span>
              </h5>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- card body --> */}
      <div className="card-footer">
        <div className="row align-items-center gy-3">
          <div className="col-sm">
            <div className="d-flex flex-wrap my-n1">
              <div>
                <a
                  href="#"
                  className="d-block text-body p-1 px-2"
                  onClick={(e) => {
                    removeItem({
                      billdetailId: cartItem.billdetailId,
                    });
                  }}
                >
                  <i className="ri-delete-bin-fill text-muted align-bottom me-1"></i>{" "}
                  Remove
                </a>
              </div>
            </div>
          </div>
          <div className="col-sm-auto">
            <div className="d-flex align-items-center gap-2 text-muted">
              <div>Total :</div>
              <h5 className="fs-14 mb-0">
                <span className="product-line-price">
                  {formatCurrency(cartItem.billdetailQuantity * cartItem.billdetailPrice)}
                </span>
              </h5>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end card footer --> */}
    </div>
  );
};

export default CartRow;
