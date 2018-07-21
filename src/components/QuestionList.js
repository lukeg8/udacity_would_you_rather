import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Question from "./Question";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const styles = {
  paperRoot: {
    flexGrow: 1
  },
  listRoot: {
    width: "100%",
    maxWidth: 360,
  }
};

class QuestionList extends Component {
  state = {
    questionAnswer: false,
    tabValue: 0
  };
  handleChange = (event, tabValue) => {
    this.setState({ tabValue });
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

    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.paperRoot}>
          <Tabs
            value={this.state.tabValue}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Unanswered Questions" />
            <Tab label="Answered Questions" />
          </Tabs>
          <List component="nav">
            <ListItem button>
              <ListItemText primary="Inbox" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Drafts" />
            </ListItem>
          </List>
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
        </Paper>
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
)(withStyles(styles)(QuestionList));
