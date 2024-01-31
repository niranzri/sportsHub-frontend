
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import classesCreate from '../styles/createActivity.module.css'
import classes from '../styles/form.module.css';

const CompanyCreateActivityPage = () => {
    const { companyId } = useParams();
    const [type, setType] = useState('')
    const [schedule, setSchedule] = useState([])
    const [image, setImage] = useState('')
    const { fetchWithToken } = useContext(AuthContext)
    const [comp, setComp] = useState('')
   
     console.log(companyId)

    const navigate = useNavigate()
  
    const handleSubmit = async event => {
      event.preventDefault()
      const activityToCreate = {type, schedule, image, company: companyId}
      
      try {

        const response = await fetchWithToken(`/activities/`, 'POST', activityToCreate)
        if (response.status === 201) {
          
          const activity = await response.json()
          console.log(activity)
          navigate(`/activityDetails/${activity._id}`)
        } else {
          console.log('Something went wrong')
        }
      } catch (error) {
        console.error(error)
      }
    }

    useEffect(() => {
      
           
      const fetchCompany = async () => {
      
        try {   
               const response = await fetch(`${import.meta.env.VITE_API_URL}/api/companies/${companyId}`)
               console.log(response)
               if (response.ok) {
                 const companyData = await response.json()
                 setComp(companyData)
               }
             } catch (error) {
               console.log(error)
             }
           }
          

           fetchCompany()
      }, [])




    return ( 
        <>
       
    
    <div className={classes.pageCtn}> 
    <h1>Create a new activity for {comp.name} </h1> 
    <form
        onSubmit={handleSubmit}
        action='submit'
        style={{ display: 'flex', flexDirection: 'column' }}
        className={classes.form} >
        <label htmlFor='type'><span> Type: </span></label>
        <input
          type='text'
          id='type'
          value={type}
          onChange={event => setType(event.target.value)}
        />

        <label htmlFor='schedule'><span> Schedule: </span></label>
        <input
          type='text'
          id='schedule'
          value={schedule}
          onChange={event => setSchedule(event.target.value)}
        />
            
        <label htmlFor='image'><span> Image: </span></label>
        <input
          type='text'
          id='image'
          value={image}
          onChange={event => setImage(event.target.value)}
        />

       
        <button type='submit' className={classes.accessButton}>SUBMIT</button>
      </form>
      </div>
   
    </>
    );
}
 
export default CompanyCreateActivityPage;