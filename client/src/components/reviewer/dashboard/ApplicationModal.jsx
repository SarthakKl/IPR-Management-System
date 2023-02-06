import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from '../../ui/button/Button'
import Spinner from 'react-bootstrap/Spinner';
import { useEffect } from 'react';
import { completeReview, reviewApplication } from '../../../utils/api/reviewerApi'
import ApplicationDetails from './ApplicationDetails';
import { useDispatch } from 'react-redux';
import {actions} from '../../../redux/reviewerSlice'

function ApplicationModal({ setApplicationId, applicationId, clientId, parentComponent}) {
    const [isLoading, setIsLoading] = useState(false)
    const [errorEncountered, setError] = useState('')
    const [application, setApplication] = useState({})
    const [buttonStatus,setButtonStatus] = useState(false)
    const dispatch = useDispatch()
    const fetchApplication = async () => {
        try {
            setIsLoading(true)
            const response = await reviewApplication({applicationId, clientId})
            console.log(response)
            setIsLoading(false)
            if (response.error) {
                return setError(response.error)
            }
            setApplication({application: response.application, clientDetails: response.client})
            if(parentComponent == 'applications')
                dispatch(actions.reviewApplication(applicationId))
        } catch (error) {
            console.log(error)
            return setError(error.message)
        }
    }
    const updateHandler = async(status)=>{
        try {
            if(status==='APPROVED')setButtonStatus('approvedLoading')
            if(status==='REJECTED')setButtonStatus('rejectedLoading')
            const response = await completeReview(applicationId,status)
            setButtonStatus('')
            if (response.error) {
                return setError(response.error)
            }
            
            dispatch(actions.completeReview({_id:applicationId, status}))
            setApplicationId('')
        } catch (error) {
            console.log(error)
            setButtonStatus(false)
            return setError(error.message)
        }
    }
    const onClose = () => {
        setApplicationId('')
        setError('')
    }
    useEffect(() => {
        if(applicationId)
            fetchApplication()
    }, [applicationId])
    return (
        <div>
            <Modal
                size="lg"
                show={applicationId}
                onHide={() => setApplicationId('')}
                aria-labelledby="example-modal-sizes-title-lg"
                backdrop='static'
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Review
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body disabled>
                    {
                        !isLoading && !errorEncountered &&
                        <ApplicationDetails applicationInfo={application} />
                    }
                    {
                        isLoading &&
                        <div>
                            <Spinner />
                        </div>
                    }
                    {
                        errorEncountered &&
                        <div>
                            {errorEncountered}
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer className='application-footer'>
                    <Button 
                        disabled={buttonStatus || errorEncountered} 
                        onClick = {() => updateHandler('APPROVED')}
                    >
                        {
                            buttonStatus == 'approvedLoading' ?
                            <Spinner /> :
                            'Approved'
                        }
                    </Button>
                    <Button 
                        disabled={buttonStatus || errorEncountered} 
                        onClick = {() => updateHandler('REJECTED')}
                    >
                        {
                            buttonStatus == 'rejectedLoading' ?
                            <Spinner /> :
                            'Rejected'
                        }
                    </Button>
                    <Button 
                        onClick={() => onClose()} 
                        disabled={buttonStatus}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ApplicationModal