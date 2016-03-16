import 'leaflet_css';
import './leaflet/index';
import './css/markers.css';
import './css/style.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Provider } from 'react-redux'
import App from './containers/App';
import Mission from './containers/Mission';
import MissionsList from './containers/MissionsList';
import configureStore from './configureStore'

let store = configureStore();

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="missions" component={MissionsList} />
        <Route path="missions/:id" component={Mission}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('content'))
