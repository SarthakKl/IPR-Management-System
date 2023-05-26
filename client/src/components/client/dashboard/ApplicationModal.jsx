import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from '../../ui/button/Button'
import Input from '../../common/Input'
import './ApplicationModal.scss'
import ViewButton from '../../common/ViewButton'

const ApplicationModal = ({application, setApplication}) => {
    console.log(application)
    return (
        <Modal
            size="lg"
            show={application}
            onHide={() => setApplication('')}
            aria-labelledby="example-modal-sizes-title-lg"
            backdrop='static'
            keyboard={false}
            className='application-modal'
            centered
        >  
            <Modal.Header>
                <Modal.Title>
                    {application.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='application-details-wrapper'>
                    <Input
                        label='Title'
                        value={application?.title}
                    />
                    <Input
                        label='IPR Type'
                        value={application?.ipr_type}
                    />
                    <Input
                        label='Description'
                        value={application?.description}
                    />
                    <Input
                        label='Status'
                        value={application?.status}
                    />
                    <ViewButton
                        url={application?.id_proof}
                        title = 'Id Proof'
                    />
                    <ViewButton
                        url={application?.content?.length > 0 ? application?.content[0] : ''}
                        title = 'Drawing of Work'
                    />
                    {
                        application?.ipr_type ==='trademark' &&
                        <>
                            <ViewButton
                                url={application.forms[0]}
                                title = 'Form 48'
                            />
                        </>            
                    }
                    {
                        application?.ipr_type ==='patent' &&
                        <>
                            <ViewButton
                                url={application?.forms[0] ?? ''}
                                title = 'Form 1'
                            />
                            <ViewButton
                                url={application?.forms[1]}
                                title = 'Form 3'
                            />
                            <ViewButton
                                url={application?.forms[2]}
                                title = 'Form 5'
                            />
                        </>  
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick = {() => setApplication(null)}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ApplicationModal