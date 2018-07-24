import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { handleSaveAnswer } from "../actions/shared";
import CommentPage from "./CommentPage";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Badge from '@material-ui/core/Badge';

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    width: 500
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500
  },
  menu: {
    width: 500
  },
  margin: {
    margin: theme.spacing.unit,
  },

  cssFocused: {},
  bootstrapRoot: {
    padding: 0,
    "label + &": {
      marginTop: theme.spacing.unit * 3
    }
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 12px",
    width: "calc(100% - 24px)",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  },
  bootstrapFormLabel: {
    fontSize: 18
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  card: {
    display: "flex"
  },
  paperRoot: {
    flexGrow: 1
  },
  listRoot: {
    width: "100%",
    maxWidth: 360
  },
  card: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0"
  },
  cover: {
    width: 151,
    height: 151
  },
  playIcon: {
    height: 38,
    width: 38
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 3}px`,
  },
});

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
      return <div>This question doesn't exist</div>;
    }
    const { selectedOption } = this.state;
    const { user, question, users, authUser } = this.props;
    const userAnswer = Object.keys(user.answers).includes(question.id);
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;
    const optionOneVotesPercentage = (optionOneVotes / totalVotes * 100).toFixed(0);
    const optionTwoVotesPercentage = (optionTwoVotes / totalVotes * 100).toFixed(0);

    const { classes } = this.props;
    return (
      <div>
        {userAnswer === true ? (
          <div>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cover}
                image={users[question.author].avatarURL}
                title="Live from space album cover"
              />
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography className={classes.title} color="textSecondary">
                    Tyler ask
                  </Typography>
                  <Badge color="secondary" badgeContent='*'>
                  <Typography className={classes.padding} color="primary">
                    {question.optionOne.text}
                  </Typography><span>{optionOneVotesPercentage}% - {optionOneVotes} votes</span>
                  </Badge>
                  <Typography className={classes.padding} color="primary">
                    {question.optionTwo.text} <span style={{paddingLeft:50 }}> {optionTwoVotesPercentage}% - {optionTwoVotes} votes</span>
                  </Typography>
                </CardContent>
              </div>
            </Card>
          </div>
        ) : (
          <div>
            <form onSubmit={e => this.handleSubmit(e, question.id)}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cover}
                  image={users[question.author].avatarURL}
                  title="Live from space album cover"
                />
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <FormControl
                      component="fieldset"
                      required
                      error
                      className={classes.formControl}
                    >
                      <FormLabel>Would you Rather...</FormLabel>
                      <RadioGroup
                        className={classes.group}
                        value={this.state.selectedOption}
                        onChange={this.handleRadioChange}
                      >
                        <FormControlLabel
                          value="optionOne"
                          control={<Radio color="primary" />}
                          label={question.optionOne.text}
                        />
                        <FormControlLabel
                          value="optionTwo"
                          control={<Radio color="primary" />}
                          label={question.optionTwo.text}
                        />
                      </RadioGroup>
                    </FormControl>
                    <br />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={e => this.handleSubmit(e, question.id)}
                    >
                      Submit
                    </Button>
                  </CardContent>
                </div>
              </Card>
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
    authUser,
    users
  };
}

function mapStateToDispatch(dispatch) {
  return bindActionCreators({ handleSaveAnswer }, dispatch);
}
export default withRouter(
  connect(
    mapStateToProps,
    mapStateToDispatch
  )(withStyles(styles)(QuestionPage))
);
