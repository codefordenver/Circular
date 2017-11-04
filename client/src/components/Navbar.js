import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import GoogleButton from 'react-google-button';

class Navbar extends Component {
  renderContent() {
    if (this.props.auth.data === undefined) {
      return;
    }

    if (!this.props.auth.data.googleID) {
      return (
        <a className="google-oauth-button" href="/auth/google">
          <GoogleButton />
        </a>
      );
    }
    return (
      <a className="google-oauth-button" href="/api/logout">
        <GoogleButton label="Sign Out" />
      </a>
    );
  }
  render() {
    return (
      <nav className="navbar">
        <div className="container">
          <div className="row">
            <div className="col-md-9 navbar-header">
              <p>
                <Link className="home-link" to="/">
                  Recycling Request Tool
                </Link>
              </p>
            </div>
            {this.renderContent()}
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Navbar);
