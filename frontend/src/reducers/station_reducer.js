import { RECEIVE_STATION } from "../actions/station_actions";

const initialState = {

}

const StationsReducer = (state = initialState, action) => {
    Object.freeze(state);
    let nextState = {...state};
    switch(action.type) {
        case RECEIVE_STATION:
            nextState[action.station._id] = action.station;
            return nextState;
        default:
            return state;
    }
}

export default StationsReducer;