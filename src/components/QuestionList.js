import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Question from "./Question";

class QuestionList extends Component {
    state = {
        questionAnswer: false
    };
    handleQuestionAnswer = inputValue => {
        this.setState({
            questionAnswer: inputValue
        });
    };
    sortQuestionArray = (questionArray, questionsObj) => {
        return questionArray.sort((a, b) => {
            return questionsObj[b].timestamp - questionsObj[a].timestamp;
        });
    };
    render() {
        const { questionAnswer } = this.state;
        const { users, questions, authUser } = this.props;
        const userAnswerQuestions = this.sortQuestionArray(
            Object.keys(users[authUser].answers),
            questions
        );
        const userUnanswerQuestions = this.sortQuestionArray(
            Object.keys(questions).filter(
                question => !userAnswerQuestions.includes(question)
            ),
            questions
        );

        return (
            <div>
                <button onClick={() => this.handleQuestionAnswer(false)}>
                    UnANSWERED
                </button>
                <button onClick={() => this.handleQuestionAnswer(true)}>
                    ANSWERED
                </button>
                {questionAnswer ? (
                    <div>
                        <p>Questiions I ANSWERED</p>
                        <ul>
                            {userAnswerQuestions.map(question_id => (
                                <li key={question_id}>
                                    <Link to={`/question/${question_id}`}>
                                        <Question question_id={question_id} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div>
                        <p>Questions UNANSWERED</p>
                        <ul>
                            {userUnanswerQuestions.map(question_id => (
                                <li key={question_id}>
                                    <Link to={`/question/${question_id}`}>
                                        <Question question_id={question_id} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps({ users, questions, authUser }) {
    return { users, questions, authUser };
}

function mapStateToDispatch(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(
    mapStateToProps,
    mapStateToDispatch
)(QuestionList);
