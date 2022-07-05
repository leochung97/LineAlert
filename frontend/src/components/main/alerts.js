import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Alert from './alert';
import { fetchAlerts } from '../../actions/alert_actions';

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
                return <div key={alert._id}><Alert alert={alert}/></div>
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
        alerts: state.entities.alerts
    }
}

const mapDisptachToProps = dispatch => {
    return {
        fetchAlerts: () => dispatch(fetchAlerts())
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(Alerts);

