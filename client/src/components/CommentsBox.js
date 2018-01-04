import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchComments from '../redux/actions/comments';
import Comment from './Comment';

class CommentsBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.comments = this.props.comments;
  }
  componentDidMount() {
    this.props.fetchComments(this.props.campaignID);
  }

  renderComments() {
    const comments = this.props.comments;
    if (comments.loaded === true) {
      return (
        <div>
          {Object.keys(comments.campaignComments).map(u => (
            <Comment
              userName={comments.campaignComments[u].userName}
              message={comments.campaignComments[u].message}
              dateAdded={comments.campaignComments[u].createdAt}
              passedChildren={comments.campaignComments[u].children}
            />
          ))}
        </div>
      );
    }
    return <div />;
  }

  render() {
    return (
      <div>
        {/* <AddComment />
        <GoogleSignin /> */}
        {this.renderComments()}
      </div>
    );
  }
}

export default connect(({ comments }) => ({ comments }), { fetchComments })(CommentsBox);
