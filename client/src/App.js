import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Fib from './Fib';
import OtherPage from './OtherPage';

import './App.css';
import logo from './logo.svg';

export default function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>

          <Link className='App-link' to='/'>Home</Link>
          <Link className='App-link' to='/otherpage'>Other Page</Link>
        </header>

        <Route exact path='/' component={Fib} />
        <Route path='/otherpage' component={OtherPage} />
      </div>
    </Router>
  );
}
