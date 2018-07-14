import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class Nav extends Component {
    render() {
        const { authUser } = this.props;
        return (
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" activeClassName="active">
                            Home
                        </NavLink>
                    </li>
                    {authUser === null ? (
                        <Fragment>
                            <li>Hello Friend!</li>
                            <li>
                                <NavLink
                                    to="/createuser"
                                    activeClassName="active"
                                >
                                    New User
                                </NavLink>
                            </li>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <li>
                                <NavLink to="/add" activeClassName="active">
                                    New Question
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/leaderboard"
                                    activeClassName="active"
                                >
                                    Leaderboard
                                </NavLink>
                            </li>
                            <li>Welcome {authUser}!!!</li>
                            <li>
                                <NavLink to="/logout">Logout</NavLink>
                            </li>
                        </Fragment>
                    )}
                </ul>
            </nav>
        );
    }
}

function mapStateToProps({ authUser }) {
    return {
        authUser
    };
}
export default connect(mapStateToProps)(Nav);
