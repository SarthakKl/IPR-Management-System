import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './HomePage.scss'
import Button from '../components/ui/button/Button'
import AuthModal from './../components/ui/modals/AuthModal'
import logo from '../assets/logo.png'

function Homepage() {
    const location = useLocation()
    const [loginModal, showLoginModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const navigate = useNavigate()

    const onLogin = () => {
        setModalTitle('Login')
        showLoginModal(true)
    }
    return (
        <div>
            <div className='header'>
                <div className='logo'>
                    <img src = {logo} width = '80' height='50'/>
                    {/* <h2>IPR</h2> */}
                </div>
                <div>
                    <Button variant='success' onClick={onLogin}>Login</Button>
                </div>
            </div>
            <div>
                <div className="landing-div">
                    <div className='div-1'>
                        <p className='main-text' >IPR Management <br /> System</p>
                        <p className='main-text-helper'>This is Intellectual Property Rights software that grants the Inventor or Creator legal rights to protect his invention or creation.</p>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/jJv1FC0/pngwing-com.png" alt="" />
                    </div>
                </div>
            </div>
            <div>
                <AuthModal 
                    showModal = {loginModal} 
                    onHide = {() => showLoginModal(false)}
                    modalTitle = {modalTitle}
                />
            </div>
        </div>
    )
}

export default Homepage
