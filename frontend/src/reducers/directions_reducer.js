import {RECEIVE_DIRECTIONS, CLEAR_DIRECTIONS} from '../actions/directions_actions';

const initialState = {};
const DirectionsReducer = (state = initialState, action) => {
  Object.freeze(state);
  let nextState = {...state};
  switch(action.type) {
    case RECEIVE_DIRECTIONS:
      nextState = {...action.directions};
      return nextState;
    case CLEAR_DIRECTIONS:
      nextState = {}
      return nextState;
    default:
      return state;
  }
}

export default DirectionsReducer;