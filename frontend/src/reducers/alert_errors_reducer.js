import { 
    RECEIVE_ALERT_ERRORS
} from '../actions/alert_actions';

const initialState = [];

const AlertErrorsReducer = (state = initialState, action) => {
    Object.freeze(state);
    let nextState = {...state};
    switch(action.type) {
        case RECEIVE_ALERT_ERRORS:
            nextState = {...action.errors};
            return nextState;
        default:
            return state;
    }
}

export default AlertErrorsReducer;