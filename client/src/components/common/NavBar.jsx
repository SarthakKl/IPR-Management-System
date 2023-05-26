import './NavBar.scss'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../../assets/logo.png'
import profile from '../../assets/profile_placeholder.png'
import { Dropdown} from 'react-bootstrap'
import { deauthenticateUser } from '../../redux/authSlice'
import { useNavigate } from 'react-router-dom'

function NavBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userName = useSelector(state=>state.authReducer.userName)
  
  console.log(userName)
  return (
    <div className='header'>
        <div>
          <img src = {logo} width = '80' height='50' alt = 'ipr logo'/>
        </div>
        <div className = 'right-header'>  
            <div className='profile'>
                <span className='username'>{userName}</span>
                <Dropdown>
                  <Dropdown.Toggle>
                    <img src = {profile} height = '40' width= '40' alt = 'profile placeholder'/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Item
                      onClick={()=>{
                        dispatch(deauthenticateUser())
                        navigate('/')
                      }}
                    >Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
            </div> 
        </div>
    </div>
  )
}

export default NavBar