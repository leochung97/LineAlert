import { 
    RECEIVE_ALERTS, 
    RECEIVE_ALERT, 
    REMOVE_ALERT,
    CLEAR_ALERTS
} from '../actions/alert_actions';

const AlertsReducer = (state = [], action) => {
  Object.freeze(state);
  let nextState = [...state];
  switch(action.type) {
    case RECEIVE_ALERTS:
      nextState = [...action.alerts];
      return nextState;
    case RECEIVE_ALERT:
      nextState.push(action.alert);
      return nextState;
    case REMOVE_ALERT:
      delete nextState[action.alert];
      return nextState;
    case CLEAR_ALERTS:
      return [];
    default:
      return state;
  }
}

export default AlertsReducer;