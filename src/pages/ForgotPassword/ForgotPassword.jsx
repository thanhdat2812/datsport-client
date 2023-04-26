import './ForgotPassword.scss';
import React, { useState } from "react";

import { BiHide, BiLoader, BiShow } from "react-icons/bi";
// @ts-ignore
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { getProfile, loginUser, resetPassword } from "../../redux/authActions";
import LoadingSpinner from "../../share/loading_spinner/LoadingSpinner";

import Logo from '../../assets/images/logo.png';
import { resetSuccess } from '../../redux/authSlice';
import { useEffect } from 'react';

const ForgotPassword = () => {
  // ==== hook ====
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { success, loading } = useSelector(
    (state) => state.auth
  );
  // ==== handleFunciton ====

  const handleClickBtnSubmit = async (data) => {
    await dispatch(resetPassword(data));
   
  };
  
  useEffect(() => {
    if(success){
      dispatch(resetSuccess());
      navigate('/login')
    }
  }, [success])
  

  const handleErrors = (errors) => { };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const loginOptions = {
    mail: {
        required: "Email cannot be empty!",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address",
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
                              Enter your email that you used to register you account
                            </h5>

                            <div className="form-outline mb-4">
                              <input

                                id="form2Example17"
                                className="form-control form-control-lg"
                                {...register("mail", loginOptions.mail)}
                              />
                              <label
                                className="form-label"
                                htmlFor="form2Example17"
                              >
                                Email
                              </label><br/>
                              <small className="text-red-500">
                                {errors?.mail && errors.mail.message}
                              </small>
                            </div>

                            

                            <div className="pt-1 mb-4">
                              <button
                                className="btn btn-dark btn-lg btn-block"
                                type="submit"
                              >
                                {loading && <BiLoader /> || 'Reset Password'}
                              </button>
                            </div>

                            <p
                            className="mb-5 pb-lg-2"
                            style={{ color: "#393f81" }}
                          >
                            Have you remember your account?{" "}
                            <Link
                              to={'/login'}

                              style={{ color: "#393f81" }}
                            >
                              Login here
                            </Link>
                          </p>
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

export default ForgotPassword;
