import React, { useEffect, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import Alert from './alert';
import { deleteAlert, fetchAlerts } from '../../actions/alert_actions';
import { fetchStation } from '../../actions/station_actions';
import '../../assets/stylesheets/alerts.scss'

const Alerts = (props) => {
  const alerts = useSelector(state => state.entities.alerts, (a, b) => JSON.stringify(a) === JSON.stringify(b));

  const filteredArrRef = useRef([])
  useEffect(() => {
    props.fetchAlerts()
    // console.log(props.preferences)
    // for (const [key, value] of Object.entries(props.preferences[0])) { 
    //   if (value) {
    //     filteredArrRef.current.push(key)
    //   }
    // }
  }, []);

  const checkIntersection = (arr1, arr2) => {
    return arr1.filter(value => arr2.includes(value));
  }

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
    preferences: state.session.user ? state.session.user.preferences : [{}],
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