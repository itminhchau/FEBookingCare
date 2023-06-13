import MarkdownIt from 'markdown-it';
import React, { Component } from 'react';
import 'react-image-lightbox/style.css';
import { FormattedMessage } from 'react-intl';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import { ACTION_CRUD, LANGUAGE } from '../../../utils';
import './DoctorManage.scss';

import Select from 'react-select';
import userService from '../../../services/userService';



const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!


class DoctorManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // variable of mardown db
            selectedDoctor: '',
            contentHTML: '',
            contentMarkDown: '',
            discription: '',
            listDoctor: [],
            inforMarkDown: {},
            hasOldData: true,
            actions: '',
            // variable of doctorInfor

            selectPrice: "",
            selectPayment: "",
            selectProvince: "",
            addressClinic: "",
            nameClinic: "",
            note: "",
            count: '',
            listPrice: [],
            listProvince: [],
            listPayment: []
        }
    }
    componentDidMount = async () => {
        this.props.getAllDoctorRedux()
        this.props.getRequireDoctorAllCodeRedux()
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.dataAllDoctorRedux !== this.props.dataAllDoctorRedux) {
            let arrayDoctor = this.builtInputSelect(this.props.dataAllDoctorRedux, 'USER')
            this.setState({
                listDoctor: arrayDoctor
            })
        }
        if (prevProps.languageRedux !== this.props.languageRedux) {
            let arrayDoctor = this.builtInputSelect(this.props.dataAllDoctorRedux, 'USER')
            this.setState({
                listDoctor: arrayDoctor
            })
        }
        if (prevProps.dataRequireDoctorAllCodeRedux !== this.props.dataRequireDoctorAllCodeRedux) {
            let { price, province, payment } = this.props.dataRequireDoctorAllCodeRedux
            let arrayPrice = this.builtInputSelect(price, 'PRICE')
            let arrayProvince = this.builtInputSelect(province, 'PROVINCE')
            let arrayPayment = this.builtInputSelect(payment, 'PAYMENT')
            this.setState({
                listPrice: arrayPrice,
                listProvince: arrayProvince,
                listPayment: arrayPayment
            })
        }

        if (prevProps.languageRedux !== this.props.languageRedux) {
            let { price, province, payment } = this.props.dataRequireDoctorAllCodeRedux
            let arrayPrice = this.builtInputSelect(price, 'PRICE')
            let arrayProvince = this.builtInputSelect(province, 'PROVINCE')
            let arrayPayment = this.builtInputSelect(payment, 'PAYMENT')
            this.setState({
                listPrice: arrayPrice,
                listProvince: arrayProvince,
                listPayment: arrayPayment
            })
        }

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkDown: text
        })
    }

    handleChangeSelectDoctor = async (selectedDoctor) => {
        this.setState({ selectedDoctor })

        let res = await userService.getMarkdownService(selectedDoctor.value)
        let resDoctorInfo = await userService.getDoctorInforService(selectedDoctor.value)
        console.log("check res doctor of api", resDoctorInfo);
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
            // save markdown
            contentHTML: this.state.contentHTML,
            contentMarkDown: this.state.contentMarkDown,
            discription: this.state.discription,
            doctorId: this.state.selectedDoctor.value,
            // save doctor infor
            selectPrice: this.state.selectPrice.value,
            selectPayment: this.state.selectPayment.value,
            selectProvince: this.state.selectProvince.value,
            addressClinic: this.state.addressClinic,
            nameClinic: this.state.nameClinic,
            note: this.state.note,
        })
        this.setState({
            selectedDoctor: '',
            contentHTML: '',
            contentMarkDown: '',
            discription: '',

            selectPrice: "",
            selectPayment: "",
            selectProvince: "",
            addressClinic: "",
            nameClinic: "",
            note: "",
        })

    }


    builtInputSelect = (dataInput, textInput) => {
        let result = []
        let { languageRedux } = this.props

        if (dataInput && dataInput.length > 0) {
            if (textInput === 'USER') {
                dataInput.map((item, index) => {
                    let object = {}
                    let labelVn = `${item.lastName} ${item.firstName}`
                    let labelEn = `${item.firstName} ${item.lastName} `
                    object.label = languageRedux === LANGUAGE.VI ? labelVn : labelEn
                    object.value = item.id
                    result.push(object)
                    return result
                })
            }
            if (textInput === 'PAYMENT' || textInput === 'PROVINCE') {
                dataInput.map((item, index) => {
                    let object = {}
                    let labelVn = item.valueVi
                    let labelEn = item.valueEn
                    object.label = languageRedux === LANGUAGE.VI ? labelVn : labelEn
                    object.value = item.keyMap
                    result.push(object)
                    return result
                })
            }
            if (textInput === 'PRICE') {
                dataInput.map((item, index) => {
                    let object = {}
                    let labelVn = item.valueVi
                    let labelEn = `${item.valueEn} USD`
                    object.label = languageRedux === LANGUAGE.VI ? labelVn : labelEn
                    object.value = item.keyMap
                    result.push(object)
                    return result
                })
            }
        }
        return result
    }
    handleChangeSelectDoctorInfor = (selected, name) => {
        let nameState = name.name
        let copyState = { ...this.state }
        copyState[nameState] = selected
        this.setState({
            ...copyState
        })
    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }
    render() {
        let { listDoctor, hasOldData, listPrice, listPayment, listProvince } = this.state
        return (
            <div className='wrap-manager-doctor'>
                <div className="doctor-header">
                    <div className="header text-center">
                        <h1><FormattedMessage id='doctor.manager-doctor.title' /></h1>
                    </div>

                </div>
                <div className="doctor-body">
                    <div className="content-body">
                        <div className="content-first">
                            <div className="content-left">
                                <h5> <FormattedMessage id='doctor.manager-doctor.select-doctor' /></h5>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelectDoctor}
                                    options={listDoctor}
                                />
                            </div>
                            <div className="content-right">
                                <h5><FormattedMessage id='doctor.manager-doctor.infor-doctor' /></h5>
                                <textarea className="description" name="description-doctor" rows="4" cols="50"
                                    value={this.state.discription}
                                    onChange={(event) => this.handleOnChangeDiscription(event)}
                                >
                                </textarea>
                            </div>
                        </div>
                        <div className="content-second">
                            <div className="row">
                                <div className="col-4 form-group">
                                    <label htmlFor=""><FormattedMessage id='doctor.manager-doctor.select-price' /> </label>
                                    <Select
                                        value={this.state.selectPrice}
                                        onChange={this.handleChangeSelectDoctorInfor}
                                        options={listPrice}
                                        name={"selectPrice"}
                                    />
                                </div>
                                <div className="col-4 form-group">
                                    <label htmlFor=""><FormattedMessage id='doctor.manager-doctor.select-payment' /></label>
                                    <Select
                                        value={this.state.selectPayment}
                                        onChange={this.handleChangeSelectDoctorInfor}
                                        options={listPayment}
                                        name={"selectPayment"}
                                    />
                                </div>
                                <div className="col-4 form-group">
                                    <label htmlFor=""><FormattedMessage id='doctor.manager-doctor.select-province' /></label>
                                    <Select
                                        value={this.state.selectProvince}
                                        onChange={this.handleChangeSelectDoctorInfor}
                                        options={listProvince}
                                        name={"selectProvince"}
                                    />
                                </div>
                                <div className="col-4 form-group">
                                    <label htmlFor=""><FormattedMessage id='doctor.manager-doctor.name-clinic' /></label>
                                    <input type="text" className='form-control'
                                        value={this.state.nameClinic}
                                        onChange={(event) => this.handleOnchangeInput(event, 'nameClinic')} />
                                </div>
                                <div className="col-4 form-group">
                                    <label htmlFor=""><FormattedMessage id='doctor.manager-doctor.address-clinic' /></label>
                                    <input type="text" className='form-control'
                                        value={this.state.addressClinic}
                                        onChange={(event) => this.handleOnchangeInput(event, 'addressClinic')} />
                                </div>
                                <div className="col-4 form-group">
                                    <label htmlFor=""><FormattedMessage id='doctor.manager-doctor.note' /></label>
                                    <input type="text" className='form-control'
                                        value={this.state.note}
                                        onChange={(event) => this.handleOnchangeInput(event, 'note')} />
                                </div>
                            </div>
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
        dataRequireDoctorAllCodeRedux: state.admin.doctorAllcodePPP
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorRedux: () => dispatch(actions.getAllDoctor()),
        createDoctorRedux: (data) => dispatch(actions.createDoctor(data)),
        getRequireDoctorAllCodeRedux: () => dispatch(actions.getRequireDoctorAllCode())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
