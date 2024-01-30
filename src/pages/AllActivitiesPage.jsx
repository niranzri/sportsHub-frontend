import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx';
import classeActivities from '../styles/allActivities.module.css'
import { AuthContext } from '../contexts/AuthContext'


const AllActivitiesPage = () => {
    const [activities, setActivities] = useState([])
    let companyId = '';
    const { isAuthenticated } = useContext(AuthContext)
    if(isAuthenticated){
      const { user } = useContext(AuthContext)
    console.log(isAuthenticated)
    companyId = user.company
    console.log(user)
    console.log(user.company)

  }
    
   
    
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
            <div className={classeActivities.outCtn}>
            <p>See your activities</p>
           
            {isAuthenticated ? <Link to={`/companies/${companyId}/createActivity`}>Create an activity</Link> : <Link to={`/login`}>Create an activity</Link>}
           
            </div>
            <div className={classeActivities.mainCtn}>
          
    
            {activities.map(activity => (
                <div className={classeActivities.activity} key={activity._id}>
            <div className={classeActivities.item} >
            
              {isAuthenticated ? <Link to={`/companies/${companyId}/${activity._id}`}>
                <p className={classeActivities.text}>{activity.type}</p>
                  {<img src={activity.image}  />}
                </Link>      
              : <Link to={`/activityDetails/${activity._id}`}>
                <p className={classeActivities.text}>{activity.type}</p>
                  
                  {<img src={activity.image}  />}
                </Link>}
                {/*
                <Link to={`/activityDetails/${activity._id}`}>
                <p className={classeActivities.text}>{activity.type}</p>
                  
                  {<img src={activity.image}  />}
            </Link>*/}
              
            </div>
        </div>
            ))}
          
          </div>
        </div>
      )
    
}




export default AllActivitiesPage