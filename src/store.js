import reducers from 'reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'

const middlewares = [thunk]

export const store = compose(applyMiddleware(...middlewares))(createStore)(reducers)
