import axios from 'axios';

export const fetchStation = stationId => {
  return axios.get(`/api/stations/${stationId}`)
    .then(res => {
      return res.data;
    })
}

export const fetchStations = () => {
  return axios.get("api/stations/").then(res => res.data)
}