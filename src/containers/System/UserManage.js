import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManager.scss'
import UserModal from './UserModal';
import userService from '../../services/userService.js'
import UserModalEdit from './UserModalEdit';
import _emitter from '../../utils/emitter'


class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: [],
            isShowModal: false,
            isShowModalEdit: false,
            currentUser: {}
        }
    }

    componentDidMount = async () => {
        await this.showAllListUer()

    }

    //show all list user
    showAllListUer = async () => {
        let id = "ALL"
        try {
            let res = await userService.getUserService(id)
            this.setState({
                userData: res && res.errCode === 0 ? res.user : []
            })
            console.log("check res data", this.state.userData);
        } catch (error) {
            console.log(error);
        }
    }

    // handler button add new user
    handleOnclickAdd = () => {
        this.setState({
            isShowModal: true
        })
    }
    // off modals over lay
    onOffModal = () => {
        this.setState({
            isShowModal: !this.state.isShowModal
        })
    }
    onOffModalEdit = () => {
        this.setState({
            isShowModalEdit: !this.state.isShowModalEdit
        })
    }

    // funcion add new user
    addNewUser = async (data) => {
        try {
            let res = await userService.createUserService(data)
            if (res && res.errCode !== 0) {
                alert(res.message)

            } else {
                this.onOffModal()
                this.showAllListUer()
                _emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (error) {
            console.log(error);
        }
    }

    //handle onclick delete user
    handlerDeleteUser = async (user) => {
        try {
            let res = await userService.deleteUserService(user.id)
            if (res && res.errCode === 0) {
                this.showAllListUer()
                console.log(res.message);
            } else {
                console.log(res.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    // onclick user edit
    handlerOnclickEditUser = async (user) => {
        this.setState({
            isShowModalEdit: true,
            currentUser: user
        })
    }
    // handle update user to service
    handleUpdateUser = async (user) => {
        try {
            let res = await userService.updateUserService(user)
            if (res && res.errCode === 0) {
                this.onOffModalEdit()
                this.showAllListUer()
                console.log(res.message);
            } else {
                console.log(res.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let arrayUser = this.state.userData
        return (
            <>

                <div className="table-container">
                    <div className="text " ><h1>Table list user</h1></div>
                    <button className='btn-add' onClick={() => this.handleOnclickAdd()} ><i class="fas fa-plus"></i> &nbsp; add new User</button>
                    <UserModal
                        isShowModal={this.state.isShowModal}
                        onOffModal={this.onOffModal}
                        addNewUser={this.addNewUser}
                    />
                    {this.state.isShowModalEdit && this.state.isShowModalEdit === true &&
                        <UserModalEdit
                            isShowModalEdit={this.state.isShowModalEdit}
                            onOffModalEdit={this.onOffModalEdit}
                            currentUser={this.state.currentUser}
                            handleUpdateUser={this.handleUpdateUser}
                        />
                    }
                    <div className="table-content mt-24 ">
                        <table id="customers">
                            <thead>
                                <tr>
                                    <th>Number</th>
                                    <th>FirstName</th>
                                    <th>LastName</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {arrayUser && arrayUser.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.email}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btnn-edit' onClick={() => this.handlerOnclickEditUser(item)}><i class="fas fa-edit"></i></button>
                                                <button className='btnn-delete' onClick={() => this.handlerDeleteUser(item)}><i class="fas fa-trash"></i> </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>


                    </div>

                </div >

            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
