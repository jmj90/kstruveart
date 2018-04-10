import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import category from './category'
import products from './products'
import artist from './artist'

const reducer = combineReducers({user, artist, category, products})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
export const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './artist'
export * from './products'
export * from './category'
