import React, { Component } from 'react';
import Question from './components/Question';
import logo from './logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="container pt-4">
          <h1>
            Santa Clara County Reembrace Tool
          </h1>
          <p>
            This tool is intended for use by authorized nonprofit, agency, and Santa Clara County officials to improve access to social services for returning citizens.
          </p>
          <hr/>
          <h2>
            Content
          </h2>
          <Question />
        </div>
      </div>
    );
  }
}

export default App;
