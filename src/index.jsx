import 'leaflet_css';
import './leaflet/index';
import './css/markers.css';
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-leaflet-fullscreen/dist/styles.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, IndexRedirect, Link, browserHistory } from 'react-router';
import { Provider } from 'react-redux'
import App from './containers/App';
import Mission from './containers/Mission';
import MissionsList from './containers/MissionsList';
import World from './containers/World';
import WorldsList from './containers/WorldsList';
import configureStore from './configureStore'

let store = configureStore();

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="missions"/>
        <Route path="missions" component={MissionsList}/>
        <Route path="missions/:id" component={Mission}/>
        <Route path="worlds" component={WorldsList}/>
        <Route path="worlds/:id" component={World}/>
        <Redirect from="*" to="missions" />
      </Route>
    </Router>
  </Provider>
), document.getElementById('content'))
