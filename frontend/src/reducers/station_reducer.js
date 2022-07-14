import { RECEIVE_STATION, RECEIVE_STATIONS } from "../actions/station_actions";

const StationsReducer = (state = [], action) => {
  Object.freeze(state);
  let nextState = [...state];
  switch(action.type) {
    case RECEIVE_STATIONS:
      nextState = [...action.stations];
      return nextState;
    case RECEIVE_STATION:
      nextState.push(action.station);
      return nextState;
    default:
      return state;
  }
}

export default StationsReducer;