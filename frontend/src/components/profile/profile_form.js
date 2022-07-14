import React, { useState } from "react";
import { connect } from "react-redux";

function ProfileForm(props) {
  const [preferences, setPref] = useState(props.currentUser.preferences)
  const [state, setState] = useState({
    id: props.currentUser.id,
    mobile: props.currentUser.mobile,
    email: props.currentUser.email,
    preferences: preferences
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const prefUpdate = (line) => {
    console.log(line);
    console.log(preferences[0].line)
    preferences[0].line = !preferences[0].line
  }
  
  return (
    <div className="profile-container">
      <form onSubmit={handleSubmit}>
        <div className="close-profile-modal-container">
          <svg className='close-modal' height="15pt" viewBox="0 0 500 500" width="15pt" onClick={props.closeModal}>
            <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
          </svg>
        </div>
        <div className="profile-header">
          <h1>User Preferences</h1>
        </div>
        <div className="profile-preferences">
          { Object.keys(preferences[0]).map(line => {
            return (
              <div className='preference-radio-container' key={line}>
                {`${line}`}
                <input className='preference-radio' type="checkbox" onClick={() => prefUpdate(line)}/>
              </div>
          )})}
        </div>
        <h6 className='select-stations-directions'>Select all stations you'd like to receive alerts for.</h6>
      </form>
    </div>
  )
};

const mSTP = state => ({
  currentUser: state.session.user
});

export default connect(mSTP)(ProfileForm);