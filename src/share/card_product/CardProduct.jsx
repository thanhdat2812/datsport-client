import React from "react";
import './CardProduct.scss';
import { formatCurrency } from "../../utils/common.js";

import { useEffect } from "react";

import {
  fetchProducts,
  addToCart,
  updateCartItemQuantity,
  deleteCartItem,
} from "../../redux/cartSlice";
import DefaultImg from "../../assets/images/default.png";
import { useNavigate } from "react-router-dom";
//State rtk
import { useSelector, useDispatch } from "react-redux";
import { displayToast } from '../../redux/toastSlice';

const CardProduct = ({
  productId,
  productImage1,
  productPrice,
  productName,
  productDescription,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userDetail = useSelector((state) => state.auth.data);

  const handleViewDetail = (id) => {
    navigate(`/detail-product/${id}`);
  };


  const handleSuccess = () => {
    dispatch(displayToast({ message: 'Action succeeded!',type:'success' }));
    console.log("click")
  };

  const handleError = () => {
    dispatch(displayToast({ message: 'Action succeeded!',type:'error' }));
  };
  return (
    <div className="col-lg-3 col-md-12 mb-4">
      <div className="card" style={{ borderRadius: "15px" }}>
        <div
          className="bg-image hover-overlay ripple ripple-surface ripple-surface-light img-wrapper"
          data-mdb-ripple-color="light"
        >
          <img src={productImage1} className="img-fluid img" alt="Laptop" />
        </div>
        <div className="card-body pb-0">
          <div className="d-flex justify-content-between">
            <div className="card-name">
              <p>
                <a
                  href="#!"
                  onClick={() => handleViewDetail(productId)}
                  className="text-dark"
                >
                  {productName}
                </a>
              </p>
            </div>
            <div></div>
          </div>
        </div>
        
        <div className="card-body pb-0">
          <div className="d-flex justify-content-between">
            <p>
              <a href="#" className="text-dark">
                {formatCurrency(productPrice)}
              </a>
            </p>
          </div>
        </div>
        <hr className="my-0" />
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center ">
            <button
              type="button"
              onClick={() => handleViewDetail(productId)}
              className="btn btn-primary"
            >
              View detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
