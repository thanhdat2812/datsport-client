import './SignUp.scss';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiHide, BiShow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/images/logo.png';
import { registerUser } from "../../redux/authActions";
import { useLayoutEffect } from 'react';
import { useEffect } from 'react';
import { resetSuccess } from '../../redux/authSlice';
const Login = () => {
  const navigate = useNavigate();
  const [typePassword, setTypePassword] = useState("password");
  const dispatch = useDispatch();
  const { success } = useSelector(state => state.auth)

  // init form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  // Handle submit form
  const handleClickBtnSubmit = async (data) => {
    await dispatch(registerUser(data));
  };

  useEffect(() => {
    if (success) {
      dispatch(resetSuccess());
      navigate('/login');
    }
  }, [success]);
  

// Toggle password
  const handleClickToggleShowPassword = () =>
    typePassword === "password"
      ? setTypePassword("text")
      : setTypePassword("password");
  const handleErrors = (errors) => { };

  // Login options for validation
  const loginOptions = {
    email: {
      required: "Email cannot be empty!",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
    username: {
      required: "Username cannot be empty!",
      minLength: {
        value: 5,
        message: "Username must be at least 5 characters",
      },
    },
    userfullname: {
      required: "Fullname cannot be empty!",
      minLength: {
        value: 5,
        message: "Fullname must be at least 5 characters",
      },
    },
    password: {
      required: "Password cannot be empty! ",
      minLength: {
        value: 5,
        message: "Password must be at least 5 characters",
      },
    },
    retypepassword: {
      required: "RetypePassword cannot be empty!",
    },
    gender: {
      required: "Let's choose gender!",
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

  return (
    <React.Fragment>
      <div className="login-wrapper">
        <section className="vh-100" style={{ backgroundColor: "##eeeeee" }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div className="card" style={{ borderRadius: "1rem" }}>
                  <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-flex justify-content-center align-items-start py-5 px-2">
                      <img
                        src={Logo}
                        alt="login form"
                        className="img-fluid sticky-top"
                        style={{ borderRadius: "1rem 0 0 1rem" }}
                      />
                    </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 text-black">
                        <form
                          onSubmit={handleSubmit(
                            handleClickBtnSubmit,
                            handleErrors
                          )}
                        >
                          <div className="d-flex align-items-center mb-3 pb-1">
                            <i
                              className="fas fa-cubes fa-2x me-3"
                              style={{ color: "#ff6219" }}
                            ></i>
                            <span className="h1 fw-bold mb-0">Datsport</span>
                          </div>

                          <h5
                            className="fw-normal mb-3 pb-3"
                            style={{ letterSpacing: "1px" }}
                          >
                            Sign up your account
                          </h5>

                          <div className="form-outline mb-4">
                            <input
                              id="form2Example17"
                              className="form-control form-control-lg"
                              type="text"
                              placeholder="Username"
                              name="username"
                              {...register("username", loginOptions.username)}
                            />
                            <label
                              className="form-label"
                              htmlFor="form2Example17"
                            >
                              Username
                            </label>
                            <br /><small className="text-red-500 ml-5">
                              {errors?.username && errors.username.message}
                            </small>
                          </div>

                          <div className="form-outline">
                            <div className='relative'>
                              <input
                                type={typePassword}
                                placeholder="Password"
                                className="form-control form-control-lg"
                                {...register("password", loginOptions.password)}
                              />
                              <span
                                onClick={handleClickToggleShowPassword}
                                className="show-password"
                              >
                                {(typePassword === 'password' && <BiShow size={15} />) || <BiHide size={15} />}
                              </span>
                            </div>


                            <label
                              className="form-label"
                              htmlFor="form2Example27"
                            >
                              Password
                            </label>
                            <br />
                            <small className="text-red-500">
                              {errors?.password && errors.password.message}
                            </small>
                          </div>

                          <div className="form-outline mb-4">

                            <input
                              type={typePassword}
                              id="form2Example27"
                              className="form-control form-control-lg"
                              placeholder="Retype Password"
                              name="retypepassword"
                              {...register(
                                "retypepassword",
                                loginOptions.retypepassword
                              )}
                            />

                            <label
                              className="form-label"
                              htmlFor="form2Example27"
                            >
                              Retype password
                            </label>
                            <br /><small className="text-red-500 ml-5">
                              {errors?.retypepassword &&
                                errors.retypepassword.message}
                            </small>
                          </div>

                          <div className="form-outline mb-4">
                            <input
                              id="form2Example17"
                              className="form-control form-control-lg"
                              type="text"
                              placeholder="Fullname"
                              name="userfullname"
                              {...register(
                                "userfullname",
                                loginOptions.userfullname
                              )}
                            />
                            <label
                              className="form-label"
                              htmlFor="form2Example17"
                            >
                              Full name
                            </label>
                            <br /><small className="text-red-500 ml-5">
                              {errors?.userfullname &&
                                errors.userfullname.message}
                            </small>
                          </div>

                          <div className="form-outline mb-4">
                            <input
                              id="form2Example17"
                              className="form-control form-control-lg"
                              type="email"
                              placeholder="Email"
                              name="email"
                              {...register("email", loginOptions.email)}
                            />
                            <label
                              className="form-label"
                              htmlFor="form2Example17"
                            >
                              Email
                            </label>
                            <br /><small className="text-red-500 ml-5">
                              {errors?.email && errors.email.message}
                            </small>
                          </div>

                          <div className="form-outline mb-4">
                            <div className="d-flex justify-content-around">
                              <div className="d-flex justify-content-center mr-2 text-sm cursor-pointer">
                                <input
                                  id="men"
                                  name="gender"
                                  {...register("gender", loginOptions.gender)}
                                  type="radio"
                                  value="0"
                                  className="mr-2"
                                />
                                <label class htmlFor="men">
                                  Men
                                </label>
                              </div>
                              <div className="d-flex justify-content-center mr-2 text-sm cursor-pointer">
                                <input
                                  type="radio"
                                  id="women"
                                  value="1"
                                  className="mr-1"
                                  name="gender"
                                  {...register("gender", loginOptions.gender)}
                                />
                                <label htmlFor="women">Women</label>
                              </div>
                              <div className="d-flex justify-content-center mr-2 text-sm cursor-pointer">
                                <input
                                  type="radio"
                                  id="other"
                                  value="2"
                                  className="mr-1"
                                  name="gender"
                                  {...register("gender", loginOptions.gender)}
                                />
                                <label htmlFor="other">Other</label>
                              </div>
                            </div>
                            <label
                              className="form-label"
                              htmlFor="form2Example17"
                            >
                              Gender
                            </label>
                            <br />
                            <small className="text-red-500">
                              {errors?.gender && errors.gender.message}
                            </small>
                          </div>


                          <div className="form-outline mb-4">
                            <input
                              type="number"
                              id="form2Example27"
                              className="form-control form-control-lg"
                              placeholder="Phone"
                              name="phone"
                              {...register("phone", loginOptions.phone)}
                            />

                            <label
                              className="form-label"
                              htmlFor="form2Example27"
                            >
                              Phone
                            </label><br />
                            <small className="text-red-500">
                              {errors?.phone && errors.phone.message}
                            </small>
                          </div>

                          <div className="form-outline mb-4">
                            <input
                              className="form-control form-control-lg"
                              type="text"
                              placeholder="Address"
                              name="address"
                              {...register("address", loginOptions.address)}
                            />
                            <label
                              className="form-label"
                              htmlFor="form2Example17"
                            >
                              Address
                            </label><br />
                            <small className="text-red-500">
                              {errors?.address && errors.address.message}
                            </small>
                          </div>

                          <div className="pt-1 mb-4">
                            <button
                              className="btn btn-dark btn-lg btn-block"
                              type="submit"
                            >
                              Sign up
                            </button>
                          </div>

                          <Link className="small text-muted" to={'/forgot-password'}>
                            Forgot password?
                          </Link>
                          <p
                            className="mb-5 pb-lg-2"
                            style={{ color: "#393f81" }}
                          >
                            Already have an account?{" "}
                            <Link
                              to={'/login'}
                              style={{ color: "#393f81" }}
                            >
                              Sign in here
                            </Link>
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Login;
