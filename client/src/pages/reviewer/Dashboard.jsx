import { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import '../client/Dashboard.scss'
import Card from '../../components/ui/Cards/Card'
import {actions} from '../../redux/reviewerSlice'
import { fetchApplications } from '../../utils/api/reviewerApi'
import CustomSpinner from '../../components/common/CustomSpinner'

function Dashboard() {
  const cardTitle = ['Applications', 'Reviewing', 'Reviewed']
  const catRoutes = ['applications', 'reviewing', 'reviewed']
  const [currentCard, setCurrentCard] = useState('Applications');
  const [loading, setLoadingState] = useState(false)

  const categoryCount = useSelector((state) => [
    state.reviewerReducer.applications.length,
    state.reviewerReducer.reviewing.length,
    state.reviewerReducer.reviewed.length])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fetchApplication = async () => {
    try {
      setLoadingState(true)
      const response = await fetchApplications()
      setLoadingState(false)
      if(response.error)
        return console.log(response.error)
      console.log(response)
      dispatch(actions.setAllApplication(response.applications))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchApplication()
  }, [])

  return (
    <div className='client-dashboard'>
      <CustomSpinner classname = {loading?'spinner-div white-wrapper':'spinner-div-hidden'}/>
      {
        !loading &&
        <div>
          <div className='cat-cards'>
            {
              cardTitle.map((title, index) => {
                return <Card
                  title={title}
                  count={categoryCount[index]}
                  classname = {currentCard === title ? 'info-card info-card-selected':'info-card'}
                  clicked={() => {
                    setCurrentCard(title)
                    navigate(catRoutes[index], { replace: true })
                  }}
                  key={index}
                />
              })
            }
          </div>
          <Outlet />
        </div>
      }
    </div>
  )
}

export default Dashboard