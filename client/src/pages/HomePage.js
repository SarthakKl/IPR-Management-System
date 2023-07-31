import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './HomePage.scss'
import Button from 'react-bootstrap/Button'
import AuthModal from './../components/ui/modals/AuthModal'
import Dropdown from 'react-bootstrap/Dropdown';
import logo from '../assets/logo1.png'
import homeImage from '../assets/patentImages.jpg'
import homepage_logo1 from '../assets/homepage_logo1.png'
import patent from '../assets/patent.png'
import copyright from '../assets/copyright.png'
import trademark from '../assets/trademark.png'

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
            <div>
                <div className="first-div">
                    <div className='navbar'>
                        <div className='logo'>
                            <h4><span>Invent</span>Assure</h4>
                        </div>
                        <div className='right-section'>
                            <div className = 'options'>About</div>
                            <div className='options'>Features</div>
                            <div className='options'>Contact</div>
                            <Dropdown >
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Login
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={()=> {navigate('/client/dashboard')}}>User</Dropdown.Item>
                                    <Dropdown.Item onClick={()=> {navigate('/reviewer/dashboard')}}>Reviewer</Dropdown.Item>
                                    <Dropdown.Item onClick={()=> {navigate('/admin/dashboard')}}>Administrator</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className = 'first-div-content'>
                        <div className='div-1'>
                            <p className='main-text' >IPR Management <br /> System</p>
                            <p className='main-text-helper'>
                                An effective IPR management system
                                that will help you to leverage your intellectual property assets strategically,
                                protect them from unauthorized use, and extract value from their innovative ideas and
                                creations.
                            </p>
                            <Button>Read More</Button>
                        </div>
                        <div>
                            <img src="https://i.ibb.co/jJv1FC0/pngwing-com.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className="second-div">
                    <div className='services-heading'>Our Services</div>
                    <div className='cards'>
                        {/* <Card title = 'Patent' content = '' */}
                        <Card
                            logo = {patent}
                            title='Patent'
                            content='Simplify patent registration with our IPR management system. File patents, track progress, and collaborate seamlessly.'
                        />
                        <Card 
                            logo = {copyright}
                            title='Copyright' 
                            content='Efficiently register your copyright with our user-friendly IPR management system.' 
                        />
                        <Card 
                            logo = {trademark}
                            title='Trademark' 
                            content='Effortlessly register your trademark using our IPR management system. Streamline the application, track progress, and collaborate seamlessly.' 
                        />
                    </div>
                </div>
                <div className='footer'>
                    <div>
                        <h5>Site Links</h5>
                        <div className='links'>About us</div>
                        <div className='links'>How to join us?</div>
                        <div className='links'>Help</div>
                    </div>
                    <div>
                        <h5>Social</h5>
                        <div className='links'>Facebook</div>
                        <div className='links'>Twitter</div>
                        <div className='links'>YouTube</div>
                    </div>
                    <div className='address'>
                        <h5>Address</h5>
                        <div>InventAssure</div>
                        <div>Address: 789, Diamond Tower, Camac Street</div>
                        <div>Kolkata, West Bengal</div>
                        <div>India</div>
                    </div>
                    <div>
                        <h5>Newsletter Subscription</h5>
                        <input placeholder='Email Address' className='newsletter-input' />
                        <Button className='subscribe-btn'>Subscribe</Button>
                    </div>
                </div>
            </div>
            <div>
                <AuthModal
                    showModal={loginModal}
                    onHide={() => showLoginModal(false)}
                    modalTitle={modalTitle}
                />
            </div>
        </div>
    )
}

const Card = ({ logo, title, content }) => {
    return (
        <div className='homepage-card'>
            <img src = {logo} alt = 'patent logo' className='content-logo'/>
            <div className='heading'>{title}</div>
            <div className='card-content'>
                {content}
            </div>
            <Button className = 'read-more-btn'> &rarr; </Button>
        </div>
    );
}

export default Homepage
