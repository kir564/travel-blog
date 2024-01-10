import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import {
  appReducer,
  commentsReducer,
  userReducer,
  hotelsReducer,
} from './reducers';

const reducer = combineReducers({
  app: appReducer,
  user: userReducer,
  comments: commentsReducer,
  hotelsData: hotelsReducer,
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
export const store = createStore(reducer, enhancer);
