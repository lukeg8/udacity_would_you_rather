import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const styles = {
    card: {
        minWidth: 275
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
    },
    title: {
        marginBottom: 16,
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
};

class Comment extends Component {
    render() {
        const { classes } = this.props;
        const { comment, commentId } = this.props;
        return (
            <Card className={classes.card} key={commentId}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary">
                        {comment.author} said
                    </Typography>
                    <Typography component="p">{comment.text}</Typography>
                </CardContent>
            </Card>
        );
    }
}

Comment.propTypes = {
    commentId : PropTypes.string.isRequired
}

function mapStateToProps({ comments }, { commentId }) {
    return {
        comment: comments[commentId],
        commentId
    };
}
export default connect(mapStateToProps)(withStyles(styles)(Comment));
