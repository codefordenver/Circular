import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchComments, postComment } from '../redux/actions/comments';
import Comment from './Comment';

class CommentsBox extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false };

    this.comments = this.props.comments;
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchComments(this.props.campaignID);
  }

  handleMessageChange(e) {
    this.setState({
      message: e.target.value
    });
  }
  async handleSubmitComment(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.props.auth && this.props.auth._id) {
      await this.props.postComment({
        message: this.state.message,
        user_id: this.props.auth._id,
        campaign_id: this.props.activeCampaign.campaign._id
      });
      this.props.fetchComments(this.props.campaignID);
    } else {
      this.setState({ error: true });
    }
  }

  renderMainCommentInput() {
    if (this.props.auth && this.props.auth._id) {
      return (
        <form>
          New Message:
          <br />
          <input type="text" onChange={this.handleMessageChange} />
          <br />
          {this.renderError()}
          <button type="submit" onClick={this.handleSubmitComment}>
            Post Message
          </button>
        </form>
      );
    }
    return <div>Log in to join the discussion!</div>;
  }

  renderComments() {
    const comments = this.props.comments;
    if (comments.loaded === true) {
      return (
        <div>
          {Object.keys(comments.campaignComments).map(u => (
            <Comment
              key={comments.campaignComments[u]._id}
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

  renderError() {
    return (
      <div className="error-message">
        {this.state.error ? 'You must be logged in to post!' : null}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderMainCommentInput()}
        {this.renderComments()}
      </div>
    );
  }
}

CommentsBox.defaultProps = {
  signatureObj: { signatures: [] },
  auth: {}
};

CommentsBox.propTypes = {
  auth: PropTypes.shape({
    _id: PropTypes.string,
    googleID: PropTypes.string
  }),
  activeCampaign: PropTypes.shape({
    campaign: PropTypes.shape({
      street_address: PropTypes.string,
      _id: PropTypes.string
    }),
    loading: PropTypes.bool,
    loaded: PropTypes.bool
  }).isRequired,
  comments: PropTypes.shape({
    campaignComments: PropTypes.Object
  }).isRequired,
  campaignID: PropTypes.string.isRequired,
  fetchComments: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired
};

export default connect(
  ({ activeCampaign, auth, comments }) => ({ activeCampaign, auth, comments }),
  { fetchComments, postComment }
)(CommentsBox);
