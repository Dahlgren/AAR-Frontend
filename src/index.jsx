import 'leaflet_css'
import './leaflet/index'
import './css/markers.css'
import './css/slider.css'
import './css/style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-slider/dist/css/bootstrap-slider.css'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import Mission from './containers/Mission'
import MissionsList from './containers/MissionsList'
import World from './containers/World'
import WorldsList from './containers/WorldsList'
import configureStore from './configureStore'

let store = configureStore()

render((
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path='/missions' component={MissionsList} />
          <Route exact path='/missions/:id' component={Mission} />
          <Route exact path='/worlds' component={WorldsList} />
          <Route exact path='/worlds/:id' component={World} />
          <Redirect path='*' to='/missions' />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>
), document.getElementById('content'))
