import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <div id="navigation">
          <h1>AAR</h1>
          <ul>
            <li><Link to="/missions">Missions</Link></li>
          </ul>
        </div>
        {this.props.children}
      </div>
    )
  }
};
