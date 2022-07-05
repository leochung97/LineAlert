import React from "react";
import Modal from "react-modal";
import LoginForm from "./login_form";

export default function LoginModal(props) {
  return (
    <Modal
      className="login-modal"
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      closeTimeoutMS={50}
      ariaHideApp={false}
    >
      <LoginForm
        closeModal={props.closeModal}
      />
    </Modal>
  )
}