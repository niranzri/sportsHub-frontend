import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx';
import classeActivities from '../styles/allActivities.module.css'

const AllActivitiesPage = () => {
    const [activities, setActivities] = useState([])
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


      useEffect(() => {
        fetchActivities()
      }, [])
      return (
        <div>
            <Navbar/>  
            <div className={classeActivities.container}>
          
    
            {activities.map(activity => (
                <div className={classeActivities.activity} key={activity._id}>
            <div className={classeActivities.item} >
              
                <Link to={`/activityDetails/${activity._id}`}>
                  <p>{activity.type}</p>
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