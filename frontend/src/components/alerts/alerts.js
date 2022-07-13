import React, {useState, useEffect} from 'react';
import { connect, useSelector } from 'react-redux';
import Alert from './alert';
import { deleteAlert, fetchAlerts } from '../../actions/alert_actions';
import { fetchStation } from '../../actions/station_actions';
import '../../assets/stylesheets/alerts.scss'

const Alerts = ({fetchAlerts, fetchStation, stations, deleteAlert, currentUser, isAuthenticated}) => {
  const alerts = useSelector(state => state.entities.alerts, (a, b) => JSON.stringify(a) === JSON.stringify(b));

  useEffect(() => {
    fetchAlerts()
  }, []);

  return (
    <>
      {Object.values(alerts).map((alert, i) => (
        <div className='alert-item' key={i}>
          <Alert
            alert={alert}
            fetchStation={fetchStation}
            stations={stations}
            deleteAlert={deleteAlert}
            currentUser={currentUser}
            isAuthenticated={isAuthenticated}
          />
        </div>
      ))}
    </>
  )
}

const mapStateToProps = state => {
  return {
    stations: state.entities.stations,
    currentUser: state.session.user.id,
    isAuthenticated: state.session.isAuthenticated
  }
}

const mapDisptachToProps = dispatch => {
  return {
    fetchAlerts: () => dispatch(fetchAlerts()),
    fetchStation: stationId => dispatch(fetchStation(stationId)),
    deleteAlert: alertId => dispatch(deleteAlert(alertId)),
  }
}

export default connect(mapStateToProps, mapDisptachToProps)(Alerts);