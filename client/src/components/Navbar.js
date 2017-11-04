import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Navbar extends Component {
  renderContent() {
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