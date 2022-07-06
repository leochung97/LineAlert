import axios from 'axios';

export const fetchAlert = alertId => {
    return axios.get(`/api/alerts/${alertId}`)
        .then(res => {
            return res.data;
        });
}

export const fetchAlerts = () => {
    return axios.get('/api/alerts')
    .then(res => {
        console.log(res);
        return res.data;
    });
}

export const createAlert = alert => {
    return axios.post('api/alerts', alert)
    .then(res => {
        return res.data;
    });
}

export const updateAlert = alert => {
    return axios.patch(`api/alerts/${alert.id}`, alert)
    .then(res => {
        return res.data;
    });
}

export const deleteAlert = alertId => {
    return axios.delete(`api/alerts/${alertId}`)
    .then(res => {
        return res.data;
    });
}