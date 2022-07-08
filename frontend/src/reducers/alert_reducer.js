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
          nextState.unshift(action.alert);
          return nextState;
      case REMOVE_ALERT:
          // Check this function in Alerts Reducer
          console.log("First one")
          console.log(nextState);
          nextState.filter(alert => { 
            console.log("alerts within nextState")
            console.log(alert)
            console.log("action.alerts")
            console.log(action.alert)
            return alert._id !== action.alert._id
          })
          console.log("Second one")
          console.log(nextState);
          return nextState;
      case CLEAR_ALERTS:
          return [];
      default:
          return state;
  }
}

export default AlertsReducer;