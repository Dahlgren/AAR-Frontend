import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers'

const loggerMiddleware = createLogger()

export default function configureStore(initialState) {
  let middleware = [
    thunkMiddleware,
  ]

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(loggerMiddleware);
  }

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      ...middleware
    )
  )
}
