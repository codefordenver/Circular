import React from 'react';
import { Link } from 'react-router';
import { OAuthSignInButton, SignOutButton } from "redux-auth/default-theme";
import { ButtonGroup } from "react-bootstrap";

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const NavBar = () => (
  <nav className="navbar">
    <div className="container">
      <div className="row">
        <div className="col-md-9 navbar-header">
          <p>
            <Link className="home-link" to="/">Recycling Request Tool</Link>
          </p>
        </div>

        <div className="col-md-3">
          <ul className="top-nav-list">
            <ButtonGroup>
              <OAuthSignInButton provider="google">Google</OAuthSignInButton>
              <OAuthSignInButton provider="facebook">Facebook</OAuthSignInButton>
              <SignOutButton>Sign Out</SignOutButton>
            </ButtonGroup>
          </ul>
        </div>
      </div>
    </div>
  </nav>
);

export default NavBar;
