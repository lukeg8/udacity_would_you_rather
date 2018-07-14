import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { handleSaveAnswer } from "../actions/shared";
import CommentPage from "./CommentPage";

class QuestionPage extends Component {
    state = {
        selectedOption: "optionOne"
    };
    handleRadioChange = e => {
        this.setState({ selectedOption: e.target.value });
    };
    handleSubmit = (e, id) => {
        e.preventDefault();
        this.props.handleSaveAnswer({
            qid: id,
            answer: this.state.selectedOption
        });
    };
    render() {
        if (this.props.authUser === null) {
            return <Redirect to="/" />;
        }
        if (this.props.question === null) {
            return <div>Thisquestion doesn't exist</div>;
        }
        const { selectedOption } = this.state;
        const { user, question } = this.props;
        const userAnswer = Object.keys(user.answers).includes(question.id);
        const optionOneVotes = question.optionOne.votes.length;
        const optionTwoVotes = question.optionTwo.votes.length;
        const totalVotes = optionOneVotes + optionTwoVotes;
        const optionOneVotesPercentage = optionOneVotes / totalVotes;
        const optionTwoVotesPercentage = optionTwoVotes / totalVotes;
        return (
            <div>
                {question.id}

                {userAnswer === true ? (
                    <div>
                        Would you rather?
                        <ul>
                            <li>{question.optionOne.text}</li>
                            <li>{question.optionTwo.text}</li>
                        </ul>
                        <p>ANSWER - You selected {user.answers[question.id]}</p>
                        <p>
                            V1: {optionOneVotesPercentage} - {optionOneVotes}
                        </p>
                        <p>
                            V2: {optionTwoVotesPercentage} - {optionTwoVotes}
                        </p>
                    </div>
                ) : (
                    <div>
                        <p>UNANSWER - Please answer</p>
                        <form onSubmit={e => this.handleSubmit(e, question.id)}>
                            <label>
                                <input
                                    type="radio"
                                    value="optionOne"
                                    checked={selectedOption === "optionOne"}
                                    onChange={this.handleRadioChange}
                                />
                                {question.optionOne.text}
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="optionTwo"
                                    checked={selectedOption === "optionTwo"}
                                    onChange={this.handleRadioChange}
                                />
                                {question.optionTwo.text}
                            </label>
                            <button>Submit</button>
                        </form>
                    </div>
                )}

                <CommentPage qid={question.id} />
            </div>
        );
    }
}

function mapStateToProps({ questions, users, authUser }, props) {
    const { question_id } = props.match.params;
    const question = questions[question_id];
    const user = users[authUser];
    return {
        question: question ? question : null,
        user,
        authUser
    };
}

function mapStateToDispatch(dispatch) {
    return bindActionCreators({ handleSaveAnswer }, dispatch);
}
export default withRouter(
    connect(
        mapStateToProps,
        mapStateToDispatch
    )(QuestionPage)
);
