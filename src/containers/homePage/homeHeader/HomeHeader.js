import React from "react";
import { connect } from "react-redux";
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGE } from '../../../utils/constant';
import { changeLanguagePage } from '../../../store/actions'
import { withRouter } from "react-router";
class HomeHeader extends React.Component {

    handleChangeLanguage = (language) => {
        this.props.changeLanguageRedux(language)
    }
    handleGotoHome = () => {
        this.props.history.push('/home')
    }
    render() {
        let { languageRedux } = this.props
        console.log("check language redux", languageRedux);
        return (
            <>
                <div className="wrap-home-container">
                    <div className="home-container">
                        <nav className="home-content-nav">
                            <div className="home-nav_logo">
                                <i className="fas fa-bars home-nav_menu-item"></i>
                                <div className="home-nav_logo-item" onClick={() => this.handleGotoHome()}></div>
                            </div>
                            <ul className="home-nav_list">
                                <li className="home-nav_item">
                                    <a href="#" className="home-nav_link">
                                        <span className="home-nav_link-title"><FormattedMessage id="homeHeader.specialty" /></span>
                                        <span className="home-nav_link-discription"><FormattedMessage id="homeHeader.searchDoctor" /></span>
                                    </a>
                                </li>
                                <li className="home-nav_item">
                                    <a href="#" className="home-nav_link">
                                        <span className="home-nav_link-title"><FormattedMessage id="homeHeader.facilities" /></span>
                                        <span className="home-nav_link-discription"><FormattedMessage id="homeHeader.selectHospital" /></span>
                                    </a>
                                </li>
                                <li className="home-nav_item">
                                    <a href="#" className="home-nav_link">
                                        <span className="home-nav_link-title"><FormattedMessage id="homeHeader.doctor" /></span>
                                        <span className="home-nav_link-discription"><FormattedMessage id="homeHeader.selectDoctor" /></span>
                                    </a>
                                </li>
                                <li className="home-nav_item">
                                    <a href="#" className="home-nav_link">
                                        <span className="home-nav_link-title"><FormattedMessage id="homeHeader.examinationPackage" /></span>
                                        <span className="home-nav_link-discription"><FormattedMessage id="homeHeader.examination" /></span>
                                    </a>
                                </li>
                            </ul>
                            <div className="home-nav_support">
                                <i className="fas fa-question-circle home-nav_support-icon"></i>
                                <span className=" home-nav_support-text"><FormattedMessage id="homeHeader.support" /></span>
                                <span className={languageRedux === LANGUAGE.VI ? "language-vn active" : "language-vn"} onClick={() => this.handleChangeLanguage(LANGUAGE.VI)}>Vn</span>
                                <span className={languageRedux === LANGUAGE.EN ? "language-en active" : "language-en"} onClick={() => this.handleChangeLanguage(LANGUAGE.EN)}>En</span>
                            </div>
                        </nav>
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
        changeLanguageRedux: (language) => dispatch(changeLanguagePage(language))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader))