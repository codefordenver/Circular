import React from 'react';
import PropTypes from 'prop-types';

const ModalWrapper = ({ children, title }) => (
  <div className="circular-modal-wrapper">
    <div className="circular-modal">
      <div className="circular-modal-header">{title}</div>
      <div className="circular-modal-content">{children}</div>
    </div>
  </div>
);

ModalWrapper.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
};

ModalWrapper.defaultProps = {
  children: '',
  title: ''
};

export default ModalWrapper;
