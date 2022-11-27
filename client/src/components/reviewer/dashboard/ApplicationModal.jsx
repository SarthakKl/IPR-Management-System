import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from '../../ui/button/Button'
import Spinner from 'react-bootstrap/Spinner';
import { useEffect } from 'react';
import { reviewApplication } from '../../../utils/api/reviewerApi'
import ApplicationDetails from './ApplicationDetails';

function ApplicationModal({ setApplicationId, applicationId }) {
    const [btnLoading, setBtnLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errorEncountered, setError] = useState('')
    const [application, setApplication] = useState({})
    const [buttonStatus,setButtonStatus] = useState(false)
    const fetchApplication = async () => {
        try {
            setIsLoading(true)
            const response = await reviewApplication(applicationId)
            setIsLoading(false)
            if (response.error) {
                return setError(response.error)
            }
            setApplication(response.application)
        } catch (error) {
            console.log(error)
            return setError(error.message)
        }
    }
    const updateHandler = async(status)=>{
        try {
            if(status==='approved')setButtonStatus('approvedLoading')
            if(status==='rejected')setButtonStatus('rejectedLoading')
            // const response = await updateApplicationStatus(applicationId,status)
            // setButtonStatus(false)
            // if (response.error) {
            //     return setError(response.error)
            // }
            
        } catch (error) {
            console.log(error)
            setButtonStatus(false)
            return setError(error.message)
        }
    }
    useEffect(() => {
        if (applicationId)fetchApplication()
    }, [applicationId])
    return (
        <div>
            <Modal
                size="lg"
                show={applicationId }
                onHide={() => setApplicationId('')}
                aria-labelledby="example-modal-sizes-title-lg"
                backdrop='static'
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Apply
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body disabled>
                    {
                        !isLoading && !errorEncountered &&
                        <ApplicationDetails application={application} />
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
                            errorEncountered
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer className='application-footer'>
                    <Button disabled={isLoading || btnLoading || errorEncountered}>
                        {
                            isLoading ?
                            <Spinner /> :
                            'Approved'
                        }
                    </Button>
                    <Button disabled={isLoading || btnLoading || errorEncountered}>
                        {
                            isLoading ?
                            <Spinner /> :
                            'Rejected'
                        }
                    </Button>
                    <Button onClick={() => setApplicationId('')}>Cancel </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ApplicationModal