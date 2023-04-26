import "./Login.scss";

import React, { useState } from "react";

import { BiHide, BiLoader, BiShow } from "react-icons/bi";
// @ts-ignore
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { getProfile, loginUser } from "../../redux/authActions";
import { resetSuccess } from '../../redux/authSlice';

import LoadingSpinner from "../../share/loading_spinner/LoadingSpinner";

import Logo from '../../assets/images/logo.png';
import { useEffect } from "react";
import { useRef } from "react";


const Login = () => {
  // ==== hook ====
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [typePassword, setTypePassword] = useState("password");
  const { success, loading } = useSelector(
    (state) => state.auth
  );

  // ==== handleFunciton ====

  const handleClickBtnSubmit = (data) => {
    dispatch(loginUser(data));
    dispatch(resetSuccess());

  };

  // navigate to home if login success
  useEffect(() => {
    if (success) {
      dispatch(getProfile());
      navigate('/');
    }
  }, [success]);

  const handleClickToggleShowPassword = () =>
    typePassword === "password"
      ? setTypePassword("text")
      : setTypePassword("password");
  const handleErrors = (errors) => { };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const loginOptions = {
    username: {
      required: "Username cannot be empty!",
      minLength: {
        value: 5,
        message: "Username must be at least 6 characters",
      },
    },
    password: {
      required: "Password cannot be empty! ",
      minLength: {
        value: 5,
        message: "Password must be at least 6 characters",
      },
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
                    <div className="col-md-6 px-2 col-lg-5 d-none d-md-flex justify-content-center align-items-center">
                      <img
                        src={Logo}
                        alt="login form"
                        className="img-fluid "
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
                            Sign into your account
                          </h5>

                          <div className="form-outline mb-4">
                            <input

                              id="form2Example17"
                              className="form-control form-control-lg"
                              {...register("username", loginOptions.username)}
                            />
                            <label
                              className="form-label"
                              htmlFor="form2Example17"
                            >
                              Username
                            </label>
                            <small className="text-red-500">
                              {errors?.username && errors.username.message}
                            </small>
                          </div>

                          <div className="form-outline mb-4">
                            <div className='relative'>
                              <input
                                type={typePassword}
                                id="form2Example27"
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
                          </div>

                          <div className="pt-1 mb-4">
                            <button
                              className="btn btn-dark btn-lg btn-block"
                              type="submit"
                            >
                              {loading && <BiLoader /> || 'Login'}
                            </button>
                          </div>

                          <Link to={'/forgot-password'} className="small text-muted" >
                            Forgot password?
                          </Link>
                          <p
                            className="mb-5 pb-lg-2"
                            style={{ color: "#393f81" }}
                          >
                            Don't have an account?{" "}
                            <Link
                              to={'/signup'}

                              style={{ color: "#393f81" }}
                            >
                              Register here
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
