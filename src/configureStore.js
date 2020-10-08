import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from "redux-thunk";
import { loadingBarMiddleware } from "react-redux-loading-bar";

import createRootReducer from './reducers'
import logger from "redux-logger";

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(),
    compose(
      applyMiddleware(
        thunkMiddleware,
        loadingBarMiddleware(),
        logger
      )
    )
  );

  return store
}
