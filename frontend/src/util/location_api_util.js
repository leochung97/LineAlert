import axios from 'axios';

export const fetchLocation = locationId => {
    return axios.get(`api/location/${locationId}`)
    .then(res => {
        return res.data;
    })
}