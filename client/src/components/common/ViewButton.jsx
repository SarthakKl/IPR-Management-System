import React from 'react'
import Button from '../ui/button/Button'

const ViewButton = ({url,title})=>{
    return(
        <div className='doc_wrapper'>
            <label htmlFor="">{title}</label>
            <a href={url} target='_blank' rel='noreferrer'>
                <Button >View</Button>
            </a>
        </div>
        
    )
}
export default ViewButton