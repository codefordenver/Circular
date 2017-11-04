import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import fetchUser from '../redux/actions/authorization';
import NavBar from '../components/Navbar';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="app-container">
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default connect(null, { fetchUser })(App);
