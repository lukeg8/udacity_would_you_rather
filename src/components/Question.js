import React, { Component } from "react";
import { connect } from "react-redux";


class Question extends Component {
    render() {
        const { question} = this.props;

        if (question === null) {
            return <div>Question doesn't exist</div>;
        }
        return (
            <div>
                <p>{question.optionOne.text}</p>
                <p>{question.optionTwo.text}</p>
                <p>{question.timestamp}</p>
            </div>
        );
    }
}

function mapStateToProps({ questions }, { question_id }) {
    const question = questions[question_id];
    return {
        question: question ? questions[question_id] : null
    };
}
export default connect(mapStateToProps)(Question);
