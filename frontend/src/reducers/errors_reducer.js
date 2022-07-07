import { combineReducers } from "redux";

import AlertErrorsReducer from "./alert_errors_reducer";
import SessionErrorsReducer from "./session_errors_reducer";

export default combineReducers({
  session: SessionErrorsReducer,
  alert: AlertErrorsReducer
});
