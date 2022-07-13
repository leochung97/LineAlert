import { combineReducers } from 'redux';
import AlertsReducer from './alert_reducer';
import StationsReducer from './station_reducer';
import DirectionsReducer from './directions_reducer'

const entitiesReducer = combineReducers ({
    alerts: AlertsReducer,
    stations: StationsReducer,
    directions: DirectionsReducer
})

export default entitiesReducer;