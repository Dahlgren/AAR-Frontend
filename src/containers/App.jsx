import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

import { fetchWorldsIfNeeded } from '../actions/worlds'
import Router from './Router'

let router

class App extends Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchWorldsIfNeeded())
  }

  render () {
    const { worlds, worldsByName } = this.props

    let children = <Container>Loading worlds</Container>

    if (worlds && worldsByName) {
      if (!router) {
        router = <Router />
      }
      children = router
    }

    return (
      <div id='app'>
        <div id='navigation'>
          <Navbar bg="light" fixed="top">
            <Container>
              <Navbar.Brand>
                <Link to='/'>AAR</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse>
                <Nav>
                  <LinkContainer to='/missions'>
                    <Nav.Link eventKey={1}>Missions</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/worlds'>
                    <Nav.Link eventKey={2}>Worlds</Nav.Link>
                  </LinkContainer>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        {children}
      </div>
    )
  }
};

App.propTypes = {
  worlds: PropTypes.array,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  const {
    worlds,
    worldsByName
  } = state.worlds || {
    worlds: [],
    worldsByName: null
  }

  return {
    worlds,
    worldsByName
  }
}

export default withRouter(connect(mapStateToProps)(App))
