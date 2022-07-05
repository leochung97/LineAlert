import React from "react";
import Modal from "react-modal";
import SignupForm from "./signup_form";

export default function SignupModal(props) {
  return (
    <Modal
      className="signup-modal"
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      closeTimeoutMS={50}
      ariaHideApp={false}
    >
      <SignupForm 
        closeModal={props.closeModal}
      />
    </Modal>
  )
}
