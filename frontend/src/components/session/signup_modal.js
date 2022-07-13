import React from "react";
import Modal from "react-modal";
import SignupForm from "./signup_form";
import "../../assets/stylesheets/session.scss";

export default function SignupModal(props) {
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
      {/* Has openLogin prop for switch function */}
      <SignupForm 
        openLogin={props.openLogin}
        closeModal={props.closeModal}
      />
    </Modal>
  )
}