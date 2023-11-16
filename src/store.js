import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { appReducer } from './reducers';

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__ || compose;

const reducer = combineReducers({
  app: appReducer,
});

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk)),
);
