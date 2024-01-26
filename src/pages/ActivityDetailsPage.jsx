import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import classes from '../styles/activitiesDetails.module.css'


const ActivityDetailsPage = () => {
    
  const { activityId } = useParams('');
  const [activity, setActivity] = useState({});
  const navigate = useNavigate()

 
    const fetchActivity = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/activities/${activityId}`)
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
      <div className={classes.mainCtn}>
        <div className={classes.imageContainer}>
          <img src={activity.image} alt="Activity Image" />
        </div>
        <div className={classes.textCtn}>
          <p>{activity.type}</p>
          <p>{activity.schedule?.join(', ')}</p>
          <div className={classes.buttonCtn}>
            <button type='button' onClick={handleBackClick}>
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

 export default ActivityDetailsPage;

/* return (
    <div>
      <Navbar />
      <div className={classesArtDetailsStyle.mainCtn}>
       <div className={classesArtDetailsStyle.imageContainer}>
         <img
           src={art.img}
            alt={art.alt_text}
         />
       </div>
      <div className={classesArtDetailsStyle.textCtn}>
        <p>
          <span className={classesArtDetailsStyle.label}>Title:</span>{' '}
          {isEditing ? (
            <input
              type="text"
              value={art.title}
              onChange={(e) => onChangeHandler('title', e.target.value)}
              className={classesArtDetailsStyle.editInput}
            /> */