import React from "react";
import { connect } from "react-redux";
import { dispatch } from "../../../redux";
import './DoctorSchedule.scss'
import Select from 'react-select';
import { LANGUAGE, ACTION_CRUD } from '../../../utils';
import * as actions from "../../../store/actions";
import { FormattedMessage } from 'react-intl';
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment/moment";
import { toast } from 'react-toastify';
import _ from "lodash";
import userService from "../../../services/userService";
class DoctorSchedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listDoctor: [],
            currentDate: new Date(),
            timeChoosed: '',
            listTimeSchedule: [],
            isSelected: false,
            maxNumber: 0
        }
    }
    componentDidMount = async () => {
        this.props.getAllDoctorRedux()
        this.props.getDoctorTimeScheduleRedux()

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
        if (prevProps.dataTimeScheduleRedux !== this.props.dataTimeScheduleRedux) {
            let { dataTimeScheduleRedux } = this.props
            let data = []
            if (dataTimeScheduleRedux && dataTimeScheduleRedux.length > 0) {
                data = dataTimeScheduleRedux.map((item, index) => { return { ...item, isSelected: false } })
            }
            this.setState({
                listTimeSchedule: data
            })
        }
    }
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor })

    };
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
    handleOnChangeDate = (date) => {
        if (date && date.length > 0) {
            // let dateFormat = moment(date[0]).format("DD/MM/YYYY")
            // let dateFormat = new Date(date[0]).getTime()
            let dateFormat = new Date(Date.UTC(date[0].getFullYear(), date[0].getMonth(), date[0].getDate(), date[0].getHours(), date[0].getMinutes(), date[0].getSeconds())).getTime()
            this.setState({
                timeChoosed: dateFormat
            })

        }
    }
    handleOnclickTimeSchedule = (time) => {
        let { listTimeSchedule } = this.state
        if (listTimeSchedule && listTimeSchedule.length > 0) {
            listTimeSchedule = listTimeSchedule.map((item) => {
                if (item.id == time.id) {
                    item.isSelected = !item.isSelected
                }
                return item
            })
            this.setState({
                listTimeSchedule: listTimeSchedule
            })
        }
    }

    handleSaveSchedule = async () => {

        let { selectedDoctor, timeChoosed, listTimeSchedule, maxNumber } = this.state
        let result = []
        if (_.isEmpty(selectedDoctor)) {
            return toast.error("missing parameter doctor")
        }
        if (!timeChoosed || timeChoosed === 'Invalid date') {
            return toast.error("missing parameter date")
        }
        if (listTimeSchedule && listTimeSchedule.length > 0) {
            let listTimeSelected = listTimeSchedule.filter((item) => item.isSelected === true)
            if (listTimeSelected && listTimeSelected.length > 0) {
                listTimeSelected.map(item => {
                    let obj = {}
                    obj.doctorId = selectedDoctor.value
                    obj.date = timeChoosed
                    obj.timeType = item.keyMap
                    obj.maxNumber = maxNumber
                    result.push(obj)
                })
            } else {
                return toast.error("missing parameter time schedule")
            }
        }
        console.log("check result ", result);
        let res = await userService.createDoctorScheduleService({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: timeChoosed
        })

        console.log("check time choose", timeChoosed);
        if (res && res.errCode === 0) {
            toast.success("create success")
        } else {
            toast.error("create fail")
        }
        // console.log("check res", res);
    }

    // onchange input number max
    handleOnChangeMaxNum = (event) => {
        this.setState({
            maxNumber: event.target.value
        })
    }
    render() {
        let { listDoctor, currentDate, timeChoosed, listTimeSchedule, maxNumber } = this.state
        console.log("check max number", maxNumber);
        return (
            <div className="wrap-schedule">

                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <span className="tilte">Quản lý lịch khám bệnh</span>
                        </div>
                        <div className="col-6 form-group">
                            <label className="label-choose-doctor" >chọn bác sĩ</label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={listDoctor}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label className="label-choose-date" >chọn ngày đặt lịch</label>
                            <DatePicker
                                className="form-control"
                                onChange={(date) => this.handleOnChangeDate(date)}
                                minDate={currentDate}
                                value={currentDate}
                            />
                        </div>
                        <div className="col-2 form-group">
                            <label className="label-choose-date" >SL Bệnh Nhân </label>
                            <input type="maxNumber" className="form-control" onChange={(event) => this.handleOnChangeMaxNum(event)} />
                        </div>
                        <div className="col-12 time-schedule">
                            {listTimeSchedule && listTimeSchedule.length > 0 &&
                                listTimeSchedule.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === true ? "btn-timer active" : "btn-timer "} key={item.id}
                                            onClick={() => this.handleOnclickTimeSchedule(item)}
                                        >{item.valueVi}</button>
                                    )
                                })
                            }

                        </div>
                        <button className="col-1 btn btn-primary"
                            onClick={() => this.handleSaveSchedule()}
                        >save</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataAllDoctorRedux: state.admin.arrayAllDoctor,
        languageRedux: state.app.language,
        dataTimeScheduleRedux: state.admin.arrayTimeSchedule
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctorRedux: () => dispatch(actions.getAllDoctor()),
        getDoctorTimeScheduleRedux: () => dispatch(actions.getDoctorTimeSchedule())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule)