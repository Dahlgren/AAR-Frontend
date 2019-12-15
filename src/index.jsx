import 'leaflet/dist/leaflet.css'
import './leaflet/index'
import './css/markers.css'
import './css/slider.css'
import './css/style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-slider/dist/css/bootstrap-slider.css'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './configureStore'

const store = configureStore()

render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('content'))
