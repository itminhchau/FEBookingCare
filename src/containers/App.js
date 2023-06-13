import { ConnectedRouter as Router } from 'connected-react-router';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import CustomScrollbars from '../components/CustomScrollbars';
import Login from '../containers/auth/Login';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { history } from '../redux';
import Doctor from '../routes/Doctor';
import Home from '../routes/Home';
import System from '../routes/System';
import { path } from '../utils';
import DetailDoctor from './homePage/detailDoctor/DetailDoctor';
import HomePage from './homePage/HomePage';
class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">

                        <div className="content-container" >
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />

                                </Switch>
                            </CustomScrollbars>
                        </div>
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);