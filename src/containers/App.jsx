import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

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
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <LinkContainer to="/missions">
                  <NavItem eventKey={1}>Missions</NavItem>
                </LinkContainer>
                <LinkContainer to="/worlds">
                  <NavItem eventKey={2}>Worlds</NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        {this.props.children}
      </div>
    )
  }
};
