import { combineReducers } from "redux";
import entitiesReducer from "./entities_reducer";
import errors from "./errors_reducer";
import session from "./session_reducer";

const RootReducer = combineReducers({
  session,
  errors,
  entities: entitiesReducer
});

export default RootReducer;
