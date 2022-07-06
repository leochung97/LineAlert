import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Alert from './alert';
import { fetchAlerts } from '../../actions/alert_actions';
import '../../assets/stylesheets/alerts.scss'

const Alerts = ({fetchAlerts, alerts}) => {
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
        return <div className='alert-item' key={alert._id}><Alert alert={alert}/></div>
      })
    )
  }
  
  return (
    <div className='alert-item-container'>
      {component}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    alerts: state.entities.alerts
  }
}

const mapDisptachToProps = dispatch => {
  return {
    fetchAlerts: () => dispatch(fetchAlerts())
  }
}

export default connect(mapStateToProps, mapDisptachToProps)(Alerts);

