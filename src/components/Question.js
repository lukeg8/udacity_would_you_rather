import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";


import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
const styles = {
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
        flex: "1 0 auto"
    },
    cover: {
        width: 151,
        height: 151
    },
    playIcon: {
        height: 38,
        width: 38
    },
};

class Question extends Component {
    render() {
        const { question,users } = this.props;

        if (question === null) {
            return <div>Question doesn't exist</div>;
        }
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cover}
                        image={users[question.author].avatarURL}
                        title="Live from space album cover"
                    />
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography>Would you rather ...</Typography>
                            <Typography
                                variant="subheading"
                                color="textSecondary"
                            >
                                {`By ${question.author}`}
                            </Typography>
                            <Typography
                                variant="headline"
                                color="textSecondary"
                            >
                                {question.optionOne.text}
                            </Typography>
                            <Typography color="textSecondary" align="center">
                                ...
                            </Typography>
                            <Typography
                                variant="headline"
                                color="textSecondary"
                            >
                                {question.optionTwo.text}
                            </Typography>
                        </CardContent>
                        <div className={classes.controls} />
                    </div>
                </Card>
            </div>
        );
    }
}

function mapStateToProps({ questions, authUser,users }, { question_id }) {
    const question = questions[question_id];
    return {
        question: question ? questions[question_id] : null,
        authUser,
        users
    };
}
export default withRouter(connect(mapStateToProps)(withStyles(styles)(Question)));
