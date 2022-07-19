import React from "react";
import Modal from "react-modal";
import "../../assets/stylesheets/info_modal.scss"

export default function InfoModal(props) {
  return (
    <Modal
      className="session-modal"
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      closeTimeoutMS={50}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }
      }}
    >
      <div className="info-modal">
        <svg className='close-modal' height="15pt" viewBox="0 0 500 500" width="15pt" onClick={props.closeModal}>
          <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
        </svg>
        
        <div className="info-text">
          <p>Sign up or Log In for the ability to alert others. Anonymous users will still have access to all other functionality.</p>
          <p>Use the toggle button on the top left of the map to switch the transit layer on and off.</p>
          <p>As alerts are created, color coded markers will pop up at each station where the hazard/activity is located.</p>
          <p>Alert Intensity Legend</p>
          YELLOW<p>Low: No hazards - discomfort unlikely</p>
          ORANGE<p>Medium: Chance of hazard - discomfort probable</p>
          RED<p>High: Hazard confirmed - avoid station</p>
          <p>Each marker is clickable and a blurb will pop up to display the alert.</p>
          <p>Find the safest and fastest route using our directions handler on the top right.</p> 
          <p>Input your origin and destination and your route will be displayed on the map, along with any alerts on the way.</p>
          <p>Keep clicking next if you would like to use the next best route.</p>
          <p>All alerts will be displayed on the bottom left in chronilogical order, as they are created.</p>
          <p>Stay safe and keep others safe!</p>
        </div>
      </div>
    </Modal>
)}