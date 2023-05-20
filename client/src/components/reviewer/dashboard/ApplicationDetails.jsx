import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from '../../ui/button/Button'
import './ApplicationDetails.scss'
import Input from '../../common/Input'
import ViewButton from '../../common/ViewButton'

function ApplicationDetails({applicationInfo}) {
    const application = applicationInfo.application
    const clientDetails = applicationInfo.clientDetails
    console.log({applicationInfo})
    return (
        <div className='application_details_wrapper'>
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
            <Input
                label='Client'
                value={clientDetails?.fullname}
            />
            <Input
                label='Email'
                value={clientDetails?.email}
            />
            {
                clientDetails?.clientDescription &&
                <Input
                    label='Client'
                    value={clientDetails?.clientDescription}
                />
            }
            
            <ViewButton
                url={application?.id_proof}
                title = 'Id Proof'
            />
            <ViewButton
                url={application?.content?.length > 0 ? application?.content[0] : ''}
                title = 'Drawing of Work'
            />
            {
                application?.ipr_type =='trademark' &&
                <>
                    <ViewButton
                        url={application.forms[0]}
                        title = 'Form 48'
                    />
                </>            
            }
            {
                application?.ipr_type =='patent' &&
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
    )
}

export default ApplicationDetails



