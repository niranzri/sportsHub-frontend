import { useState, useEffect, useContext} from "react";
import { useNavigate } from 'react-router-dom'
import classes from '../styles/profile.module.css';
import ProfileSection from '../components/ProfileSection.jsx'
import { AuthContext } from '../contexts/AuthContext'
import classeActivities from '../styles/allActivities.module.css'

const CompanyProfilePage = () => {

    let company = '';
    const [activities, setActivities] = useState([])


    

    const { user } = useContext(AuthContext)
    const { companyId } = useContext(AuthContext)
    company = companyId;
    console.log(user)

    
      useEffect(() => {
      
           
        const fetchActivities = async () => {

            try {
                 
               const response = await fetch(`${import.meta.env.VITE_API_URL}/api/activities/company/${company}`)
               
               console.log(response)
               if (response.ok) {
                 const activitiesData = await response.json()
      
                 console.log(activitiesData)
                 setActivities(activitiesData)
                 console.log(activitiesData[0].image)
                 console.log(activitiesData[0].type)
               }
             } catch (error) {
               console.log(error)
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
              {  activities.map(activity => (
                <div className={classeActivities.activity} key={activity._id}>
            
            
                <div>
                <p>{activity.type}</p>
                  {<img src={activity.image} alt="Activity Image" />}
                  </div>
            
        </div>
            )) }
                


            </div>
        </div>
    );
              }
 
export default CompanyProfilePage;

