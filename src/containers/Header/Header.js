import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGE } from '../../utils/constant';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import { FormattedMessage } from 'react-intl';
import './Header.scss';

class Header extends Component {

    handleOnclickChangeLanguage = (language) => {
        this.props.changeLanguage(language)
    }
    render() {
        const { processLogout, languageRedux, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                {/* nút logout */}
                <div className="wrap-item-right">
                    <span className='wellcome'><FormattedMessage id='homeHeader.wellcome' />{
                        userInfo && userInfo.firstName && userInfo.lastName ? userInfo.lastName + " " + userInfo.firstName : ""
                    }</span>
                    <div className="language">
                        <span className={languageRedux === LANGUAGE.VI ? 'language-vn active' : 'language-vn'} onClick={() => this.handleOnclickChangeLanguage(LANGUAGE.VI)}>VN</span>
                        <span className={languageRedux === LANGUAGE.EN ? 'language-en active' : 'language-en'} onClick={() => this.handleOnclickChangeLanguage(LANGUAGE.EN)}>EN</span>
                    </div>
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        languageRedux: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguage: (language) => dispatch(actions.changeLanguagePage(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
