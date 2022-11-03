import React from "react";
import { connect } from "react-redux";
import './HomeBanner.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faMicroscope, faMobileAlt, faHeadSideMask, faTooth, faScissors, faHeart, faAmbulance, faHospital } from "@fortawesome/free-solid-svg-icons";
import { FormattedMessage } from "react-intl";
class HomeBanner extends React.Component {

    render() {
        return (
            <div className="home-banner-container">
                <div className="home-banner-content">
                    <div className="banner-content-one">
                        <div className="home-banner-title">
                            <span className="title-item-one"><FormattedMessage id="homeBanner.medicalPlatform" /> </span>
                            <span className="title-item-two"><FormattedMessage id="homeBanner.healthyCare" /></span>
                        </div>
                        <div className="home-banner-search">
                            <i className="fas fa-search"></i>
                            <input type="text" className="input-search" placeholder="Tìm kiếm theo chuyên khoa" />

                        </div>
                    </div>
                    <div className="banner-content-two">
                        <div className="home-banner-option">
                            <div className="home-option-item">
                                <div className=" option-icon"><FontAwesomeIcon icon={faHospital} className="item-icon" /></div>
                                <span className=" option-title"><FormattedMessage id="homeBanner.examSpecialist" /></span>
                            </div>
                            <div className="home-option-item">
                                <div className="option-icon"><FontAwesomeIcon icon={faMobileAlt} className="item-icon" /></div>
                                <span className="option-title"><FormattedMessage id="homeBanner.remoteExam" /></span>
                            </div>
                            <div className="home-option-item">
                                <div className="option-icon"><FontAwesomeIcon icon={faBook} className="item-icon" /></div>
                                <span className="option-title"><FormattedMessage id="homeBanner.examGeneral" /></span>
                            </div>
                            <div className="home-option-item">
                                <div className="option-icon"><FontAwesomeIcon icon={faMicroscope} className="item-icon" /></div>
                                <span className="option-title"><FormattedMessage id="homeBanner.test" /></span>
                            </div>
                            <div className="home-option-item">
                                <div className="option-icon"><FontAwesomeIcon icon={faHeadSideMask} className="item-icon" /></div>
                                <span className="option-title"><FormattedMessage id="homeBanner.mentalHealth" /></span>
                            </div>
                            <div className="home-option-item">
                                <div className="option-icon"><FontAwesomeIcon icon={faTooth} className="item-icon" /></div>
                                <span className="option-title"><FormattedMessage id="homeBanner.dentistry" /></span>
                            </div>
                            <div className="home-option-item">
                                <div className="option-icon"><FontAwesomeIcon icon={faScissors} className="item-icon" /></div>
                                <span className="option-title"><FormattedMessage id="homeBanner.surgery" /></span>
                            </div>
                            <div className="home-option-item">
                                <div className="option-icon"><FontAwesomeIcon icon={faHeart} className="item-icon" /></div>
                                <span className="option-title"><FormattedMessage id="homeBanner.medical" /></span>
                            </div>
                            <div className="home-option-item">
                                <div className="option-icon"><FontAwesomeIcon icon={faAmbulance} className="item-icon" /></div>
                                <span className="option-title"><FormattedMessage id="homeBanner.healthy" /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return {

    }
}
const mapDispatchToProps = () => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeBanner)