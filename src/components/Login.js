import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleSetAuthUser } from "../actions/authUser";

class Login extends Component {
    state = {
        formSelect: ""
    };
    handleChange = e => {
        this.setState({
            formSelect: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        if (this.state.formSelect !== ''){
            this.props.handleSetAuthUser(this.state.formSelect);
        }
    };
    render() {
        const { loading, users } = this.props;
        const usersArray = Object.keys(users);
        return (
            <div>
                Login
                {loading === true ? null : (
                    <form onSubmit={this.handleSubmit}>
                    <select
                        value={this.state.formSelect}
                        onChange={this.handleChange}
                    >
                        <option key="" value="">
                            SELECT ONE
                        </option>
                        {usersArray.map(user => {
                            return (
                                <option key={user} value={user}>
                                    {user}
                                </option>
                            );
                        })}
                    </select>
                    <button>Submit</button>
                </form>
                )}
            </div>
        );
    }
}

function mapStateToProps({ users }) {
    return {
        loading: Object.keys(users).length === 0,
        users
    };
}
function mapStateToDispatch(dispatch) {
    return bindActionCreators({ handleSetAuthUser }, dispatch);
}

export default connect(
    mapStateToProps,
    mapStateToDispatch
)(Login);
