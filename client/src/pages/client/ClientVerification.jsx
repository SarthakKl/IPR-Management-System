import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams} from 'react-router-dom';
import { checkVerificationToken } from '../../utils/api/clientApi';
import './ClientVerification.scss'
import {actions} from '../../redux/authSlice'

function ClientVerification() {
    const {token} = useParams()
    const [message, setMessage] = useState('Verifying email...')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const checkToken = async () => {
        const response = await checkVerificationToken(token)
        if(response.error){
            return setMessage(response.error)
        }
        console.log(response)
        dispatch(actions.setClientToken(response.token))
        dispatch(actions.setUserName(response.client.fullname))
        setMessage('Email verified successfully. Redirecting...')
        localStorage.setItem('CLIENT_TOKEN', response.token)
        localStorage.setItem('CLIENT_NAME', response.client.fullname)
        navigate('/client/dashboard', {replace:true})
    }
    useEffect(() => {
        checkToken()
    }, []);
  return (
    <div className='main-div'>
        {message}
    </div>
  )
}

export default ClientVerification