import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams} from 'react-router-dom';
import { checkVerificationToken } from '../../utils/api/clientApi';
import {actions} from '../../redux/authSlice'

function AdminVerification() {
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
        dispatch(actions.setAdminToken(response.token))
        dispatch(actions.setUserName(response.admin.fullname))
        setMessage('Email verified successfully. Redirecting...')
        await localStorage.setItem('ADMIN_TOKEN', response.token)
        await localStorage.setItem('ADMIN_NAME', response.admin.fullname)
        navigate('/admin/dashboard', {replace:true})
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

export default AdminVerification