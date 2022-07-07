import RECEIVE_DIRECTIONS_ERRORS from '../actions/directions_actions'

const initialState = [];

const DirectionsErrorsReducer = (state = initialState, action) => {
    Object.freeze(state);
    let nextState = {...state};
    switch(action.type) {
        case RECEIVE_DIRECTIONS_ERRORS:
            nextState = {...action.errors};
            return nextState;
        default:
            return state;
    }
}

export default DirectionsErrorsReducer;