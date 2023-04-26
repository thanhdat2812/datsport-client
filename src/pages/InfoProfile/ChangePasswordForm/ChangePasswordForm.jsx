import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Label, Row } from 'reactstrap'
import { changePassword } from '../../../redux/authActions'
import useUserDetail from '../../../hooks/useUserDetail'
import { resetSuccess } from '../../../redux/authSlice'


const ChangePasswordForm = () => {
    const dispatch = useDispatch();
    const userDetail = useUserDetail();
    const { success, } = useSelector(state => state.auth);
    // form process
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        const formData = { password: data.password, newPassword: data.newPassword, username: userDetail.username };
        console.log(formData);
        dispatch(changePassword(formData));
        dispatch(resetSuccess);
    };
    const changePasswordOptions = {
        password: {
            required: "Please enter password"
        },
        newPassword: {
            required: "Please enter new password"
        },
        retypePassword: {
            required: "Please confirm new password"
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="g-2">
                <Col lg={4}>
                    <div>
                        <Label
                            htmlFor="oldpasswordInput"
                            className="form-label"
                        >
                            Old Password*
                        </Label>
                        <input
                            type="password"
                            className="form-control"
                            id="oldpasswordInput"
                            placeholder="Enter current password"
                            {...register("password", changePasswordOptions.password)}
                        />
                        <small className='text-red-500'> {errors.password && <span>{errors.password.message}</span>}</small>
                    </div>
                </Col>

                <Col lg={4}>
                    <div>
                        <Label
                            htmlFor="newpasswordInput"
                            className="form-label"
                        >
                            New Password*
                        </Label>
                        <input
                            type="password"
                            className="form-control"
                            id="newpasswordInput"
                            placeholder="Enter new password"
                            {...register("newPassword", changePasswordOptions.newPassword)}
                        />
                        <small className='text-red-500'> {errors.newPassword && <span>{errors.newPassword.message}</span>}</small>
                    </div>
                </Col>

                <Col lg={4}>
                    <div>
                        <Label
                            htmlFor="confirmpasswordInput"
                            className="form-label"
                        >
                            Confirm Password*
                        </Label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmpasswordInput"
                            placeholder="Confirm password"
                            {...register("retypePassword", changePassword.retypePassword)}
                        />
                        <small className='text-red-500'> {errors.retypePassword && <span>{errors.retypePassword.message}</span>}</small>
                    </div>
                </Col>

                <Col lg={12}>
                    <div className="mb-3">
                        <Link
                            to="/forgot-password"
                            className="link-primary text-decoration-underline"
                        >
                            Forgot Password ?
                        </Link>
                    </div>
                </Col>

                <Col lg={12}>
                    <div className="text-end">
                        <button type="submit" className="btn btn-success">
                            Change Password
                        </button>
                    </div>
                </Col>
            </Row>
        </form>
    )
}

export default ChangePasswordForm