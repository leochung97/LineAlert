import axios from 'axios';

export const fetchDirections = directions => {
    return axios.get('/api/directions', directions)
}