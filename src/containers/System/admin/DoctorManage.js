import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGE, ACTION_CRUD } from '../../../utils';
import * as actions from "../../../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import './DoctorManage.scss'
import 'react-image-lightbox/style.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './DoctorManage.scss'

import Select from 'react-select';
import userService from '../../../services/userService';
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];


const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!


class DoctorManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor: '',
            contentHTML: '',
            contentMarkDown: '',
            discription: '',
            listDoctor: [],
            inforMarkDown: {},
            hasOldData: true,
            actions: ''
        }
    }
    componentDidMount = async () => {
        this.props.getAllDoctorRedux()

    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.dataAllDoctorRedux !== this.props.dataAllDoctorRedux) {
            let arrayDoctor = this.builtInputSelect(this.props.dataAllDoctorRedux)
            this.setState({
                listDoctor: arrayDoctor
            })
        }
        if (prevProps.languageRedux !== this.props.languageRedux) {
            let arrayDoctor = this.builtInputSelect(this.props.dataAllDoctorRedux)
            this.setState({
                listDoctor: arrayDoctor
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkDown: text
        })
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor })

        let res = await userService.getMarkdownService(selectedDoctor.value)
        if (res && res.errCode === 0 && res.data) {
            this.setState({
                contentHTML: res.data.contentHTML,
                contentMarkDown: res.data.contentMarkDown,
                discription: res.data.discription,
                hasOldData: true,
                actions: ACTION_CRUD.EDIT
            })
        } else if (res && res.errCode === 2) {
            this.setState({
                contentHTML: '',
                contentMarkDown: '',
                discription: '',
                hasOldData: false,
                actions: ACTION_CRUD.CREATE
            })
        }
    };

    handleOnChangeDiscription = (event) => {
        this.setState({
            discription: event.target.value
        })
    }

    handleOnclickSave = () => {
        this.props.createDoctorRedux({
            contentHTML: this.state.contentHTML,
            contentMarkDown: this.state.contentMarkDown,
            discription: this.state.discription,
            doctorId: this.state.selectedDoctor.value,
        })
        this.setState({
            selectedDoctor: '',
            contentHTML: '',
            contentMarkDown: '',
            discription: '',
        })

    }


    builtInputSelect = (dataInput) => {
        let result = []
        let { languageRedux } = this.props

        if (dataInput && dataInput.length > 0) {
            dataInput.map((item, index) => {
                let object = {}
                let labelVn = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName} `
                object.label = languageRedux === LANGUAGE.VI ? labelVn : labelEn
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }
    render() {
        let { listDoctor, hasOldData } = this.state
        console.log(this.state.selectedDoctor);
        return (
            <div className='wrap-manager-doctor'>
                <div className="doctor-header">
                    <div className="header text-center">
                        <h1>Quản lý bác sĩ</h1>
                    </div>

                </div>
                <div className="doctor-body">
                    <div className="content-body">
                        <div className="content-left">
                            <h5> chọn bác sĩ</h5>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={listDoctor}
                            />
                        </div>
                        <div className="content-right">
                            <h5>Thông tin bác sĩ</h5>
                            <textarea className="description" name="description-doctor" rows="4" cols="50"
                                value={this.state.discription}
                                onChange={(event) => this.handleOnChangeDiscription(event)}
                            >

                            </textarea>
                        </div>
                    </div>
                    <div className="wrap-markdown">
                        <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)}
                            value={this.state.contentMarkDown}
                            onChange={this.handleEditorChange} />
                    </div>
                    <div className='wrap-btn'>
                        <button className={hasOldData === true ? 'btn-save-doctor' : 'btn-create-infor'} onClick={() => this.handleOnclickSave()}>
                            {hasOldData === true ? 'save change' : "create information"}
                        </button>
                    </div>
                </div>

            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        dataAllDoctorRedux: state.admin.arrayAllDoctor,
        languageRedux: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorRedux: () => dispatch(actions.getAllDoctor()),
        createDoctorRedux: (data) => dispatch(actions.createDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
