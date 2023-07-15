import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

import '../client/Dashboard.scss'
import Card from '../../components/ui/Cards/Card'
import {actions} from '../../redux/adminSlice'
import { fetchAllApplications, fetchReviewerSignups } from '../../utils/api/adminApi'
import CustomSpinner from '../../components/common/CustomSpinner'

function Dashboard() {
  const cardTitle = ['Database', 'Review Signup', 'Queries']
  const catRoutes = ['database', 'review-signup', 'queries']
  const [currentCard, setCurrentCard] = useState('Database');
  const [loading, setLoadingState] = useState(false)
  const categoryCount = useSelector((state) => {
    console.log("fuck",state.adminReducer)
    return [
    state.adminReducer.applications?.length,
    state.adminReducer.reviewerSignups?.length,
    state.adminReducer.queries?.length]}
  )
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fetchApplication = async () => {
    try {
      setLoadingState(true)
      const response = await fetchAllApplications()
      setLoadingState(false)
      if(response.error)
        return console.log(response.error)
      console.log(response.allApplications)
      const response2 = await fetchReviewerSignups()
      if(response2.error){
        return console.log(response.error)
      }

      // const response
      // if(response3.error){

      // }
      dispatch(actions.setAllApplication(response.allApplications))
      dispatch(actions.setReviewerSignups(response2.reviewerSignups))
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