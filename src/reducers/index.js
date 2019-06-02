import { combineReducers } from 'redux'

import { events } from './events'
import { missions } from './missions'
import { worlds } from './worlds'

const rootReducer = combineReducers({
  events,
  missions,
  worlds
})

export default rootReducer
