import { 
    RECEIVE_ALERTS, 
    RECEIVE_ALERT, 
    REMOVE_ALERT
} from '../actions/alert_actions';

const initialState = {
  
}

const AlertsReducer = (state = initialState, action) => {
  Object.freeze(state);
  let nextState = {...state};
  switch(action.type) {
    case RECEIVE_ALERTS:
      nextState = {...action.alerts};
      return nextState;
    case RECEIVE_ALERT:
      nextState[action.alert.id] = action.alert;
      return nextState;
    case REMOVE_ALERT:
      delete nextState[action.alert];
      return nextState;
    default:
    return state;
    }
}

export default AlertsReducer;