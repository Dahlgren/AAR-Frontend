import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <div id="navigation">
          <Navbar staticTop={true}>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">AAR</Link>
              </Navbar.Brand>
            </Navbar.Header>
          </Navbar>
        </div>
        {this.props.children}
      </div>
    )
  }
};
