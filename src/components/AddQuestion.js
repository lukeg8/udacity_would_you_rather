import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleNewQuestion } from "../actions/shared";

class AddQuestion extends Component {
    state = {
        optionOne: "",
        optionTwo: "",
        toHome: false
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.handleNewQuestion(this.state.optionOne, this.state.optionTwo)
        this.setState({ toHome: true });
    };
    handleChangeText = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    render() {
        if (this.state.toHome === true) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="optionOne"
                        name="optionOne"
                        onChange={this.handleChangeText}
                    />
                    <input
                        type="text"
                        placeholder="optionTwo"
                        name="optionTwo"
                        onChange={this.handleChangeText}
                    />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

function mapStateToDispatch(dispatch) {
    return bindActionCreators({handleNewQuestion}, dispatch)
}

export default connect(null, mapStateToDispatch)(AddQuestion);
