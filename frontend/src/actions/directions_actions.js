import * as DirectionsApiUtil from '../util/directions_api_util';

export const RECEIVE_DIRECTIONS = 'RECEIVE_DIRECTIONS';

const receiveDirections = directions => {
  return {
    type: RECEIVE_DIRECTIONS,
    directions
  }
}

export const fetchDirections = params => dispatch => {
  return (
    DirectionsApiUtil.fetchDirections(params)
      .then(directions => dispatch(receiveDirections(directions.data)))
      // .catch(err => {
      //   console.log(err);
      // })
  )
}