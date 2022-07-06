import * as DirectionsApiUtil from '../util/directions_api_util';

export const RECEIVE_DIRECTIONS = 'RECEIVE_DIRECTIONS';

const receiveDirections = directions => {
    return {
        type: RECEIVE_DIRECTIONS,
        directions
    }
}

export const fetchDirections = directions => dispatch => {
    return (
        DirectionsApiUtil.fetchDirections()
            .then(res => dispatch(receiveDirections(res)))
                // .catch(err => {
                //     dispatch(receiveDirectionsErrors(err.response.data))
                // })
    )
}