import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import emitter from '../../utils/emitter'
class UserModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: ''
        }
        this.listenToEmitter()
    }

    listenToEmitter = () => {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phonenumber: ''
            })
        })

    }

    componentDidMount() {

    }

    toggle = () => {
        this.props.onOffModal()
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

    handleAddNewUser = () => {
        let isValid = this.checkValidInput()
        if (isValid === true) {
            this.props.addNewUser(this.state)
        } else {

        }

    }
    render() {
        return (
            <Modal
                isOpen={this.props.isShowModal}
                toggle={this.toggle}
                className={this.props.className}
                size="lg"
            >
                <ModalHeader toggle={this.toggle}>Create New User</ModalHeader>
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
                            />
                        </div>
                        <div className="input-item">
                            <label htmlFor="">PassWord</label>
                            <input type="password"
                                className='input-password'
                                placeholder="your password"
                                value={this.state.password}
                                onChange={(event) => this.handleOnchageInput(event, "password")}
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
                                value={this.state.phonenumber}
                                onChange={(event) => this.handleOnchageInput(event, "phonenumber")}
                            />
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleAddNewUser()}>Add New</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
