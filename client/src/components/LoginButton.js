import React, { Component } from 'react';
import SocialLogin from 'react-social-login';
import PropTypes from 'prop-types';
// This component must be a Class because it functions via a 'ref',
// which doesn't work on stateless/pure functional components.
/* eslint-disable react/prefer-stateless-function */

class LoginButton extends Component {
  render() {
    const { triggerLogin, disabled, children } = this.props;
    return (
      <button onClick={triggerLogin} disabled={disabled}>
        {children}
      </button>
    );
  }
}

LoginButton.defaultProps = {
  disabled: false
};

LoginButton.propTypes = {
  triggerLogin: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default SocialLogin(LoginButton);
