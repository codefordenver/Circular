import React, { Component } from 'react';

class Comment extends Component {
  renderChildren() {
    const comments = this.props.passedChildren;
    return (
      <div>
        {Object.keys(comments).map(u => (
          <Comment
            key={comments[u]._id}
            userName={comments[u].userName}
            message={comments[u].message}
            dateAdded={comments[u].createdAt}
            passedChildren={comments[u].children}
          />
        ))}
      </div>
    );
  }

  render() {
    return (
      <div
        style={{
          padding: '10px',
          marginBottom: '6px',
          marginTop: '6px',
          border: '2px solid black'
        }}
      >
        <p style={{ fontWeight: 'bold' }}>{this.props.userName}</p>
        <br />
        <p>{this.props.message}</p>
        <br />
        <p style={{ fontSize: '12px' }}>{this.props.dateAdded}</p>
        {this.renderChildren()}
      </div>
    );
  }
}

export default Comment;
