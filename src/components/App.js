import React, { Component , Fragment} from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Route, withRouter, Redirect } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";
import { handleInitialData } from "../actions/shared";
import { handleSetAuthUser } from "../actions/authUser";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Nav from "./Nav";
import CreateUser from "./CreateUser";

class App extends Component {
    componentDidMount() {
        this.props.handleInitialData();
    }
    render() {
        const { goToLogin, handleSetAuthUser } = this.props;

        return (
            <div>
                Homepage
                <LoadingBar />
                <Nav />
                {goToLogin === true ? (
                    <Fragment>
                        <Route path='/' component={Login} />
                        <Route path='/createuser' component={CreateUser} />
                    </Fragment>
                ) : <Dashboard />}
                <Route
                    exact
                    path="/logout"
                    render={() => {
                        handleSetAuthUser(null);
                        return <Redirect to="/" />;
                    }}
                />
            </div>
        );
    }
}

function mapStateToProps({ authUser, users }) {
    return {
        goToLogin: authUser === null,
        users
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { handleInitialData, handleSetAuthUser },
        dispatch
    );
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
