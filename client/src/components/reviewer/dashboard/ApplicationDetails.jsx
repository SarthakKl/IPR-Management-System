import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from '../../ui/button/Button'

import './ApplicationDetails.scss'
function ApplicationDetails({application}) {
    console.log({application})
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


const Input = ({value,label})=>{
    return(
        <div className='input_wrapper'>
            <label>{label}</label>
            <input type="text" value={value} disabled/>
        </div>
    )
}

const ViewButton = ({url,title})=>{
    const [viewModal,setViewModal] = useState(false)


    return(
        <div className='doc_wrapper'>
            <label htmlFor="">{title}</label>
            <a href={url} target='_blank'>
                <Button >View</Button>
            </a>
        </div>
        
    )

}