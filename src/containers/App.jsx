import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Grid, Nav, Navbar, NavItem } from 'react-bootstrap'
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

    let children = <Grid>Loading worlds</Grid>

    if (worlds && worldsByName) {
      if (!router) {
        router = <Router />
      }
      children = router
    }

    return (
      <div id='app'>
        <div id='navigation'>
          <Navbar staticTop>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to='/'>AAR</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <LinkContainer to='/missions'>
                  <NavItem eventKey={1}>Missions</NavItem>
                </LinkContainer>
                <LinkContainer to='/worlds'>
                  <NavItem eventKey={2}>Worlds</NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
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
