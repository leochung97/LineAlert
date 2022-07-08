import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Alert from './alert';
import { deleteAlert, fetchAlerts, clearAlerts } from '../../actions/alert_actions';
import { fetchStation } from '../../actions/station_actions';
import '../../assets/stylesheets/alerts.scss'

const Alerts = ({fetchAlerts, alerts, fetchStation, stations, deleteAlert, currentUser, isAuthenticated}) => {

  const [instateAlerts, setstateAlerts] = useState(alerts)
  
  
  useEffect(() => {
    fetchAlerts()
      .then((data) => setstateAlerts(data))
  }, [])

  let component;

  if (!instateAlerts || !instateAlerts.length) {
    component = <></>
  } else {
    component = (
      Object.values(instateAlerts).map(alert => (
        <div className='alert-item' key={alert._id}>
          <Alert 
            alert={alert}
            fetchStation={fetchStation}
            stations={stations}
            deleteAlert={deleteAlert}
            clearAlerts={clearAlerts}
            currentUser={currentUser}
            isAuthenticated={isAuthenticated}
          />
        </div>
      ))
    )
  }
  
  return (
    <>
      {component}
    </>
  )
}

const mSTP = state => {
  return {
    alerts: state.entities.alerts,
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
    clearAlerts: () => dispatch(clearAlerts())
  }
}

export default connect(mSTP, mDTP)(Alerts);