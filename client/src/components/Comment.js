import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MakeComment from './MakeComment';

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
    console.log('canceled');
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
            />
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { leftBorder } = this.props;
    return (
      <div
        style={{
          padding: '10px 20px',
          marginBottom: '12px',
          marginTop: '12px',
          borderLeft: 'solid 2px #ebebeb'
        }}
      >
        <span style={{ fontWeight: 'bold' }}>{this.props.userName}</span>
        <span style={{ fontSize: '12px' }}>&nbsp;&bull;&nbsp;{this.findTime()}</span>
        <br />
        <br />
        <p>{this.props.message}</p>
        <br />
        {this.state.replyClicked === false && (
          <button onClick={this.handleReplyClick}>reply</button>
        )}
        {this.state.replyClicked && (
          <MakeComment
            className="commentReply"
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