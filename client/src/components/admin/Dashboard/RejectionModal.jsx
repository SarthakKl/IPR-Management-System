import Rect, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/esm/Button';
import './RejectionModal.scss'
import { toast } from 'react-toastify';

const RejectionModal = ({showRejectionModal, setRejectionModalState, handleRejection}) => {
    const [rejectionReason, setRejectionReason] = useState('')
    console.log({showRejectionModal})
    const notify = (msg) => toast.error(msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const onClickReject = () => {
        if(!rejectionReason){
            return notify("Reason can't be empty!!")
        }
        handleRejection(rejectionReason)
    }
    return (
        <div>
            <Modal
                className = 'rejection-modal'
                size="md"
                show={showRejectionModal}
                onHide={()=>setRejectionModalState(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                backdrop='static'
                keyboard={false}
                centered
            >
                <Modal.Header>
                    <Modal.Title>Remarks</Modal.Title>
                </Modal.Header>
                <Modal.Body className = 'rejection-modal-body'>
                    <textarea
                        placeholder='Add reason for rejection'
                        onChange = {(e) => {setRejectionReason(e.target.value)}} 
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={onClickReject}>Reject</Button>
                    <Button onClick={() => setRejectionModalState(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default RejectionModal;