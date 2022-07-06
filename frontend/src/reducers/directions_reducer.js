import {RECEIVE_DIRECTIONS} from '../actions/directions_actions';

const DirectionsReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = {...state};
  switch(action.type) {
    case RECEIVE_DIRECTIONS:
      nextState = {...action.directions};
      return nextState;
    default:
      return state;
  }
}

export default DirectionsReducer;