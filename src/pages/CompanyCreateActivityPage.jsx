
import { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import classesCreate from '../styles/createActivity.module.css'

const CompanyCreateActivityPage = () => {
    const { companyId } = useParams();
    const [type, setType] = useState('')
    const [schedule, setSchedule] = useState([])
    const [image, setImage] = useState('')
    const { fetchWithToken } = useContext(AuthContext)

   
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
    return ( 
        <>
        <div className={classesCreate.mainCtn}>
    <h1>Create an activity</h1> 
    <form
        onSubmit={handleSubmit}
        action='submit'
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label htmlFor='type'>Type:</label>
        <input
          type='text'
          id='type'
          value={type}
          onChange={event => setType(event.target.value)}
        />

        <label htmlFor='schedule'>Schedule:</label>
        <input
          type='text'
          id='schedule'
          value={schedule}
          onChange={event => setSchedule(event.target.value)}
        />
            
        <label htmlFor='image'>Image:</label>
        <input
          type='text'
          id='image'
          value={image}
          onChange={event => setImage(event.target.value)}
        />
        {/* <label htmlFor='company'>Company:</label>
        <input
          type='text'
          id='company'
          value={company}
          onChange={event => setCompanie(company)}
    />*/}
       
        <button type='submit'>SUBMIT</button>
      </form>
    </div>
    </>
    );
}
 
export default CompanyCreateActivityPage;