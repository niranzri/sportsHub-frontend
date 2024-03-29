
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import classesCreate from '../styles/createActivity.module.css'
import ProfileSection from '../components/ProfileSection.jsx'

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
          navigate(`/profile`)
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
      <div className={classesCreate.pageCtn}>
        <div className={classesCreate.profileCtn}>
          <ProfileSection />
        </div>


        <div className={classesCreate.hero}>
          <form
              onSubmit={handleSubmit}
              action='submit'
              style={{ display: 'flex', flexDirection: 'column' }}
              className={classesCreate.form} >
              <h2>Create a new activity for {comp.name} </h2> 
              <label htmlFor='type'><span> Type: </span>
              <input
                type='text'
                id='type'
                value={type}
                onChange={event => setType(event.target.value)}
                required
              /></label>

              <label htmlFor='schedule'><span> Schedule: </span>
              <input
                type='text'
                id='schedule'
                value={schedule}
                onChange={event => setSchedule(event.target.value)}
                required
              />
              </label>
                  
              <label htmlFor='image'><span> Image: </span>
              <input
                type='text'
                id='image'
                value={image}
                onChange={event => setImage(event.target.value)}
                required
              />
              </label>

              <button type='submit' className={classesCreate.accessButton}> Submit </button>
          </form>
        </div>
      </div>
    );
}
 
export default CompanyCreateActivityPage;