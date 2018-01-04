import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments, postComment } from '../redux/actions/comments';
import Comment from './Comment';

class CommentsBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.comments = this.props.comments;
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchComments(this.props.campaignID);
  }
  componentDidUpdate() {
    console.log('updated');
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
      console.log('must be logged in');
    }
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
  render() {
    return (
      <div>
        <form>
          New Message:
          <br />
          <input type="text" onChange={this.handleMessageChange} />
          <button type="submit" onClick={this.handleSubmitComment}>
            Post Message
          </button>
        </form>
        {this.renderComments()}
      </div>
    );
  }
}

export default connect(
  ({ activeCampaign, auth, comments }) => ({ activeCampaign, auth, comments }),
  { fetchComments, postComment }
)(CommentsBox);
