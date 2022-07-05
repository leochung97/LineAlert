import { combineReducers } from 'redux';
import AlertsReducer from './alert_reducer';
import StationsReducer from './station_reducer';

const entitiesReducer = combineReducers ({
    alerts: AlertsReducer,
    stations: StationsReducer
})

export default entitiesReducer;