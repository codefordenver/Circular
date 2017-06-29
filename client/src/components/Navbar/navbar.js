import React, { Component } from 'react';

const styles = require('./NavBar.scss');

class NavBar extends Component {

  render() {
    return (
      <nav className='top_nav'>
      <div className="row">

      <div className="col-md-9 navbar-header">
      <p>
      <a className="home-link" href="/">DENVER: RE<span className="non-bold">IMAGINE</span></a>
      </p>
      </div>

      <div className="col-md-3">
      <ul className="top-nav-list">

  <li>sign in with google</li>
    <li>sign in with facebook</li>
    </ul>
    </div>
    </div>
    </nav>

  );
  }
}

export default NavBar;
