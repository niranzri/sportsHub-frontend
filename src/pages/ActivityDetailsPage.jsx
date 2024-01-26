import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'


const ActivityDetailsPage = () => {
  const { activityId } = useParams('');
  const [activity, setActivity] = useState({});
  const navigate = useNavigate()

 
    const fetchActivity = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/activityDetails/${activityId}`)
        if (response.ok) {
          const activityData = await response.json()
          setActivity(activityData)
        } else {
          console.log('Something went wrong')
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => { fetchActivity()
  }, [activityId])

  const handleBackClick = () => {
    navigate('/allActivities'); 
  };


  return (
    <>
      <h1>Activity Details</h1>
      <p>{activity.type}</p>
      <p>{activity.scheduale}</p>
      <button type='button' onClick={handleBackClick}>
        Back
      </button>
          
      </>

  )
}

export default ActivityDetailsPage;
