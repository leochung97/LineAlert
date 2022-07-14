import * as StationApiUtil from '../util/station_api_util';

export const RECEIVE_STATION = 'RECEIVE_STATION';

const receiveStation = station => {
  return {
    type: RECEIVE_STATION,
    station
  }
}

// export const fetchStation = stationId => dispatch => {
//   return (
//     StationApiUtil.fetchStation(stationId)
//       .then(res => dispatch(receiveStation(res)))
//   )
// }

export const fetchStation = stationId => async dispatch => {
  try {
    let res = await StationApiUtil.fetchStation(stationId)
    dispatch(receiveStation(res))
    return res
  } catch (err) {
    console.log(err)
  }
}