import * as StationApiUtil from '../util/station_api_util';

export const RECEIVE_STATION = 'RECEIVE_STATION';
export const RECEIVE_STATIONS = "RECEIVE_STATIONS"
const receiveStations = stations => {
  return { 
    type: RECEIVE_STATIONS,
    stations
  }
}
const receiveStation = station => {
  return {
    type: RECEIVE_STATION,
    station
  }
}
export const fetchStation = stationId => async dispatch => {
  try {
    let res = await StationApiUtil.fetchStation(stationId)
    dispatch(receiveStation(res))
    return res
  } catch (err) {
    console.log(err)
  }
}

export const fetchStations = () => async dispatch => {
  try {
    let res = await StationApiUtil.fetchStations()
    dispatch(receiveStations(res))
    return res
  } catch (err) {
    console.log(err)
  }
}