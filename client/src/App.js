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
        <p>
          Welcome to Santa Clara County's Reembrace tool!
        </p>
        <Question />
      </div>
    );
  }
}

export default App;
