import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx';
import classeActivities from '../styles/allActivities.module.css'
import { AuthContext } from '../contexts/AuthContext'

let boolean = false;

const AllActivitiesPage = () => {
    const [activities, setActivities] = useState([])
    const { isLogin } = useContext(AuthContext)
    const fetchActivities = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/activities`)
          if (response.ok) {
            const activitiesData = await response.json()
            console.log(activitiesData)
            setActivities(activitiesData)
          }
        } catch (error) {
          console.log(error)
        }
      }

      if(isLogin){
        boolean = true;
      }


      useEffect(() => {
        fetchActivities()
      }, [])
      return (
        <div>
            <Navbar/>  
            <div className={classeActivities.outCtn}>
            <p>See your activities</p>
            {boolean ? <Link to={`/CompanyCreateActivityPage`}>Create an activity</Link> : <Link to={`/login`}>Create an activity</Link>}
            
            </div>
            <div className={classeActivities.mainCtn}>
          
    
            {activities.map(activity => (
                <div className={classeActivities.activity} key={activity._id}>
            <div className={classeActivities.item} >
              
                <Link to={`/activityDetails/${activity._id}`}>
                <p className={classeActivities.text}>{activity.type}</p>
                  
                  {<img src={activity.image}  />}
                </Link>
              
            </div>
        </div>
            ))}
          
          </div>
        </div>
      )
    
}




export default AllActivitiesPage