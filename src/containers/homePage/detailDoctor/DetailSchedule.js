import React from "react";
import { connect } from "react-redux";
import './DetailSchedule.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedMessage } from "react-intl";
import { LANGUAGE } from "../../../utils";
import HomeHeader from "../homeHeader/HomeHeader";
import { withRouter } from "react-router";
import * as actions from '../../../store/actions'
import moment from "moment/moment";
import localization from "moment/locale/vi"
import userService from "../../../services/userService";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
class DetailSchedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arrAllDay: [],
            language: '',
            listTimeSchedule: []
        }
    }
    componentDidMount = async () => {
        let arrayDay = this.getDayInWeek(this.props.languageRedux)
        this.setState({
            arrAllDay: arrayDay
        })
        if (arrayDay && arrayDay.length > 0) {
            if (this.props.match && this.props.match.params && this.props.match.params.id) {
                let res = await userService.getTimeScheduleDoctorService(this.props.match.params.id, arrayDay[0].value)
                this.setState({
                    listTimeSchedule: res && res.data ? res.data : []
                })
            }

        }

    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getDayInWeek = (language) => {
        // console.log("check moment days", moment(new Date()).format('dddd-DD/MM'));
        // console.log("check moment day En", moment(new Date()).locale('en').format('dd-DD/MM'));
        let arrayDay = []
        for (let i = 0; i < 7; i++) {
            let obj = {}
            if (language === LANGUAGE.VI) {
                let dateLabel = moment(new Date()).add(i, 'days').format('dddd-DD/MM')
                obj.label = this.capitalizeFirstLetter(dateLabel)
                obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            }
            if (language === LANGUAGE.EN) {

                obj.label = moment(new Date()).add(i, 'days').locale('en').format('dd-DD/MM')
                obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            }

            arrayDay.push(obj)
        }
        return arrayDay
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.languageRedux !== this.props.languageRedux) {
            let arrayDay = this.getDayInWeek(this.props.languageRedux)
            this.setState({
                arrAllDay: arrayDay
            })
        }

    }

    handleOnchangeSelectTime = async (event) => {
        // console.log("check time schedule", typeof event.target.value);
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let res = await userService.getTimeScheduleDoctorService(this.props.match.params.id, event.target.value)
            this.setState({
                listTimeSchedule: res && res.data ? res.data : []
            })
        }

    }
    render() {
        let { arrAllDay, listTimeSchedule } = this.state
        let { languageRedux } = this.props
        // console.log("check state arrayday", arrAllDay);
        return (
            <>
                <div className="time-schedule-wrap">
                    <div className="time-schedule-week">
                        <select className="select-option-days"
                            onChange={(event) => this.handleOnchangeSelectTime(event)}
                        >
                            {arrAllDay && arrAllDay.length > 0 &&
                                arrAllDay.map((item, index) => {
                                    return (
                                        <option className="option-day"
                                            value={item.value}
                                            key={index}

                                        > {item.label}</option>
                                    )
                                })

                            }

                        </select>
                    </div>
                    <div className="time-schedule-times">
                        <span className="schedule-tile"><FontAwesomeIcon icon={faCalendarDay} /> <FormattedMessage id="doctor.detail-doctor.schedule" /></span>
                        <div className="wrap-btn-time">
                            {listTimeSchedule && listTimeSchedule.length > 0 &&
                                listTimeSchedule.map((item, index) => {
                                    let labelDisplay = languageRedux === LANGUAGE.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                    return (

                                        <button className="btn-time" key={index}>{labelDisplay}</button>
                                    )

                                })
                            }
                            {listTimeSchedule && listTimeSchedule.length == 0 &&
                                <span className="no-schedule"><FormattedMessage id="doctor.detail-doctor.no-schedule" /></span>
                            }

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        languageRedux: state.app.language
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailSchedule))