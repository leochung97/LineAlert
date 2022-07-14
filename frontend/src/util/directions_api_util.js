import axios from 'axios';

export const fetchDirections = directions => {
     return axios.post('/api/directions', directions)
}