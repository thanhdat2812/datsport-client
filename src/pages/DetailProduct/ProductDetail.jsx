// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import React, { useState } from "react";

import classnames from "classnames";
import { Markup } from "react-render-markup";
import DefaultImg from "../../assets/images/default.png";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Tooltip,
} from "reactstrap";
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import BreadCrumb from "../../component/Common/BreadCrumb";
import useProductDetail from "../../hooks/useProductDetail";
import { formatCurrency } from "../../utils/common.js";
import { addToCart } from "../../redux/cartSlice";
import "./ProductDetail.scss";

SwiperCore.use([FreeMode, Navigation, Thumbs]);
const sizes = [
  { name: "XS" },
  { name: "S" },
  { name: "M" },
  { name: "L" },
  { name: "XL" },
];
function ProductDetail(props) {
  const { id } = useParams();
  const { product, brand, category, loading } = useProductDetail(id);

  const [thumbsSwiper, setThumbsSwiper] = useState([]);

  const [size, setSize] = useState(sizes[1]);

  const [customActiveTab, setcustomActiveTab] = useState("1");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.auth.data);

  const handleAddToCart = () => {
    if (userDetail) {
      dispatch(
        addToCart({
          productId: product.productId,
          price: product.productPrice,
          productSize: size.name,
          accountId: userDetail.id,
          quantity: 1,
        })
      );
    } else {
      navigate("/login");
    }
  };

  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  return (
    <Container >
      <BreadCrumb title="Product Details" pageTitle="Home" />
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <Row className="gx-lg-5">
                <Col xl={6} md={8} className="mx-auto">
                  <div className="product-img-slider sticky-side-div">
                    <Swiper
                      navigation={true}
                      // thumbs={{ swiper: thumbsSwiper }}
                      className="swiper product-thumbnail-slider p-2 rounded bg-light"
                    >
                      <div className="swiper-wrapper">
                        <SwiperSlide>
                          <img
                            src={product.productImage1 || DefaultImg}
                            alt=""
                            className="img-fluid d-block"
                          />
                        </SwiperSlide>
                        {product.productImage2 && (
                          <SwiperSlide>
                            <img
                              src={product.productImage2}
                              alt=""
                              className="img-fluid d-block"
                            />
                          </SwiperSlide>
                        )}
                        {product.productImage3 && (
                          <SwiperSlide>
                            <img
                              src={product.productImage3}
                              alt=""
                              className="img-fluid d-block"
                            />
                          </SwiperSlide>
                        )}
                        {product.productImage4 && (
                          <SwiperSlide>
                            <img
                              src={product.productImage4}
                              alt=""
                              className="img-fluid d-block"
                            />
                          </SwiperSlide>
                        )}
                        {product.productImage5 && (
                          <SwiperSlide>
                            <img
                              src={product.productImage5}
                              alt=""
                              className="img-fluid d-block"
                            />
                          </SwiperSlide>
                        )}
                      </div>
                    </Swiper>

                    <div className="product-nav-slider mt-2">
                      <Swiper
                        onSwiper={setThumbsSwiper}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        spaceBetween={10}
                        className="swiper product-nav-slider mt-2 overflow-hidden"
                      >
                        <div className="swiper-wrapper">
                          <SwiperSlide className="rounded">
                            <div className="nav-slide-item">
                              <img
                                src={product.productImage1 || DefaultImg}
                                alt=""
                                className="img-fluid d-block rounded"
                              />
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="nav-slide-item">
                              <img
                                src={product.productImage2 || DefaultImg}
                                alt=""
                                className="img-fluid d-block rounded"
                              />
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="nav-slide-item">
                              <img
                                src={product.productImage3 || DefaultImg}
                                alt=""
                                className="img-fluid d-block rounded"
                              />
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="nav-slide-item">
                              <img
                                src={product.productImage4 || DefaultImg}
                                alt=""
                                className="img-fluid d-block rounded"
                              />
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="nav-slide-item">
                              <img
                                src={product.productImage5 || DefaultImg}
                                alt=""
                                className="img-fluid d-block rounded"
                              />
                            </div>
                          </SwiperSlide>
                        </div>
                      </Swiper>
                    </div>
                  </div>
                </Col>

                <Col xl={6}>
                  <div className="mt-xl-0 mt-5">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <h4>{product.productName}</h4>
                        <div className="hstack gap-3 flex-wrap">
                          {product.productHot && (
                            <div>
                              <span class="badge badge-label bg-danger">
                                <i class="mdi mdi-circle-medium"></i> Hot
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <Row className="mt-4">
                      <Col   sm={6}>
                        <div className="p-2 border border-dashed rounded">
                          <div className="d-flex align-items-center">
                            <div className="avatar-sm me-2">
                              <div className="avatar-title rounded bg-transparent text-success fs-24">
                                <i className="ri-money-dollar-circle-fill"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <p className="text-muted mb-1">Price :</p>
                              <h5 className="mb-0">
                                {formatCurrency(product.productPrice)}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div className="p-2 border border-dashed rounded">
                          <div className="d-flex align-items-center">
                            <div className="avatar-sm me-2">
                              <div className="avatar-title rounded bg-transparent text-success fs-24">
                                <i className="ri-stack-fill"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <p className="text-muted mb-1">In stocks :</p>
                              <h5 className="mb-0">
                                {product.productQuantity}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col xl={6}>
                        <div className=" mt-4">
                          <h5 className="fs-14">Sizes :</h5>
                          <div className="d-flex flex-wrap gap-2">
                            {sizes.map((item, index) => (
                              <>
                                <Input
                                  type="radio"
                                  className="btn-check"
                                  name="productsize-radio"
                                />
                                <Label
                                  className={`${
                                    size.name == item.name ? "selected" : ""
                                  } btn btn-soft-primary  avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center`}
                                  id="TooltipXSSize"
                                  onClick={() => {
                                    setSize(item);
                                  }}
                                >
                                  {item.name}
                                </Label>
                              </>
                            ))}
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xl={6}>
                        <button
                          onClick={handleAddToCart}
                          className=" mt-3 btn btn-success text-center stretched-link"
                        >
                          Add to cart
                        </button>
                      </Col>
                    </Row>
                    <Row class="mt-2">
                      <Col>
                        <div className="product-content mt-5">
                          <h5 className="fs-14 mb-3">Product Description :</h5>
                          <Nav tabs className="nav-tabs-custom nav-success">
                            <NavItem>
                              <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                  active: customActiveTab === "1",
                                })}
                                onClick={() => {
                                  toggleCustom("1");
                                }}
                              >
                                Specification
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                  active: customActiveTab === "2",
                                })}
                                onClick={() => {
                                  toggleCustom("2");
                                }}
                              >
                                Details
                              </NavLink>
                            </NavItem>
                          </Nav>

                          <TabContent
                            activeTab={customActiveTab}
                            className="border border-top-0 p-4"
                            id="nav-tabContent"
                          >
                            <TabPane id="nav-speci" tabId="1">
                              <div className="table-responsive">
                                <table className="table mb-0">
                                  <tbody>
                                    <tr>
                                      <th
                                        scope="row"
                                        style={{ width: "200px" }}
                                      >
                                        Category
                                      </th>
                                      <td>{category.categoryName}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Brand</th>
                                      <td>{brand.brandName}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </TabPane>
                            <TabPane id="nav-detail" tabId="2">
                              <Markup markup={product.productDescription} />
                            </TabPane>
                          </TabContent>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
