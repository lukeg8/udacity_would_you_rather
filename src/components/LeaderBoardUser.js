import React, { Component } from "react";
import { connect } from "react-redux";

class LeaderBoardUser extends Component {
    render() {
        const { users, userId } = this.props;
        const userAnswers = Object.keys(users[userId].answers).length;
        const userQuestions = users[userId].questions.length;
        return (
            <div>
                LeaderBoardUser
                <p>{this.props.userId}</p>
                <p>Question Answer: {userAnswers}</p>
                <p>User created Question: {userQuestions}</p>
                <p>Total: {userAnswers+userQuestions}</p>
            </div>
        );
    }
}

function mapStateToProps({ users }) {
    return {
        users
    };
}

export default connect(mapStateToProps)(LeaderBoardUser);
