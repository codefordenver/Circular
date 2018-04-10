import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchComments, postComment } from '../redux/actions/comments';
import Comment from './Comment';
import PostBox from './PostBox';

class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
    this.comments = this.props.comments;
  }

  componentDidMount() {
    this.props.fetchComments(this.props.campaignID);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.comments.commentsLoaded === true || nextProps.comments.fetchError !== undefined
    );
  }

  renderMainPostBox() {
    if (this.props.auth && this.props.auth._id) {
      return (
        <PostBox
          className="main-post-box"
          campaignID={this.props.campaignID}
          fetchComments={this.props.fetchComments}
          isAReply={false}
        />
      );
    }
    return <div>Log in to join the discussion!</div>;
  }

  renderComments() {
    const comments = this.props.comments;
    if (comments.commentsLoaded === true) {
      return (
        <div>
          {Object.keys(comments.campaignComments).map(u => (
            <div key={comments.campaignComments[u]._id}>
              <Comment
                userName={comments.campaignComments[u].userName}
                message={comments.campaignComments[u].message}
                dateAdded={comments.campaignComments[u].createdAt}
                passedChildren={comments.campaignComments[u].children}
                campaignID={this.props.campaignID}
                commentID={comments.campaignComments[u]._id}
                authorized={this.props.auth !== undefined && this.props.auth._id !== undefined}
              />
            </div>
          ))}
        </div>
      );
    }
    return <div />;
  }

  renderError() {
    return (
      <div className="error-message">
        {this.state.error ? 'You must be logged in to post!' : null}
      </div>
    );
  }

  render() {
    return (
      <div className="discussion">
        <div className="discussion-header">COMMENTS</div>
        <div className="comment-box">{this.renderComments()}</div>
        <div>{this.renderMainPostBox()}</div>
      </div>
    );
  }
}

Discussion.defaultProps = {
  signatureObj: { signatures: [] },
  auth: {}
};

Discussion.propTypes = {
  auth: PropTypes.shape({
    _id: PropTypes.string,
    googleID: PropTypes.string
  }),
  comments: PropTypes.shape({
    campaignComments: PropTypes.Object
  }).isRequired,
  campaignID: PropTypes.string.isRequired,
  fetchComments: PropTypes.func.isRequired
};

export default connect(
  ({ activeCampaign, auth, comments }) => ({ activeCampaign, auth, comments }),
  {
    fetchComments,
    postComment
  }
)(Discussion);
