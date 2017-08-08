import React, { PropTypes } from 'react';
import NavBar from '../components/Navbar';

const App = ({ children }) => (
  <div className="app-container">
    <NavBar />
    { children }
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
