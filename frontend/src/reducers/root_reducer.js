import { combineReducers } from "redux";
import errorsReducer from "./errors_reducer";
import session from "./session_reducer";

const RootReducer = combineReducers({
  session,
  errors: errorsReducer,
});

export default RootReducer;
