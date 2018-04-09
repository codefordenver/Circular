import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PostBox from './PostBox';

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = { replyClicked: false };

    this.handleReplyClick = this.handleReplyClick.bind(this);
    this.handleCloseReply = this.handleCloseReply.bind(this);
  }

  findTime() {
    const seconds = Math.floor((new Date() - new Date(this.props.dateAdded)) / 1000);
    const ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60;
    const ONE_MONTH_IN_SECONDS = 30 * 24 * 60 * 60;
    const ONE_DAY_IN_SECONDS = 24 * 60 * 60;
    const ONE_HOUR_IN_SECONDS = 60 * 60;
    const ONE_MINUTE_IN_SECONDS = 60;
    let interval = Math.floor(seconds / ONE_YEAR_IN_SECONDS); // one year in seconds
    if (interval >= 1) {
      if (interval === 1) {
        return `${interval} year`;
      }
      return `${interval} years`;
    }
    interval = Math.floor(seconds / ONE_MONTH_IN_SECONDS);
    if (interval >= 1) {
      if (interval === 1) {
        return `${interval} month`;
      }
      return `${interval} months`;
    }
    interval = Math.floor(seconds / ONE_DAY_IN_SECONDS);
    if (interval >= 1) {
      if (interval === 1) {
        return `${interval} day`;
      }
      return `${interval} days`;
    }
    interval = Math.floor(seconds / ONE_HOUR_IN_SECONDS);
    if (interval >= 1) {
      if (interval === 1) {
        return `${interval} hour`;
      }
      return `${interval} hours`;
    }
    interval = Math.floor(seconds / ONE_MINUTE_IN_SECONDS);
    if (interval >= 1) {
      if (interval === 1) {
        return `${interval} minute`;
      }
      return `${interval} minutes`;
    }
    return 'Less than a minute ago';
  }

  handleCloseReply() {
    this.setState({ replyClicked: false });
  }

  handleReplyClick() {
    this.setState({ replyClicked: true });
  }

  renderChildren() {
    const comments = this.props.passedChildren;
    return (
      <div className="comments-box">
        {Object.keys(comments).map(u => (
          <div key={comments[u]._id} className="comment-child">
            <Comment
              userName={comments[u].userName}
              message={comments[u].message}
              dateAdded={comments[u].createdAt}
              passedChildren={comments[u].children}
              campaignID={this.props.campaignID}
              commentID={comments[u]._id}
              authorized={this.props.authorized}
            />
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div className="comment">
        <span className="comment-name">{this.props.userName}</span>
        <span className="comment-time">&nbsp;&bull;&nbsp;{this.findTime()}</span>
        <p className="posted-message">{this.props.message}</p>
        {this.state.replyClicked === false &&
          this.props.authorized && (
            <div className="comment-options">
              <button className="reply-button" onClick={this.handleReplyClick}>
                REPLY
              </button>
            </div>
          )}
        {this.state.replyClicked && (
          <PostBox
            className="child-comment-post-box"
            isAReply
            parentID={this.props.commentID}
            campaignID={this.props.campaignID}
            handleCloseReply={this.handleCloseReply}
          />
        )}
        {this.renderChildren()}
      </div>
    );
  }
}

Comment.defaultProps = {
  leftBorder: false
};

Comment.propTypes = {
  authorized: PropTypes.bool.isRequired,
  campaignID: PropTypes.string.isRequired,
  commentID: PropTypes.string.isRequired,
  dateAdded: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  passedChildren: PropTypes.arrayOf(PropTypes.any).isRequired,
  userName: PropTypes.string.isRequired
};

export default Comment;
