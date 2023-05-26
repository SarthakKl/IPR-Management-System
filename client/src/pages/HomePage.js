import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './HomePage.scss'
import Button from '../components/ui/button/Button'
import AuthModal from './../components/ui/modals/AuthModal'
import logo from '../assets/logo.png'
import homeImage from '../assets/patentImages.jpg'

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
                        <p className='main-text-helper'>
                            This is Intellectual Property Rights software that grants the Inventor or Creator 
                            legal rights to protect his invention or creation. An effective IPR management system 
                            that will help you to leverage your intellectual property assets strategically, 
                            protect them from unauthorized use, and extract value from their innovative ideas and 
                            creations. It plays a crucial role in fostering innovation, competitiveness, and 
                            sustainable growth for businesses across various industries.
                        </p>
                        <Button>Read More</Button>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/jJv1FC0/pngwing-com.png" alt="" />
                    </div>
                </div>
                <div className="landing-div">
                <div>
                    <img src={homeImage} alt="2" />
                </div>
                <div className='div-2'>
                    <p className='main-text-helper'>
                        Within our IPR management system, our patent management framework 
                        comprises essential components to effectively protect, manage, and 
                        leverage our patents. We begin by conducting thorough patent searches 
                        and analyzing prior art to evaluate the patentability and novelty of our 
                        inventions. 
                    </p>
                    <Button>Read More</Button>
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
