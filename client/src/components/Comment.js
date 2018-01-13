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
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return `${interval} years`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} months`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} days`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} hours`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} minutes`;
    }
    return `${Math.floor(seconds)} seconds`;
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
      <div>
        {Object.keys(comments).map(u => (
          <div key={comments[u]._id}>
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
        <span style={{ fontWeight: 'bold' }}>{this.props.userName}</span>
        <span style={{ fontSize: '12px' }}>&nbsp;&bull;&nbsp;{this.findTime()}</span>
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
  dateAdded: PropTypes.string.isRequired,
  leftBorder: PropTypes.bool,
  message: PropTypes.string.isRequired,
  passedChildren: PropTypes.arrayOf(PropTypes.any).isRequired,
  userName: PropTypes.string.isRequired
};

export default Comment;
