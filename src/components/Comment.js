import React, { Component } from "react";
import { connect } from "react-redux";

class Comment extends Component {
    render() {
        return (
            <div>
                {this.props.comment.text}
            </div>
        );
    }
}

function mapStateToProps({comments}, {commentId}) {
    return {
        comment: comments[commentId]
    }
}
export default connect(mapStateToProps)(Comment);
