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
          for (let i = 0; i < nextState.length; i++){
              let id = action.alert._id;
              if (nextState[i]._id === id) {
                  nextState[i] = action.alert;
              } else {
                nextState.unshift(action.alert)
            }
          }
          return nextState;
      case REMOVE_ALERT:
          for (let i = 0; i < nextState.length; i++){
              let id = action.alert._id;
              if (nextState[i]._id === id) {
                  nextState.splice(i, 1)
              }
          }
          return nextState;
      default:
          return state;
  }
}

export default AlertsReducer;