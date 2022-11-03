import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGE } from '../../../utils';
import * as actions from "../../../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrayGender: [],
            arrayPosition: [],
            arrayRole: [],
            urlImagePreview: '',
            isOpen: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            roleid: '',
            positionid: '',
            image: ''
        }
    }
    componentDidMount = async () => {
        this.props.fetchGenderRedux()
        this.props.fetchPositionRedux()
        this.props.fetchRoleRedux()
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        //gender
        if (prevProps.gendersRedux !== this.props.gendersRedux) {
            let arrayGenderRedux = this.props.gendersRedux
            this.setState({
                arrayGender: arrayGenderRedux,
                gender: arrayGenderRedux && arrayGenderRedux.length > 0 ? arrayGenderRedux[0].key : ''
            })
        }
        //position
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrayPositinRedux = this.props.positionRedux
            this.setState({
                arrayPosition: arrayPositinRedux,
                positionid: arrayPositinRedux && arrayPositinRedux.length > 0 ? arrayPositinRedux[0].key : ''
            })
        }
        //role
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrayRoleRedux = this.props.roleRedux
            this.setState({
                arrayRole: arrayRoleRedux,
                roleid: arrayRoleRedux && arrayRoleRedux.length > 0 ? arrayRoleRedux[0].key : ''
            })
        }
    }
    // onchange input image
    handleOnchageImage = (event) => {
        let data = event.target.files;
        let file = data[0]
        if (file) {
            let urlImage = URL.createObjectURL(file)
            this.setState({
                urlImagePreview: urlImage,
                image: file
            })
        }
    }
    // onclick preview iamge
    handleOnclickPreviewImage = () => {
        if (!this.state.urlImagePreview)
            return

        this.setState({
            isOpen: true
        })

    }
    // isvalid input
    isValidInput = () => {
        let isValid = true
        let arrayInput = [
            "email",
            "password",
            "firstName",
            "lastName",
            "phonenumber",
            "address",
            "gender",
            "roleid",
            "positionid",
            "image"
        ]
        for (let i = 0; i < arrayInput.length; i++) {
            if (!this.state[arrayInput[i]]) {
                alert(" Missing parameter :" + arrayInput[i])
                isValid = false
                break
            }
        }
        return isValid
    }
    // handle submit
    handleSubmit = () => {
        let check = this.isValidInput()
        if (check === false) {
            return
        } else {
            this.props.createUserRedux({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phonenumber,
                gender: this.state.gender,
                roleid: this.state.roleid,
                positionid: this.state.positionid,
                image: this.state.image
            })
        }
    }

    // handle onchangle input

    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        }, () => {
            console.log("check state", copyState);
        })
    }
    render() {
        let genders = this.state.arrayGender
        let position = this.state.arrayPosition
        let role = this.state.arrayRole
        let { languageRedux } = this.props
        return (
            <div className='wrap-form-user'>
                <div className="user-header">
                    <div className="header text-center">
                        <h1>Learn use Redux with Minh Chau</h1>
                    </div>

                </div>
                <div className="user-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h3><FormattedMessage id='form.user-redux.adduser' /></h3>
                            </div>
                            <div className="col-3">
                                <label htmlFor=""><FormattedMessage id='form.user-redux.email' /></label>
                                <input type="email" className='form-control' onChange={(event) => this.handleOnchangeInput(event, 'email')} />
                            </div>
                            <div className="col-3">
                                <label htmlFor=""><FormattedMessage id='form.user-redux.password' /></label>
                                <input type="password" className='form-control' onChange={(event) => this.handleOnchangeInput(event, 'password')} />
                            </div>
                            <div className="col-3">
                                <label htmlFor=""><FormattedMessage id='form.user-redux.firstName' /></label>
                                <input type="text" className='form-control' onChange={(event) => this.handleOnchangeInput(event, 'firstName')} />
                            </div>
                            <div className="col-3">
                                <label htmlFor=""><FormattedMessage id='form.user-redux.lastName' /></label>
                                <input type="text" className='form-control' onChange={(event) => this.handleOnchangeInput(event, 'lastName')} />
                            </div>
                            <div className="col-3">
                                <label htmlFor=""><FormattedMessage id='form.user-redux.phoneNumber' /></label>
                                <input type="text" className='form-control' onChange={(event) => this.handleOnchangeInput(event, 'phonenumber')} />
                            </div>
                            <div className="col-9">
                                <label htmlFor=""><FormattedMessage id='form.user-redux.address' /></label>
                                <input type="text" className='form-control' onChange={(event) => this.handleOnchangeInput(event, 'address')} />
                            </div>
                            <div className="col-3">
                                <label htmlFor=""><FormattedMessage id='form.user-redux.gender' /></label>
                                <select className="form-control" onChange={(event) => this.handleOnchangeInput(event, 'gender')}>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>{languageRedux === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })

                                    }

                                </select>
                            </div>
                            <div className="col-3">
                                <label htmlFor=""><FormattedMessage id='form.user-redux.position' /></label>
                                <select className="form-control"
                                    onChange={(event) => this.handleOnchangeInput(event, 'positionid')}
                                >
                                    {position && position.length > 0 &&
                                        position.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>{languageRedux === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })

                                    }

                                </select>
                            </div>
                            <div className="col-3">
                                <label htmlFor=""><FormattedMessage id='form.user-redux.role' /></label>
                                <select className="form-control" onChange={(event) => this.handleOnchangeInput(event, 'roleid')}>
                                    {role && role.length > 0 &&
                                        role.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>{languageRedux === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })

                                    }
                                </select>
                            </div>
                            <div className="col-3 upload-image">
                                <label htmlFor=""><FormattedMessage id='form.user-redux.image' /></label>
                                <input id='inputImage' type="file" hidden onChange={(event) => this.handleOnchageImage(event)} />
                                <label htmlFor="inputImage" className='lable-Input-img'>tải ảnh lên <FontAwesomeIcon icon={faUpload} /></label>
                                <div className='preview-image' style={{ backgroundImage: `url(${this.state.urlImagePreview})` }} onClick={() => this.handleOnclickPreviewImage()}>
                                </div>
                            </div>
                            <div className='col-1 mt-2 '>
                                <button className='btn btn-primary' onClick={() => this.handleSubmit()}> save</button>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.urlImagePreview}
                        onCloseRequest={() => this.setState({ isOpen: false })}

                    />
                }

            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        languageRedux: state.app.language,
        gendersRedux: state.admin.genders,
        positionRedux: state.admin.position,
        roleRedux: state.admin.role,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderRedux: () => dispatch(actions.fetchGenderStart()),
        fetchPositionRedux: () => dispatch(actions.fetchPositionStart()),
        fetchRoleRedux: () => dispatch(actions.fetchRoleStart()),
        createUserRedux: (data) => dispatch(actions.createUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
