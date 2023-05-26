import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';
import Modal from 'react-bootstrap/Modal'
import Button from '../ui/button/Button';
import ApplicationDetails from './dashboard/ApplicationDetails';

const ApplicationModal = ({applicationShown, showApplicationState, getClientDetails}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [errorEncountered, setError] = useState('')
    const [completeApplication, setApplication] = useState({application: applicationShown})
    const fetchClientDetails = async () => {
        
        setIsLoading(true)
        const client = await getClientDetails({clientId: applicationShown.client_id})
        setIsLoading(false)
        if(client.error)
            return setError(client.error)
        setApplication(prev => {
            prev["application"] = applicationShown
            prev["clientDetails"] = client.client
            return prev;
        })
    }
    const onClose = () => {
        showApplicationState(null)
        setError('')
    }
    useEffect(()=>{
        if(applicationShown)
            fetchClientDetails()
    }, [applicationShown])
    return (
        <Modal
            size="lg"
            show={applicationShown}
            onHide={() => showApplicationState(null)}
            aria-labelledby="example-modal-sizes-title-lg"
            backdrop='static'
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    {
                        applicationShown ? applicationShown.title:'Application'
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body disabled>
                {
                    !isLoading && !errorEncountered &&
                    <ApplicationDetails applicationInfo={completeApplication} />
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
                    onClick={() => onClose()} 
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ApplicationModal;