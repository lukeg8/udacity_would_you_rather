import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { handleAddUser } from "../actions/users";
import { Redirect, withRouter } from "react-router-dom";

class CreateUser extends Component {
    state = {
        redirect: false
    };
    handleSubmit = e => {
        e.preventDefault();
        const userObj = {
            id: this._username.value,
            name: this._name.value,
            avatarURL: this._avatarUrl.value,
            answers: {},
            questions: []
        };
        this.props.handleAddUser(userObj);
        this.setState({
            redirect: true
        });
    };
    render() {
        if (this.state.redirect === true) {
            return <Redirect to="/" />;
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="username"
                        ref={inputValue => (this._username = inputValue)}
                    />
                    <input
                        type="text"
                        placeholder="name"
                        ref={inputValue => (this._name = inputValue)}
                    />
                    <input
                        type="text"
                        placeholder="Avatar URL"
                        ref={inputValue => (this._avatarUrl = inputValue)}
                    />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

function mapDispatchToState(dispatch) {
    return bindActionCreators({ handleAddUser }, dispatch);
}

export default withRouter(
    connect(
        null,
        mapDispatchToState
    )(CreateUser)
);
