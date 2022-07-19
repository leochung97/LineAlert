import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import Alert from './alert';
import { deleteAlert, fetchAlerts } from '../../actions/alert_actions';
import { fetchStation } from '../../actions/station_actions';
import '../../assets/stylesheets/alerts.scss'

const Alerts = (props) => {
  const alerts = useSelector(state => state.entities.alerts, (a, b) => JSON.stringify(a) === JSON.stringify(b));
  
  useEffect(() => {
    props.fetchAlerts()
  }, []);

  return (
    <>
      {Object.values(alerts).map((alert, i) => (
        <div className='alert-item' key={i}>
          <Alert alert={alert} {...props} />
        </div>
      ))}
    </>
  )
}

const mSTP = state => {
  return {
    stations: state.entities.stations,
    currentUser: state.session.user.id,
    isAuthenticated: state.session.isAuthenticated
  }
}

const mDTP = dispatch => {
  return {
    fetchAlerts: () => dispatch(fetchAlerts()),
    fetchStation: stationId => dispatch(fetchStation(stationId)),
    deleteAlert: alertId => dispatch(deleteAlert(alertId)),
  }
}

export default connect(mSTP, mDTP)(Alerts);