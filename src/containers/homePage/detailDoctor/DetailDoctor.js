import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from '../../../store/actions';
import { LANGUAGE } from "../../../utils";
import DetailSchedule from '../detailDoctor/DetailSchedule';
import HomeHeader from "../homeHeader/HomeHeader";
import './DetailDoctor.scss';

class DetailDoctor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inforDoctor: {}
        }
    }
    componentDidMount = () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.props.getDetailDoctorRedux(this.props.match.params.id)
        }
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.dataDetailDoctorRedux !== this.props.dataDetailDoctorRedux) {
            this.setState({
                inforDoctor: this.props.dataDetailDoctorRedux
            })
        }
    }
    render() {
        let { inforDoctor } = this.state
        let { languageRedux } = this.props
        let nameVi = '', nameEn = ''
        if (inforDoctor && inforDoctor.positionData) {
            nameVi = `${inforDoctor.positionData.valueVi}, ${inforDoctor.lastName} ${inforDoctor.firstName}`
            nameEn = `${inforDoctor.positionData.valueEn},${inforDoctor.firstName} ${inforDoctor.lastName}  `
        }
        return (
            <>
                <HomeHeader />
                <div className="wrap-detail-doctor">
                    <div className="doctor_infor">
                        <div className="doctor_image" >
                            <div className="image" style={{ backgroundImage: `url(${inforDoctor.image})` }}>

                            </div>
                        </div>
                        <div className="doctor_name">
                            <div className="doctor_name_title">{
                                languageRedux === LANGUAGE.VI ? `${nameVi}` : `${nameEn}`
                            }

                            </div>
                            <div className="doctor_name_more">
                                {inforDoctor && inforDoctor.Markdown && inforDoctor.Markdown.discription &&
                                    <span>{inforDoctor.Markdown.discription}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="doctor-schedule">
                        <div className="doctor-schedule-content">
                            <DetailSchedule />
                        </div>
                        <div className="doctor-schedule-more">

                        </div>
                    </div>
                    <div className="doctor_discription">
                        {inforDoctor && inforDoctor.Markdown && inforDoctor.Markdown.contentHTML &&

                            <div dangerouslySetInnerHTML={{ __html: `${inforDoctor.Markdown.contentHTML}` }}></div>
                        }
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataDetailDoctorRedux: state.user.doctorInfo,
        languageRedux: state.app.language
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getDetailDoctorRedux: (idDoctor) => dispatch(actions.getDetailDoctor(idDoctor))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailDoctor))