import axios from 'axios';

export const fetchDirections = directions => {
    console.log(directions)
     return axios.post('/api/directions', {data: directions})
}