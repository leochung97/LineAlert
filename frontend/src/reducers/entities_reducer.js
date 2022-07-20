import { combineReducers } from 'redux';
import AlertsReducer from './alert_reducer';
import StationsReducer from './station_reducer';
import DirectionsReducer from './directions_reducer'
import CountReducer from './count_reducer'

const entitiesReducer = combineReducers ({
    alerts: AlertsReducer,
    stations: StationsReducer,
    directions: DirectionsReducer,
    count: CountReducer
})

export default entitiesReducer;