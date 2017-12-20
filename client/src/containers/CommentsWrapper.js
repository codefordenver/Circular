import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentWrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="signature-wrapper">
        <div />
      </div>
    );
  }
}

CommentWrapper.defaultProps = {
  signatures: []
};

// CommentWrapper.propTypes = {
//   signatures: PropTypes.arrayOf(PropTypes.object)
// };

export default CommentWrapper;
