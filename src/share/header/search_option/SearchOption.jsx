import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "reactstrap";

//SimpleBar
import SimpleBar from "simplebar-react";

import { formatCurrency } from "../../../utils/common";
import productApi from '../../../api/product'


const SearchOption = () => {
  const [value, setValue] = useState("");
  const [products, setProducts] = useState([]);
  const [posts, setPosts] = useState([]);

  const onChangeData = async (value) => {
    setValue(value);
    const searchResult=await productApi.getAll({pageNumber:0,pageSize:5,keyword:value});
    setProducts(searchResult.content);
    console.log(searchResult);
  };

  useEffect(() => {
    var searchOptions = document.getElementById("search-close-options");
    var dropdown = document.getElementById("search-dropdown");
    var searchInput = document.getElementById("search-options");

    searchInput.addEventListener("focus", function () {
      var inputLength = searchInput.value.length;
      if (inputLength > 0) {
        dropdown.classList.add("show");
        searchOptions.classList.remove("d-none");
      } else {
        dropdown.classList.remove("show");
        searchOptions.classList.add("d-none");
      }
    });

    searchInput.addEventListener("keyup", function () {
      var inputLength = searchInput.value.length;
      if (inputLength > 0) {
        dropdown.classList.add("show");
        searchOptions.classList.remove("d-none");
      } else {
        dropdown.classList.remove("show");
        searchOptions.classList.add("d-none");
      }
    });

    searchOptions.addEventListener("click", function () {
      searchInput.value = "";
      dropdown.classList.remove("show");
      searchOptions.classList.add("d-none");
    });

    document.body.addEventListener("click", function (e) {
      if (e.target.getAttribute("id") !== "search-options") {
        dropdown.classList.remove("show");
        searchOptions.classList.add("d-none");
      }
    });
  }, []);

  return (
    <React.Fragment>
      <form className="app-search p-2">
        <div className="position-relative">
          <Input
            type="text"
            className="form-control"
            placeholder="Search products..."
            id="search-options"
            value={value}
            onChange={(e) => {
              onChangeData(e.target.value);
            }}
          />
          <span className="mdi mdi-magnify search-widget-icon"></span>
          <span
            className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
            id="search-close-options"
          ></span>
        </div>
        <div className="dropdown-menu dropdown-menu-lg" id="search-dropdown">
          <SimpleBar style={{ height: "320px",width:'100%'}}>
            <div className="dropdown-header mt-2">
              <h6 className="text-overflow text-muted mb-2 text-uppercase">
                Products
              </h6>
            </div>

            <div className="notification-list">
              {products.map((product) => (
                <Link to={`/detail-product/${product.productId}`} className="dropdown-item notify-item py-2 ">
                  <div className="d-flex mx-2">
                    <img
                      src={product.productImage1}
                      className="me-3 rounded-circle avatar-xs"
                      alt="user-pic"
                    />
                    <div className="flex-1">
                      <h6 className="m-0">{product.productName}</h6>
                      <span className="fs-11 mb-0 text-muted">{formatCurrency(product.productPrice)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </SimpleBar>

          {/* <div className="text-center pt-3 pb-1">
            <Link to="/pages-search-results" className="btn btn-primary btn-sm">
              View All Results <i className="ri-arrow-right-line ms-1"></i>
            </Link>
          </div> */}
        </div>
      </form>
    </React.Fragment>
  );
};

export default SearchOption;
