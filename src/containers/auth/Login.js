import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import imageLogin from "../../assets/images/hospital.jpg"
import userService from "../../services/userService"
import * as actions from "../../store/actions";
import './Login.scss';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isShowHidePass: false,
            errorMessage: ''
        }
    }
    handleOnchangeUserName = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleOnchangePassWord = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleOnclickLogin = async () => {
        this.setState({
            errorMessage: ''
        })
        try {
            let data = await userService.handleLogin(this.state.email, this.state.password)
            if (data.errCode !== 0) {
                this.setState({
                    errorMessage: data.message
                })
            }
            if (data.errCode === 0) {
                // login success
                this.props.userLoginSuccess(data.user)
                console.log("login successs")
            }
        } catch (error) {
            console.log("check error", error.response);
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errorMessage: error.response.data.errMessage
                    })
                }
            }
        }

    }

    handleShowHide = () => {
        this.setState({
            isShowHidePass: !this.state.isShowHidePass
        })
    }
    render() {

        return (
            <>
                <div className="login-background">

                    <div className="login-containner">

                        <img className='login-image' src={imageLogin} alt="" />

                        <div className="login-content row">
                            <div className="col-12 login-text">
                                Login
                            </div>
                            <div className="col-12 form-group">
                                <label >Email</label>
                                <input type="text"
                                    className='form-control'
                                    placeholder='Enter email'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnchangeUserName(event)}
                                />
                            </div>
                            <div className="col-12 form-group">
                                <label >password</label>
                                <div className="wrap-pass">
                                    <input type={this.state.isShowHidePass ? 'text' : 'password'}
                                        className='form-control '
                                        placeholder='Enter password'
                                        value={this.state.password}
                                        onChange={(event) => this.handleOnchangePassWord(event)}
                                    />
                                    <i className={this.state.isShowHidePass ? 'far fa-eye icon-eye' : 'far fa-eye-slash icon-eye'} onClick={() => this.handleShowHide()}></i>
                                </div>
                            </div>
                            <div className="col-12" style={{ color: "red" }}>
                                {this.state.errorMessage}
                            </div>
                            <div className='col-12'>
                                <button className='login-btn' onClick={() => this.handleOnclickLogin()}>Login</button>
                            </div>
                            <div className="col-12">
                                <span className='text-forgot'>Forgot your password ?</span>
                            </div>
                            <span className='login-socials-text'>Login with: </span>
                            <div className='col-12 login-socials'>
                                <a href="#" className="login-socials__facebook ">
                                    <i className=" fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="login-socials__google ">
                                    <i className=" fab fa-google-plus-g"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
