import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableListUser.scss'
import * as actions from '../../../store/actions'

class TableListUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listUsers: []
        }
    }

    componentDidMount = async () => {
        this.props.getAllUserRedux()

    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.listUserRedux !== this.props.listUserRedux) {
            this.setState({
                listUsers: this.props.listUserRedux
            })
        }
    }
    handlerDeleteUser = (idUser) => {
        this.props.deleteUserRedux(idUser)

    }

    handlerOnclickEditUser = (user) => {
        this.props.handleEditUserfromParent(user)
    }
    render() {
        // let { listUserRedux } = this.props
        let { listUsers } = this.state
        console.log("list User redux", listUsers);
        return (
            <>
                <div className="table-container">
                    <div className="table-list-content mt-24 ">
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
                            <tbody >
                                {listUsers && listUsers.length > 0 &&
                                    listUsers.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.email}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <button className='btnn-edit' onClick={() => this.handlerOnclickEditUser(item)}><i className="fas fa-edit"></i></button>
                                                    <button className='btnn-delete' onClick={() => this.handlerDeleteUser(item.id)}><i className="fas fa-trash"></i> </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

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
        listUserRedux: state.admin.arrayUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUserRedux: () => dispatch(actions.getAllUser()),
        deleteUserRedux: (idUser) => dispatch(actions.deleteUser(idUser))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableListUser);
