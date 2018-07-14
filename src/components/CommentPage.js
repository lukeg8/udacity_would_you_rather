import React, { Component } from "react";
import { connect } from "react-redux";
import Comment from "./Comment";
import NewComment from "./NewComment";

class CommentPage extends Component {
    render() {
        const { commentArray, qid } = this.props;
        return (
            <div>
                <ul>
                    {commentArray && commentArray.map(commentId => {
                        return (
                            <li key="commentId">
                                <Comment commentId={commentId} />
                            </li>
                        );
                    })}
                </ul>
                <NewComment qid={qid} />
            </div>
        );
    }
}

function mapStateToProps({ questions }, { qid }) {
    const commentArray = questions[qid].comments;
    return {
        commentArray: commentArray ? commentArray: null,
        qid
    };
}

export default connect(mapStateToProps)(CommentPage);
