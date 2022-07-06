import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Alert from './alert';
import { fetchAlerts } from '../../actions/alert_actions';
import { fetchStation } from '../../actions/station_actions';
import '../../assets/stylesheets/alerts.scss'

const Alerts = ({fetchAlerts, alerts, fetchStation, currentStation}) => {
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
        return <div className='alert-item' key={alert._id}><Alert alert={alert} fetchStation={fetchStation} currentStation={currentStation}/></div>
      })
    )
  }
  
  return (
    <div>
      {component}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    alerts: state.entities.alerts,
    currentStation: state.entities.stations
  }
}

const mapDisptachToProps = dispatch => {
  return {
    fetchAlerts: () => dispatch(fetchAlerts()),
    fetchStation: stationId => dispatch(fetchStation(stationId))
  }
}

export default connect(mapStateToProps, mapDisptachToProps)(Alerts);

