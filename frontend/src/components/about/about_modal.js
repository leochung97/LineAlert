import React from "react";
import Modal from "react-modal";
import "../../assets/stylesheets/about_modal.scss";

const AboutModal = ({isOpen, closeModal}) => {
  if (!isOpen) return null;
  return (
    <Modal
    className="session-modal"
    isOpen={isOpen}
    onRequestClose={closeModal}
    closeTimeoutMS={50}
    ariaHideApp={false}
    style={{
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }
    }}
    >
      <div className='about-modal-container'>
        <div className='close-about-modal-container'>
          <svg className='close-about-modal' height="15pt" viewBox="0 0 500 500" width="15pt" onClick={closeModal}>
            <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
          </svg>
        </div>
          <div className='about-item'>
              <img className='about-img' src='https://linealert-assets.s3.amazonaws.com/circle-leo.png' alt='about-leo'/>
              <div className='about-details'>
                  <span className='about-details-item'><h4>Leo</h4></span>
                  <span className='about-details-item'><h4>Chung</h4></span>
                  <span className='about-details-item'><h6>Project Lead</h6></span>
              </div>
              <div className='about-links'>
              <a href='https://www.linkedin.com/in/swchung/' target="_blank" rel='noreferrer'>
                  <img className='linkedin-logo' src='https://linealert-assets.s3.amazonaws.com/linkedin-logo.png' alt='github-logo'/>
              </a>
              <a href='https://github.com/leochung97' target="_blank" rel='noreferrer'>
                  <img className='github-logo' src='https://linealert-assets.s3.amazonaws.com/github-logo.png' alt='github-logo'/>
              </a>
              </div>
          </div>
          <div className='about-item'>
              <img className='about-img' src='https://linealert-assets.s3.amazonaws.com/circle-tom.png' alt='about-tom'/>
              <div className='about-details'>
                  <span className='about-details-item'><h4>Tom</h4></span>
                  <span className='about-details-item'><h4>Li</h4></span>
                  <span className='about-details-item'><h6>Frontend Lead</h6></span>
              </div>
              <div className='about-links'>
              <a href='https://linkedin.com/in/tomleslieli/' target="_blank" rel='noreferrer'>
                  <img className='linkedin-logo' src='https://linealert-assets.s3.amazonaws.com/linkedin-logo.png' alt='github-logo'/>
              </a>
              <a href='https://github.com/tomleslieli' target="_blank" rel='noreferrer'>
                  <img className='github-logo' src='https://linealert-assets.s3.amazonaws.com/github-logo.png' alt='github-logo'/>
              </a>
              </div>
          </div>
          <div className='about-item'>
              <img className='about-img' src='https://linealert-assets.s3.amazonaws.com/circle-nick.png' alt='about-nikhil'/>
              <div className='about-details'>
                  <span className='about-details-item'><h4>Nikhil</h4></span>
                  <span className='about-details-item'><h4>Kumar</h4></span>
                  <span className='about-details-item'><h6>Backend Lead</h6></span>
              </div>
              <div className='about-links'>
              <a href='https://www.linkedin.com/in/nikhil-kumar7890/' target="_blank" rel='noreferrer'>
                  <img className='linkedin-logo' src='https://linealert-assets.s3.amazonaws.com/linkedin-logo.png' alt='github-logo'/>
              </a>
              <a href='https://github.com/nikumar1206' target="_blank" rel='noreferrer'>
                  <img className='github-logo' src='https://linealert-assets.s3.amazonaws.com/github-logo.png' alt='github-logo'/>
              </a>
              </div>
          </div>
          <div className='about-item'>
              <img className='about-img' src='https://linealert-assets.s3.amazonaws.com/circle-viv.png' alt='about-vivian'/>
              <div className='about-details'>
              <span className='about-details-item'><h4>Vivian</h4></span>
                  <span className='about-details-item'><h4>Chen</h4></span>
                  <span className='about-details-item'><h6>Flex Lead</h6></span>
              </div>
              <div className='about-links'>
              <a href='https://www.linkedin.com/in/vivian-chen-8082169a/' target="_blank" rel='noreferrer'>
                  <img className='linkedin-logo' src='https://linealert-assets.s3.amazonaws.com/linkedin-logo.png' alt='github-logo'/>
              </a>
              <a href='https://github.com/vnchen92' target="_blank" rel='noreferrer'>
                  <img className='github-logo' src='https://linealert-assets.s3.amazonaws.com/github-logo.png' alt='github-logo'/>
              </a>
              </div>
          </div>
      </div>
    </Modal>
  )
}

export default AboutModal