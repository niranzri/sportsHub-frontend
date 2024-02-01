import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classes from '../styles/activitiesDetails.module.css';

const ActivityDetailsPage = () => {
  const { activityId } = useParams('');
  const [activity, setActivity] = useState({});
  const [company, setCompany] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivityAndCompany = async () => {
      try {
        const activityResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/activities/${activityId}`);
        if (!activityResponse.ok) {
          throw new Error('Failed to fetch activity');
        }
        const activityData = await activityResponse.json();
        setActivity(activityData);

        setCompany(activityData.company);
      } catch (error) {
        console.error(error);
      }
    };

    fetchActivityAndCompany();
  }, [activityId]);

  const handleBackClick = () => {
    navigate('/allActivities');
  };

  const renderSchedule = () => {
    if (activity.schedule && activity.schedule.includes('Monday')
      && activity.schedule.includes('Tuesday') && activity.schedule.includes('Wednesday')
      && activity.schedule.includes('Thursday') && activity.schedule.includes('Friday')
      && activity.schedule.includes('Saturday') && activity.schedule.includes('Sunday')) {
      return 'Every day from Monday to Sunday';
    }
    return activity.schedule?.join(', ');
  };

  return (
    <>
    <div className={classes.pageCtn}>
      <div className={classes.mainCtn}>
        <div className={classes.imageContainer}>
          <img src={activity.image} alt="Activity Image" />
        </div>
        <div className={classes.textCtn}>
          <h2>{activity.type}</h2>
          <p>{renderSchedule()}</p>
          <div className={classes.textCtn}>
            <p>Company: {company.name}</p>
            <p>City: {company.city}</p>
            <p>Address: {company.address}</p>
          </div>
          <div className={classes.buttonCtn}>
            <button type='button' onClick={handleBackClick}>
              Back
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default ActivityDetailsPage;