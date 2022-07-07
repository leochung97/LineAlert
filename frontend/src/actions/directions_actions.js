import * as DirectionsApiUtil from '../util/directions_api_util';

export const RECEIVE_DIRECTIONS = 'RECEIVE_DIRECTIONS';
export const RECEIVE_DIRECTIONS_ERRORS = "RECEIVE_DIRECTIONS_ERRORS"
const receiveDirections = directions => {
  return {
    type: RECEIVE_DIRECTIONS,
    directions
  }
}
const receiveDirectionsErrors = errors => {
  return {
    type: RECEIVE_DIRECTIONS_ERRORS,
    errors
  }
}
export const fetchDirections = params => dispatch => {
  return (
    DirectionsApiUtil.fetchDirections(params)
      .then(directions => dispatch(receiveDirections(directions.data)))
      .catch(err => {
        dispatch(receiveDirectionsErrors(err.response.data));
    })
  )
}