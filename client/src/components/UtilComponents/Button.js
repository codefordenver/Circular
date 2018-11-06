import React from 'react';
import PropTypes from 'prop-types';

function Button({ style, text }) {
  return <button className={style}>{text}</button>;
}

Button.propTypes = {
  style: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default Button;
