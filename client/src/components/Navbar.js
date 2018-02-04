import React from 'react';
import { Link } from 'react-router';

const Navbar = () => (
  <nav className="navbar">
    <div className="container">
      <div className="row">
        <div className="col-md-9 navbar-header">
          <Link className="home-link" to="/">
            <h1>Recycling Request Tool</h1>
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
