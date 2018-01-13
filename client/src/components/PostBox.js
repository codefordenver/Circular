import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { postComment, fetchComments } from '../redux/actions/comments';

class PostBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      selected: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleFocusText = this.handleFocusText.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
  }

  handleFocus() {
    this.setState({ selected: true });
  }

  handleFocusText() {
    this.textElement.focus();
  }

  handleBlur() {
    if (this.state.message === '') {
      this.setState({ selected: false });
    }
  }

  handleChange(e) {
    const formattedText = e.target.innerText.replace(/ +/g, ' ').replace(/[\r\n]{3,}/g, '\n\n');
    this.setState({ message: formattedText });
  }

  async handleSubmitComment(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.props.auth && this.props.auth._id) {
      if (this.props.parentID) {
        await this.props.postComment({
          message: this.state.message,
          user_id: this.props.auth._id,
          parent_id: this.props.parentID
        });
      } else {
        await this.props.postComment({
          message: this.state.message,
          user_id: this.props.auth._id,
          campaign_id: this.props.campaignID
        });
      }
      this.props.fetchComments(this.props.campaignID);
      if (this.props.isAReply) {
        this.props.handleCloseReply();
      } else {
        this.textElement.innerText = '';
        this.setState({ message: '', selected: false });
      }
    } else {
      this.setState({ error: true });
    }
  }

  render() {
    return (
      <div className={`${this.props.className} post-box-shared`}>
        <div className="text-area-wrapper" role="presentation" onClick={this.handleFocusText}>
          <div
            ref={input => {
              this.textElement = input;
            }}
            className={'post-box-message'}
            style={{
              minHeight: this.state.selected || this.props.isAReply ? '100px' : '20px'
            }}
            contentEditable="PLAINTEXT-ONLY"
            onInput={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            placeholder="Join the discussion..."
            suppressContentEditableWarning
          />
        </div>
        {(this.state.selected || this.props.isAReply) && (
          <div className="post-options">
            <div className="post-options-whitespace" />
            {this.props.isAReply && (
              <button className="cancel-post" onClick={this.props.handleCloseReply}>
                CANCEL
              </button>
            )}
            <button className="post-comment-button" onClick={this.handleSubmitComment}>
              POST COMMENT
            </button>
          </div>
        )}
      </div>
    );
  }
}
PostBox.defaultProps = {
  handleCloseReply: () => {}
};
PostBox.propTypes = {
  className: PropTypes.string.isRequired,
  handleCloseReply: PropTypes.func,
  isAReply: PropTypes.bool.isRequired
};

export default connect(({ activeCampaign, auth }) => ({ activeCampaign, auth }), {
  postComment,
  fetchComments
})(PostBox);
