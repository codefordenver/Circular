import React, { Component } from 'react';


class NavBar extends Component {

  render() {
    return (
      <nav className='top_nav'>
      <div className="row">

      <div className="col-md-9 navbar-header">
      <p>
      <a className="home-link" href="/">Recycling Request Tool</a>
      </p>
      </div>

      <div className="col-md-3">
      <ul className="top-nav-list">

{/*  <li>sign in with google</li>
    <li>sign in with facebook</li>*/}
    </ul>
    </div>
    </div>
    </nav>

  );
  }
}

export default NavBar;
