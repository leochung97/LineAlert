import React from "react";
import Modal from "react-modal";
import LoginForm from "./login_form";
import "../../assets/stylesheets/session.scss";

export default function LoginModal(props) {
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
      {/* Has openSignup prop for switch function */}
      <LoginForm
        closeModal={props.closeModal}
        openSignup={props.openSignup}
      />
    </Modal>
  )
}