import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Input from '../../common/Input';
import './ReviewerDetailModal.scss'
import Button from '../../ui/button/Button';
import RejectionModal from './RejectionModal';
import { approveReviewerSignup, fetchReviewerSignups, rejectReviewerSignup } from '../../../utils/api/adminApi';
import { ThreeDots } from 'react-loader-spinner'
import Alert from '../../common/Alert'
import { useDispatch } from 'react-redux';
import {actions} from '../../../redux/adminSlice'

const ReviewDetailModal = ({reviewer, setReviewer , }) => {
    const [showRejectionModal, setRejectionModalState] = useState(false)
    const [showOverlay, setOverlayState] = useState(false)
    const [showAlert, setAlertState] = useState(false)
    const dispatch = useDispatch()

    const manageModalClosure= () => {
        setOverlayState(false)
        setRejectionModalState(false)
        setAlertState(false)
        setReviewer(null)
    }
    const handleRejection = async (rejectionReason) => {
        try {
            setOverlayState(true)
            const response = await rejectReviewerSignup({reviewerId:reviewer._id, rejectionReason})
            if(response.error){
                console.log(response.error)
                manageModalClosure()
                return
            }
            const response2 = await fetchReviewerSignups()
            dispatch(actions.setReviewerSignups(response2.reviewerSignups))
            setTimeout(()=>{
                manageModalClosure()
            }, 500)
        } catch (error) {
            console.log(error)
            manageModalClosure()
        }
    }
    const confirmAlert = async () => {
        try {
            setOverlayState(true)
            const response = await approveReviewerSignup(reviewer._id)
            if(response.error){
                manageModalClosure()
                console.log(response.error)
            }
            const response2 = await fetchReviewerSignups()
            dispatch(actions.setReviewerSignups(response2.reviewerSignups))
            manageModalClosure()
        } 
        catch (error) {
            manageModalClosure()
            console.log(error)
        }
    }
    return (
        <div>
            {
                showOverlay &&
                <div className="overlay">
                    <div className='overlay-content'>
                        <ThreeDots 
                            height="80" 
                            width="80" 
                            radius="9"
                            color="blue" 
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        />
                    </div>
                </div>
            }
            <Modal
                className = {`rejection-modal ${(showAlert || showRejectionModal) ?"custom-dialogbox":""} `}
                size="lg"
                show={reviewer}
                onHide={()=>setReviewer(null)}
                aria-labelledby="example-modal-sizes-title-lg"
                backdrop='static'
                keyboard={false}
                centered
                
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Reviewer Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='reviewer-details-wrapper'>
                        <Input
                            label = 'Name'
                            value = {reviewer.fullname}
                        />
                        <Input
                            value = {reviewer.email}
                            label = 'Email'
                        />
                        <Input
                            value = {reviewer.mobile}
                            label = 'Mobile'
                        />
                        <Input
                            value = {reviewer.address}
                            label = 'Address'
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer className = 'reviewer-detail-footer'>
                    <Button onClick = {() => setAlertState(true)}>Approve</Button>
                    <Button variant='danger' onClick={() => setRejectionModalState(true)}>Reject</Button>
                </Modal.Footer>
            </Modal>
            <RejectionModal
                showRejectionModal = {showRejectionModal}
                setRejectionModalState = {setRejectionModalState}
                handleRejection = {handleRejection}
            />
            <Alert
                showAlert = {showAlert}
                setAlertState = {setAlertState}
                content = 'Are you sure you want to proceed?'
                confirmAlert= {confirmAlert}
            />  
        </div>
    )
}
export default ReviewDetailModal;