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
      onClick={props.closeModal}
    >
      <SignupForm 
        closeModal={props.closeModal}
        openLogin={props.openLogin}
      />
    </Modal>
  )
}