import { useState, useEffect, useContext} from "react";
import { Link } from 'react-router-dom'
import classes from '../styles/profilePage.module.css';
import ProfileSection from '../components/ProfileSection.jsx'
import { AuthContext } from '../contexts/AuthContext'

const CompanyProfilePage = () => {

  const [activities, setActivities] = useState([])
  const { user, companyId } = useContext(AuthContext)
  let company= ''
   
  if (user && user.company){
    company = user.company;
  }
   

  useEffect(() => {
    const fetchActivities = async () => {
      if (user) {
        try {   
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/activities/company/${company}`)
          console.log(response)
          if (response.ok) {
            const activitiesData = await response.json()
            setActivities(activitiesData)
          }
        } catch (error) {
          console.log(error)
        }
      }
    }

    fetchActivities()
  }, [company])


  return (    
    <div className={classes.pageCtn}>
            <div className={classes.profileCtn}>
                <ProfileSection />
            </div>

            <div className={classes.mainCtn}>
                <h1>All the activities of your company</h1>
                
                <button type='button'>
                <Link to={`/companies/${user?.company}/createActivity`}>Add an activity</Link>
            </button>
                
                <div className={classes.activitiesCtn}>
                {activities.map(activity => (
                 <div className={classes.activity} key={activity._id}>
                    <div className={classes.item} >
                          {<Link to={`/companies/${companyId}/${activity._id}`}>
                                 <p className={classes.text}>{activity.type}</p>
                                 {<img src={activity.image} alt={activity.type} />}
                          </Link> }     
                     </div>

                 </div> 
                 ))}
                 </div>
              </div>
    </div>

  );
}
 
export default CompanyProfilePage;

