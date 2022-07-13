import { 
    RECEIVE_ALERTS, 
    RECEIVE_ALERT, 
    REMOVE_ALERT,
    CLEAR_ALERTS
} from '../actions/alert_actions';

const AlertsReducer = (state = [], action) => {
  let nextState = [...state];
  switch(action.type) {
      case RECEIVE_ALERTS:
          nextState = [...action.alerts];
          return nextState;
      case RECEIVE_ALERT:
        if (nextState.length > 0) { //if we already have alerts
            for (let i = 0; i < nextState.length; i++) {
                if (nextState[i]._id === action.alert._id) { // for the edit
                    nextState[i] = action.alert; //replaces alert at i
                    return nextState;
                } else { //for the create
                    nextState.unshift(action.alert)
                    return nextState;
                }
            }
        } else { //just create
            nextState[nextState.length] = action.alert;
            return nextState;
        }
        break
      case REMOVE_ALERT:
        if (nextState.length > 0) { //if we already have alerts
            for (let i = 0; i < nextState.length; i++) {
                if (nextState[i]._id === action.alert._id) {
                    nextState.splice(i, 1) //removes alert at i
                    return nextState;
                }
            }
        } else { //if we have no alerts, nothing to delete
            return nextState;
        }
        break;
      case CLEAR_ALERTS:
          return [];
      default:
          return state;
  }
}

export default AlertsReducer;