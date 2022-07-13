import React, { useState } from "react";
import { connect } from "react-redux";
import { updateAlert, fetchAlerts } from "../../actions/alert_actions";

function EditAlertForm(props) {
  const [state, setState] = useState({
    _id: props.alert._id,
    description: props.alert.description,
    station: props.alert.station,
    intensity: props.alert.intensity,
    user: props.currentUser.id
  });

  const update = (field) => {
    return (e) => setState(() => ({ ...state, [field]: e.target.value }));
  };

  const intensityUpdate = text => {
    return () => setState(() => ({ ...state, intensity: text }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateAlert(state)
      .then(() => {
        props.closeModal();
      })
  }

  const renderErrors = () => {
    return (
      <ul>
        {Object.keys(props.errors).map((error, i) => (
          <li key={`error-${i}`}>{props.errors[error]}</li>
        ))}
      </ul>
    );
  }

  return (
    <div className='create-alert-form-container'>
      <form onSubmit={handleSubmit}>
        <svg className='close-modal' height="15pt" viewBox="0 0 500 500" width="15pt" onClick={props.closeModal}>
          <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
        </svg>
        <div className="create-alert-header">
          <h1>Edit Alert</h1>
        </div>
        <div className='create-alert-body'>
          <input
            className='modal-form'
            type="text"
            value={state.description}
            onChange={update("description")}
            placeholder="Description of alert"
          />
        </div>
        <div className='create-alert-intensity-dropdown'>
          <div className="middle">
            <h1>Alert Intensity </h1>
            <label>
              <input type="radio" name="radio" onClick={intensityUpdate("YELLOW")} />
              <div className="low box">
                <span>Low</span>
              </div>
            </label>

            <label>
              <input type="radio" name="radio" onClick={intensityUpdate("ORANGE")} />
              <div className="medium box">
                <span>Medium</span>
              </div>
            </label>

            <label>
              <input type="radio" name="radio" onClick={intensityUpdate("RED")} />
              <div className="high box">
                <span>High</span>
              </div>
            </label>
          </div>
        </div>
        <div className='intensity-explainer'>
          <p>Low: No hazards - discomfort unlikely</p>
          <p>Medium: Chance of hazard - discomfort probable</p>
          <p>High: Hazard confirmed - avoid station</p>
        </div>
        <div className='create-alert-errors'>
          {renderErrors()}
        </div>
        <input className="create-alert-submit-button" type="submit" value="Edit Alert" />
      </form>
    </div>
  )
}

const mSTP = state => ({
  currentUser: state.session.user,
  errors: state.errors.alert
})

const mDTP = dispatch => ({
  updateAlert: alert => dispatch(updateAlert(alert)),
  fetchAlerts: () => dispatch(fetchAlerts()),
})

export default connect(mSTP, mDTP)(EditAlertForm);