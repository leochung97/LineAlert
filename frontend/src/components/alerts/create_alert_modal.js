import React from "react";
import Modal from "react-modal";
import CreateAlertForm from "./create_alert_form.js";
import "../../assets/stylesheets/create_alert.scss";

export default function CreateModal(props) {
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
      <CreateAlertForm
        closeModal={props.closeModal}
      />
    </Modal>
  )
}