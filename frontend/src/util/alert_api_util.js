import axios from 'axios';

export const fetchAlert = alertId => {
    return axios.get(`/api/alerts/${alertId}`);
}

export const fetchAlerts = () => {
    return axios.get('/api/alerts');
}

export const createAlert = alert => {
    return axios.post('api/alerts/new', alert)
}

export const updateAlert = alert => {
    return axios.patch(`api/alerts/${alert.id}`, alert)
}

export const deleteAlert = alertId => {
    return axios.delete(`api/alerts/${alertId}`)
}