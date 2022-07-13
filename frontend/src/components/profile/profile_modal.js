import React from "react";
import Modal from "react-modal";
import ProfileForm from "./profile_form";
import "../../assets/stylesheets/profile_modal.scss";

export default function ProfileModal(props) {
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
      <ProfileForm
        closeModal={props.closeModal}
      />
    </Modal>
  )
}