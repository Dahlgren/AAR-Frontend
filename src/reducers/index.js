import { combineReducers } from 'redux';

import { events } from './events';
import { missions } from './missions';

const rootReducer = combineReducers({
  events,
  missions,
});

export default rootReducer;
