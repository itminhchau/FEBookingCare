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
            listDoctor: []

        }
    }
    componentDidMount = async () => {
        this.props.getAllDoctorRedux()
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.dataAllDoctorRedux !== this.props.dataAllDoctorRedux) {
            let arrayDoctor = this.builtInputSelect(this.props.dataAllDoctorRedux)
            console.log(arrayDoctor);
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

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor })
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
            doctorId: this.state.selectedDoctor.value
        })

    }


    builtInputSelect = (dataInput) => {
        let result = []
        let { languageRedux } = this.props
        console.log("check data input", dataInput)
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
        let { listDoctor } = this.state
        console.log("check list doctor", listDoctor);
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
                                onChange={this.handleChange}
                                options={listDoctor}
                            />
                        </div>
                        <div className="content-right">
                            <h5>Thông tin bác sĩ</h5>
                            <textarea className="description" name="description-doctor" rows="4" cols="50"
                                onChange={(event) => this.handleOnChangeDiscription(event)}
                            >

                            </textarea>
                        </div>
                    </div>
                    <div className="wrap-markdown">
                        <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)}

                            onChange={this.handleEditorChange} />
                    </div>
                    <div className='wrap-btn'>
                        <button className='btn-save-doctor' onClick={() => this.handleOnclickSave()}> save</button>
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
