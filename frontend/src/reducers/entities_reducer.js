import combineReducers from 'react-redux';
import AlertsReducer from './alert_reducer';

const entitiesReducer = combineReducers ({
    alerts: AlertsReducer
})

export default entitiesReducer;