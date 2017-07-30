import React, { PropTypes } from 'react';
import NavBar from '../components/Navbar';

const App = ({ children }) => (
  <div className="app-container">
    <NavBar />
    { children }
  </div>
);

App.PropTypes = {
  children: PropTypes.object
};

export default App;
