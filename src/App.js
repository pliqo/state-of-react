import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Pliqo</h1>
          <h2>Welcome to State of React.</h2>
        </header>
        <nav className="App-nav"><ul><li><a href="#">The list</a></li><li><a href="#">Submit</a></li></ul></nav>
        <p className="App-intro">
          A ReactJS reviewer on frameworks, utils, tests & everything related!
        </p>
      </div>
    );
  }
}

export default App;
