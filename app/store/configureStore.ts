import { applyMiddleware, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";

import { createLogger } from "redux-logger";
import reducers from "../reducers";
import thunk from "redux-thunk";
var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

import storageProvider from "./platformStorageProvider";
const OUTPUT_LOG_MESSAGES = false;
var logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome && OUTPUT_LOG_MESSAGES,
  collapsed: true,
  duration: true,
  level: "info"
});

const persistConfig = {
  key: "root",
  storage: storageProvider,
  blacklist: ["ui"]
};

const persistedReducer = persistReducer(persistConfig, reducers);
var createAppStore = applyMiddleware(thunk, logger)(createStore);

const configureStore = (onComplete: () => void) => {
  const store = createAppStore(persistedReducer);
  persistStore(store, null, onComplete);

  return store;
};

export default configureStore;
