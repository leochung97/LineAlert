import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    return {
        alerts: station.entities.alerts
    }
}

const mapDisptachToProps = dispatch => {
    return {
        fetchAlerts: () => dispatch(fetchAlerts())
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(Alerts);



const Alerts = ({alerts, fetchAlerts}) => {
    const [alerts, setAlerts] = useState(alerts);

    fetchAlerts();

    useEffect(() => {
        fetchAlerts().then(() => setAlerts({...alerts}))
    }, [alerts])
    
    return (
        <div>
            {
                Object.values(alerts).map(alert => {
                    return <Alert alert={alert}/>
                })
            }
        </div>
    )
}

