import { INCREMENT_COUNTER, DECREMENT_COUNTER, RESET_COUNTER } from '../actions/count_actions';

let initialState = 0
const CountReducer = ( state = initialState, action ) => {
  Object.freeze(state);
  let nextState = state;
    switch(action.type){
      case INCREMENT_COUNTER:
        nextState += 1
        return nextState;
      case DECREMENT_COUNTER:
        nextState -= 1
        return nextState;
      case RESET_COUNTER:
        nextState = 0
        return nextState;
      default: 
        return initialState;
  }
}

export default CountReducer;