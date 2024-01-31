import { useState, useEffect, useContext} from "react";
import { Link } from 'react-router-dom'
import classes from '../styles/profile.module.css';
import ProfileSection from '../components/ProfileSection.jsx'
import { AuthContext } from '../contexts/AuthContext'

const CompanyProfilePage = () => {

    let company = '';
    const [activities, setActivities] = useState([])
    
    const { user, companyId } = useContext(AuthContext)
    company = companyId;
    console.log(user)


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

            <div className={classes.activitiesCtn}>

                <h1>All the activities of your company</h1>
                <Link to={`/companies/${user?.company}/createActivity`}>Create an activity</Link>
                {activities.map(activity => (
                 <div className={classes.activity} key={activity._id}>
                    <div className={classes.item} >

                          {<Link to={`/companies/${companyId}/${activity._id}`}>
                                 <p className={classes.text}>{activity.type}</p>
                                 {<img src={activity.image}  />}
                          </Link> }     
                

                     </div>
                 </div> ))}

            </div>
        </div>

    );
              }
 
export default CompanyProfilePage;

