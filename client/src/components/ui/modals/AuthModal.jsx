// import { Button } from 'bootstrap';
// import Button from 'react-bootstrap/Button';
import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import './AuthModal.scss'

function AuthModals({showModal, onHide, modalTitle}) {
  const navigate = useNavigate()
  return (
    <Modal
      show = {showModal}
      onHide = {onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className = 'auth-modal-options'>
          <Button onClick = {() => navigate('/client/dashboard')}>Client</Button>
          <Button onClick = {() => navigate('/reviewer/dashboard')}>Reviewer</Button>
          <Button onClick = {() => navigate('/admin/dashboard')}>Administrator</Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant = 'danger' onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AuthModals