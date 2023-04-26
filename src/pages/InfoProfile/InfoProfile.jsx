import React, { useEffect, useState } from "react";


import { useController, useForm } from "react-hook-form";


import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,

  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

import imageApi from "../../api/img";

//import images

import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../../redux/authActions";
import { useLayoutEffect } from "react";
import DefaultImg from "../../assets/images/default.png";
import BreadCrumb from "../../component/Common/BreadCrumb";
import ChangePasswordForm from "./ChangePasswordForm/ChangePasswordForm";
import Loader from "../../component/Common/Loader";
import { BiLoader } from "react-icons/bi";

const InfoProfile = () => {
  const dispatch = useDispatch();
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [activeTab, setActiveTab] = useState("1");
  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const { userDetail, loading } = useSelector((state) => state.auth);
  const { control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  useLayoutEffect(() => {
    setSelectedImageUrl(userDetail?.image);
    if (userDetail) {
      reset({
        email: userDetail.email,
        address: userDetail.address,
        phone: userDetail.phone,
        image: userDetail.image,
        gender: userDetail.gender,
        userfullname: userDetail.userfullname,
      });
      
    }
  }, [userDetail]);


  

  const profileOptions = {
    email: {
      required: "Email cannot be empty!",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },

    gender: {
      required: "Let's choose gender!",
    },
    userfullname: {
      required: "User fullname cannot be empty!",
    },

    phone: {
      required: "Phone cannot be empty!",

      minLength: {
        value: 10,
        message: "Phone number be at least 10 characters",
      },
      maxLength: {
        value: 11,
        message: "Phone number maximum of 11 characters",
      },
    },
    address: {
      required: "Address cannot be empty!",
    },
  };

  const genderOptions = [
    { label: 'Men', value: 0 },
    { label: 'Women', value: 1 },
    { label: 'Others', value: 2 }
  ];

  const { field: genderField } = useController({
    name: 'gender',
    control,
    rules: { required: true }
  });

  const handleErrors = () => { };

  const onSubmit = async (data) => {
    const newData = { ...data, id: userDetail.id, image: selectedImageUrl, gender: parseInt(data.gender) };
    await dispatch(updateProfile(newData));
    await dispatch(getProfile());
  };

  // handle change event of input file
  const onChangeFile = async (event) => {
    const imageUrl = event.target.files[0];
    await imageApi
      .uploadImage(imageUrl)
      .then((res) => {
        setSelectedImageUrl(res.data.data.url);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    userDetail!=null &&
    <React.Fragment>
      <Container fluid >
        <BreadCrumb title='User profile' />
        <Row>
          <Col xxl={12}>
            <Card >
              <CardHeader>
                <Nav
                  className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
                  role="tablist"
                >
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => {
                        tabChange("1");
                      }}
                    >
                      <i className="fas fa-home"></i>
                      Personal Details
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="#"
                      className={classnames({ active: activeTab === "2" })}
                      onClick={() => {
                        tabChange("2");
                      }}
                      type="button"
                    >
                      <i className="far fa-user"></i>
                      Change Password
                    </NavLink>
                  </NavItem>
                </Nav>
              </CardHeader>
              <CardBody className="p-4">
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <form onSubmit={handleSubmit(onSubmit, handleErrors)}>
                      <Row>
                        <Col lg={6}>
                          <div className="text-center">
                            <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                              <img
                                src={selectedImageUrl || DefaultImg}
                                className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                alt="user-profile"
                              />
                              <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                                <input
                                  id="profile-img-file-input"
                                  type="file"
                                  className="profile-img-file-input"
                                  accept="image/*"
                                  onChange={onChangeFile}
                                  name="image"
                                />
                                <Label
                                  htmlFor="profile-img-file-input"
                                  className="profile-photo-edit avatar-xs"
                                >
                                  <span className="avatar-title rounded-circle bg-light text-body">
                                    <i className="ri-camera-fill"></i>
                                  </span>
                                </Label>
                              </div>
                            </div>
                            <h5 className="fs-16 mb-1">
                              {userDetail?.userfullname}
                            </h5>
                            <p className="text-muted mb-0">
                              {userDetail?.email}
                            </p>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="emailInput"
                              className="form-label"
                            >
                              Email
                            </Label>
                            <input
                              type="text"
                              className="form-control"
                              id="emailInput"
                              placeholder="Enter your email"
                              name="email"
                              {...register("email", profileOptions.email)}
                            />
                            <p class="text-red-500">
                              {errors?.email?.message}
                            </p>
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="fullnameInput"
                              className="form-label"
                            >
                              Full name
                            </Label>
                            <input
                              type="text"
                              className="form-control"
                              id="fullnameInput"
                              placeholder="Enter your full name"
                              name="userfullname"
                              {...register(
                                "userfullname",
                                profileOptions.userfullname
                              )}
                            />

                            <p className="text-red-500">
                              {errors?.userfullname?.message}
                            </p>
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="skillsInput"
                              className="form-label"
                            >
                              Gender
                            </Label>
                            <select
                              {...genderField}
                              className="form-select mb-3"
                              name="gender"

                            >
                              {genderOptions.map((option) =>
                                <option key={option.value} value={option.value}>{option.label} </option>
                              )}


                            </select>
                            <small className="text-red-500">
                              {errors?.gender && errors.gender.message}
                            </small>
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="phoneInput"
                              className="form-label"
                            >
                              Phone Number
                            </Label>
                            <input
                              type="text"
                              className="form-control"
                              id="phoneInput"
                              placeholder="Enter your phone number"
                              name="phone"
                              {...register("phone", profileOptions.phone)}
                            />
                            <p className="text-red-500">
                              {errors?.phone?.message}
                            </p>
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="addressInput"
                              className="form-label"
                            >
                              Address
                            </Label>
                            <input
                              type="text"
                              className="form-control"
                              id="addressInput"
                              placeholder="Enter your address"
                              name="address"
                              {...register("address", profileOptions.address)}
                            />
                            <p className="text-red-500">
                              {errors?.address?.message}
                            </p>
                          </div>
                        </Col>

                        <Col lg={12}>
                          <div className="hstack gap-2 justify-content-end">
                            <button type="submit" className="btn btn-primary">
                              {(loading && <BiLoader />) || 'Update'}
                            </button>
                            <button
                              type="button"
                              className="btn btn-soft-danger"
                            >
                              Cancel
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </form>
                  </TabPane>

                  <TabPane tabId="2">
                    <ChangePasswordForm />

                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

    </React.Fragment> || <Loader />
  );
};

export default InfoProfile;
