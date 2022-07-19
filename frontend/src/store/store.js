import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import logger from "redux-logger";
import rootReducer from "../reducers/root_reducer";

const configureStore = (preloadedState = {}) => {
  return createStore(
    rootReducer,
    preloadedState,
    // Add back logger into applyMiddle if required
    applyMiddleware(thunk)
  );
};

export default configureStore;
