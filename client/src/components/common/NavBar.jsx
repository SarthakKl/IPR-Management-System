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
  const auth = useSelector(state=>state.authReducer)
  
  console.log(auth)
  return (
    <div className='header'>
        <div>
          <img src = {logo} width = '80' height='50'/>
        </div>
        <div className = 'right-header'>  
            <div className='profile'>
                <span className='username'>USERNAME</span>
                <Dropdown>
                  <Dropdown.Toggle>
                    <img src = {profile} height = '40' width= '40'/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
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