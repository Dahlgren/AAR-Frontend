import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Mission from './Mission'
import MissionsList from './MissionsList'
import World from './World'
import WorldsList from './WorldsList'

export default class Router extends Component {
  render () {
    return <Switch>
      <Route exact path='/missions' component={MissionsList} />
      <Route exact path='/missions/:id' component={Mission} />
      <Route exact path='/worlds' component={WorldsList} />
      <Route exact path='/worlds/:id' component={World} />
      <Redirect path='*' to='/missions' />
    </Switch>
  }
}
