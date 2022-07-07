import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Alert from './alert';
import { deleteAlert, fetchAlerts } from '../../actions/alert_actions';
import { fetchStation } from '../../actions/station_actions';
import '../../assets/stylesheets/alerts.scss'

const Alerts = ({fetchAlerts, alerts, fetchStation, stations, deleteAlert, currentUser, isAuthenticated}) => {
  const [isloaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchAlerts()
      .then(() => setLoaded(true))
  }, [fetchAlerts])

  let component;

  if (!isloaded) {
    component = <></>
  } else {
    component = (
      Object.values(alerts).map(alert => {
        return <div className='alert-item' key={alert._id}>
          <Alert 
            alert={alert} 
            fetchStation={fetchStation} 
            stations={stations} 
            deleteAlert={deleteAlert}
            currentUser={currentUser}
            isAuthenticated={isAuthenticated}
          />
        </div>
      })
    )
  }
  
  return (
    <>
      {component}
    </>
  )
}

const mapStateToProps = state => {
  return {
    alerts: state.entities.alerts,
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