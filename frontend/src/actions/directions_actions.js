import * as DirectionsApiUtil from "../util/directions_api_util";

export const RECEIVE_DIRECTIONS = "RECEIVE_DIRECTIONS";
export const RECEIVE_DIRECTIONS_ERRORS = "RECEIVE_DIRECTIONS_ERRORS";
export const CLEAR_DIRECTIONS = "CLEAR_DIRECTIONS";

const receiveDirections = (directions) => {
  return {
    type: RECEIVE_DIRECTIONS,
    directions,
  };
};
const receiveDirectionsErrors = (errors) => {
  return {
    type: RECEIVE_DIRECTIONS_ERRORS,
    errors,
  };
};

export const clearDirections = () => {
  return {
    type: CLEAR_DIRECTIONS,
  };
};

export const fetchDirections = (params) => async (dispatch) => {
  try {
    let res = await DirectionsApiUtil.fetchDirections(params);
    dispatch(receiveDirections(res.data));
  } catch (err) {
    dispatch(receiveDirectionsErrors(err.response.data));
  }
};
