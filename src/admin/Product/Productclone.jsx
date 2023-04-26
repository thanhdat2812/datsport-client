import React, { useEffect, useState, useMemo } from "react";

import Modals from "./modal";
import { Link } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../redux/productActions";

import { openModal, closeModal } from "../../redux/modalSlice";

import {
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Nav,
  NavItem,
  NavLink,
  UncontrolledCollapse,
  Row,
  Card,
  CardHeader,
  Col,
} from "reactstrap";
import classnames from "classnames";

import { toast, ToastContainer } from "react-toastify";

// RangeSlider
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import DeleteModal from "../../component/common/DeleteModal";

import BreadCrumb from "../../component/common/BreadCrumb";
import TableContainer from "../../component/common/TableContainer";
import { Rating, Published, Price } from "./EcommerceProductCol";
//Import data
// import { productsData } from "../../common/data";

//Import actions
// import { getProducts as onGetProducts, deleteProducts } from "../../store/ecommerce/action";
import { isEmpty } from "lodash";
import Select from "react-select";

const Product = (props) => {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.product.dataAllProducts);

  useEffect(() => {
    const queryProduct = { pageNumber: 0, pageSize: 15, keyword: "" };

    dispatch(productActions.getAll(queryProduct));
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("productsData : ", productsData);
  // }, [productsData]);

  //   const toggle = () => setModal(!modal);
  const handleCreateNew = () => {
    const payload = { id: "", actionName: "create" };
    dispatch(openModal(payload));
  };

  const handleEdit = (id) => {
    const payload = { id: id, actionName: "edit" };
    dispatch(openModal(payload));
  };

  const handleRemove = () => {
    const payload = { id: 27, actionName: "delete" };
    dispatch(openModal(payload));
  };

  const { products } = [];
  // const { products } = useSelector((state) => ({
  //   products: state.Ecommerce.products,
  // }));

  const [productList, setProductList] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [product, setProduct] = useState(null);

  // useEffect(() => {
  //   if (products && !products.length) {
  //     dispatch(onGetProducts());
  //   }
  // }, [dispatch, products]);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  useEffect(() => {
    if (!isEmpty(products)) setProductList(products);
  }, [products]);

  useEffect(() => {
    onUpdate([0, 2000]);
  }, [productsData]);

  const onUpdate = (value) => {
    setProductList(productsData);

    // setProductList(
    //   productsData.filter(
    //     (product) => product.price >= value[0] && product.price <= value[1]
    //   )
    // );
  };

  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: (cell) => {
          return (
            <input
              type="checkbox"
              className="productCheckBox form-check-input"
              value={cell.row.original.productId}
            />
          );
        },
      },
      {
        Header: "Product",
        Cell: (product) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0 me-3">
                <div className="avatar-sm bg-light rounded p-1">
                  <img
                    src={product.row.original.productImage1}
                    alt=""
                    className="img-fluid d-block"
                  />
                </div>
              </div>
              <div className="flex-grow-1">
                <h5 className="fs-14 mb-1">
                  <Link
                    to="/apps-ecommerce-product-details"
                    className="text-dark"
                  >
                    {" "}
                    {product.row.original.productName}
                  </Link>
                </h5>
                <p className="text-muted mb-0">
                  Category :{" "}
                  <span className="fw-medium">
                    {" "}
                    {product.row.original.category.categoryName}
                  </span>
                </p>
              </div>
            </div>
          </>
        ),
      },
      {
        Header: "Price",
        accessor: "price",
        filterable: false,
        Cell: (product) => {
          return <Price value={product.row.original.productPrice} />;
        },
      },
      {
        Header: "Brand",
        accessor: "brand",
        filterable: false,
        Cell: (product) => {
          return <>{product.row.original.brand.brandName} </>;
        },
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <UncontrolledDropdown>
              <DropdownToggle
                href="#"
                className="btn-soft-secondary btn-sm"
                tag="button"
              >
                <i className="ri-more-fill" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem href="apps-ecommerce-product-details">
                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                  View
                </DropdownItem>

                <DropdownItem href="apps-ecommerce-add-product" onClick={() => handleEdit(cellProps.row.original.productId)}>
                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                  Edit
                </DropdownItem>

                <DropdownItem divider />
                <DropdownItem
                  href="#"
                  onClick={() => {
                    const productData = cellProps.row.original;
                  }}
                >
                  <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
    ],
    []
  );
  document.title = "Admin | Products";

  return (
    <div className="page-content">
      <ToastContainer closeButton={false} limit={1} />

      <Container fluid>
        <BreadCrumb title="Products" pageTitle="Ecommerce" />
        <Row>
          <div className="col-xl-9 col-lg-8">
            <div>
              <div className="card">
                <div className="card-body pt-0">
                  {productList && productList.length > 0 ? (
                    <>
                      <div className="card-body">
                        <div id="customerList">
                          <div className="row g-4 mb-3">
                            <div className="col-sm-auto">
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-success add-btn"
                                  data-bs-toggle="modal"
                                  id="create-btn"
                                  data-bs-target="#showModal"
                                  onClick={handleCreateNew}
                                >
                                  <i className="ri-add-line align-bottom me-1"></i>{" "}
                                  Add
                                </button>
                              </div>
                            </div>
                            <div className="col-sm">
                              <div className="d-flex justify-content-sm-end">
                                <div className="search-box ms-2">
                                  <input
                                    type="text"
                                    className="form-control search"
                                    placeholder="Search..."
                                  />
                                  <i className="ri-search-line search-icon"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <TableContainer
                        columns={columns}
                        data={productList || []}
                        isGlobalFilter={true}
                        isAddUserList={false}
                        customPageSize={10}
                        divClass="table-responsive mb-1"
                        tableClass="mb-0 align-middle table-borderless"
                        theadClass="table-light text-muted"
                        isProductsFilter={true}
                        SearchPlaceholder="Search Products..."
                      />
                    </>
                  ) : (
                    <div className="py-4 text-center">
                      <div>
                        <lord-icon
                          src="https://cdn.lordicon.com/msoeawqm.json"
                          trigger="loop"
                          colors="primary:#405189,secondary:#0ab39c"
                          style={{ width: "72px", height: "72px" }}
                        ></lord-icon>
                      </div>

                      <div className="mt-4">
                        <h5>Sorry! No Result Found</h5>
                      </div>
                    </div>
                  )}
                </div>

                {/* <div className="card-body">
                  <TabContent className="text-muted">
                    <TabPane>
                      <div
                        id="table-product-list-all"
                        className="table-card gridjs-border-none pb-2"
                      >
                      </div>
                    </TabPane>
                  </TabContent>
                </div> */}
              </div>
            </div>
          </div>
        </Row>
      </Container>
      <Modals />
    </div>
  );
};

export default Product;
