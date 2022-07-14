import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import '../../assets/stylesheets/alert_modal.scss'
import { deleteAlert, fetchAlerts } from '../../actions/alert_actions';
import { fetchStation } from '../../actions/station_actions';

const AlertModal = ({ alert, open, onClose, fetchStation, stations, deleteAlert }) => {
  useEffect(() => {
    if (alert) {
      fetchStation(alert.station)    
    }
  }, [alert])
  
  let currentStation = {}
  stations.forEach(station => {
    if (alert) {
      if (station._id === alert.station) {
        currentStation = station;
      }
    }
  })

  const alertDate = () => {
    let alertday = alert.createdAt.split('T')[0];
    return alertday;
  }

  const alertTime = () => {
    let alerttime = alert.createdAt.split('T')[1].split('.')[0];
    return alerttime;
  }

  if (!open || !alert) return null
  return (
    <div className='alert-modal'>
        <svg className='close-alert-modal' height="12pt" viewBox="0 0 500 500" width="12pt" onClick={onClose}>
          <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
        </svg>
      <h1 className={`alert-modal-location ${alert.intensity}`}>
        {currentStation.name}
        <p className='alerts-stations'>{currentStation.line.join(" ")}</p>
      </h1>
      <p className='alert-description'>{alert.description}</p>
      <div className='alert-date-time'>
        <p className={`alert-date ${alert.intensity}`}>{alertDate()}</p>
        <p className={`alert-time ${alert.intensity}`}>{alertTime()}</p>
      </div>
    </div>
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
      deleteAlert: alertId => dispatch(deleteAlert(alertId))
    }
  }
  
  export default connect(mSTP, mDTP)(AlertModal);