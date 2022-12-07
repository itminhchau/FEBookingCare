import React from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import './HomeFeaturedDoctor.scss';
import * as actions from '../../../store/actions'
import { LANGUAGE } from '../../../utils';
import { CommonUtils } from '../../../utils';
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
class HomeFeaturedDoctor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listTopDoctor: []
        }
    }
    componentDidMount = () => {
        this.props.topDoctorRedux()
    }
    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.topDoctorDataRedux !== this.props.topDoctorDataRedux) {
            this.setState({
                listTopDoctor: this.props.topDoctorDataRedux
            })
        }
    }

    handlerClickDoctor = (user) => {
        this.props.history.push(`/detail/doctor/${user.id}`);
    }
    render() {
        let { listTopDoctor } = this.state
        let { languageRedux } = this.props
        console.log("check state list doctor", listTopDoctor);
        return (
            <div className="section-containner featuredDoctor-containner">
                <div className="section-content">
                    <div className="section-header">
                        <span className="section-header-title"><FormattedMessage id='homeSection.doctorTop' /></span>
                        <button className="section-header-btn"><FormattedMessage id='homeSection.see-more' /></button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {listTopDoctor && listTopDoctor.length > 0 &&
                                listTopDoctor.map((item, index) => {
                                    let imageBlodToBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    let name = `${item.lastName} ${item.firstName}`
                                    return (
                                        <div className="section-item" onClick={() => this.handlerClickDoctor(item)}>
                                            <div className="outer-image">
                                                <div className="section-item-image featuredDoctor-image"
                                                    style={{ backgroundImage: `url(${imageBlodToBase64})` }}
                                                ></div>
                                            </div>
                                            <div className="outer-title">
                                                <span className="section-item-name">{name}</span>
                                                <span className="section-item-position">
                                                    {languageRedux === LANGUAGE.VI ? `${item.positionData.valueVi}` : `${item.positionData.valueEn}`}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </Slider>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        topDoctorDataRedux: state.admin.arrayTopDoctor,
        languageRedux: state.app.language
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        topDoctorRedux: () => dispatch(actions.getTopDoctor())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeFeaturedDoctor))