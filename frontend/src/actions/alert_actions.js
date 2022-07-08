import * as AlertApiUtil from '../util/alert_api_util';

export const RECEIVE_ALERTS = 'RECEIVE_ALERTS';
export const RECEIVE_ALERT = 'RECEIVE_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const CLEAR_ALERTS = 'CLEAR_ALERTS';
export const RECEIVE_ALERT_ERRORS = 'RECEIVE_ALERT_ERRORS';

const receiveAlerts = alerts => {
  return {
    type: RECEIVE_ALERTS,
    alerts
  }
}

const receiveAlert = alert => {
  return {
    type: RECEIVE_ALERT,
    alert
  }
}

const removeAlert = alert => {
  return {
    type: REMOVE_ALERT,
    alert
  }
}

const receiveAlertErrors = errors => {
  return {
    type: RECEIVE_ALERT_ERRORS,
    errors
  }
}

export const clearAlerts = () => ({
  type: CLEAR_ALERTS
})

export const fetchAlerts = () => dispatch => {
  return (
    AlertApiUtil.fetchAlerts()
      .then(res => {
        dispatch(receiveAlerts(res))
        return res
      })
      .catch(err => {
        dispatch(receiveAlertErrors(err.response.data));
    })
  )
}

export const fetchAlert = alertId => dispatch => {
  return (
    AlertApiUtil.fetchAlert(alertId)
      .then(res => dispatch(receiveAlert(res)))
      .catch(err => {
        dispatch(receiveAlertErrors(err.response.data));
    })
  )
}

export const createAlert = alert => dispatch => {
  return (
    AlertApiUtil.createAlert(alert)
      .then(res => {
        dispatch(receiveAlert(res));
        return res;
      })
      .catch(err => {
        dispatch(receiveAlertErrors(err.response.data));
    })
  )
}

export const updateAlert = alert => dispatch => {
  return (
    AlertApiUtil.updateAlert(alert)
      .then(res => dispatch(receiveAlert(res)))
      .catch(err => {
        dispatch(receiveAlertErrors(err.response.data));
    })
  )
}

export const deleteAlert = alertId => dispatch => {
  return (
    AlertApiUtil.deleteAlert(alertId)
      .then(res => dispatch(removeAlert(res)))
      .catch(err => {
        dispatch(receiveAlertErrors(err.response.data));
    })
  )
}
