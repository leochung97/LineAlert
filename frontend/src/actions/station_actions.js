import * as StationApiUtil from '../util/station_api_util';

export const RECEIVE_STATION = 'RECEIVE_STATION';

const receiveStation = station => {
    return {
        type: RECEIVE_STATION,
        station
    }
}

export const fetchStation = station => dispatch => {
    return (
        StationApiUtil.fetchStation(station)
            .then(res => dispatch(receiveStation(res)))
    )
}