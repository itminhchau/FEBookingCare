import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import emitter from '../../utils/emitter'
class UserModalEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: ''
        }
    }


    componentDidMount = async () => {
        let user = this.props.currentUser
        this.setState({
            id: user.id,
            email: user.email,
            password: 'hashcode',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phonenumber: user.phonenumber
        })
    }

    toggle = () => {
        this.props.onOffModalEdit()
    }

    handleOnchageInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        }, () => {
            console.log("check state", this.state);
        })
    }
    checkValidInput = () => {
        let isValid = true
        let arrayInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber']
        for (let i = 0; i < arrayInput.length; i++) {
            if (!this.state[arrayInput[i]]) {
                alert("missing parameter: " + arrayInput[i])
                isValid = false
                break
            }
        }
        return isValid
    }

    handleEditUser = () => {
        let isValid = this.checkValidInput()
        if (isValid === true) {
            this.props.handleUpdateUser(this.state)
        } else {

        }

    }
    render() {
        return (
            <Modal
                isOpen={this.props.isShowModalEdit}
                toggle={this.toggle}
                className={this.props.className}
                size="lg"
            >
                <ModalHeader toggle={this.toggle}>Edit User</ModalHeader>
                <ModalBody>
                    <div className="form-input">
                        <div className="input-item">
                            <label htmlFor="">Fisrt Name</label>
                            <input type="text"
                                className='input-firstName'
                                placeholder="your first name"
                                value={this.state.firstName}
                                onChange={(event) => this.handleOnchageInput(event, "firstName")}
                            />
                        </div>
                        <div className="input-item">
                            <label htmlFor="">Last Name</label>
                            <input type="text"
                                className='input-lastName'
                                placeholder="your last name"
                                value={this.state.lastName}
                                onChange={(event) => this.handleOnchageInput(event, "lastName")}
                            />
                        </div>
                        <div className="input-item">
                            <label htmlFor="">Email</label>
                            <input type="email"
                                className='input-email'
                                placeholder="your email"
                                value={this.state.email}
                                onChange={(event) => this.handleOnchageInput(event, "email")}
                                disabled
                            />
                        </div>
                        <div className="input-item">
                            <label htmlFor="">PassWord</label>
                            <input type="password"
                                className='input-password'
                                placeholder="your password"
                                value={this.state.password}
                                onChange={(event) => this.handleOnchageInput(event, "password")}
                                disabled
                            />
                        </div>
                        <div className="input-item input-size-s">
                            <label htmlFor="">address</label>
                            <input type="text"
                                className='input-address'
                                placeholder="your address"
                                value={this.state.address}
                                onChange={(event) => this.handleOnchageInput(event, "address")}
                            />
                        </div>
                        <div className="input-item input-size-s">
                            <label htmlFor="">Phone Number</label>
                            <input type="text"
                                className='input-phonenumber'
                                placeholder="your phonenumber"
                                value={this.state.phonenumber || "1234566554"}
                                onChange={(event) => this.handleOnchageInput(event, "phonenumber")}
                                disabled
                            />
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleEditUser()}>saveChange</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserModalEdit);
