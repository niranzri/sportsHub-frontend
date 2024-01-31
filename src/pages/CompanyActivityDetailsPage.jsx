import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import classes from '../styles/companyActivityDetails.module.css';
import { AuthContext } from '../contexts/AuthContext';

const CompanyActivityDetailsPage = () => {
  const { activityId } = useParams('');
  const [activity, setActivity] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedActivity, setEditedActivity] = useState({});
  const navigate = useNavigate();
  const { fetchWithToken } = useContext(AuthContext);

  const fetchActivity = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/activities/${activityId}`);
      if (response.ok) {
        const activityData = await response.json();
        setActivity(activityData);
        setEditedActivity(activityData);
      } else {
        console.log('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, [activityId]);

  const handleDelete = async () => {
    try {
      const response = await fetchWithToken(`/activities/${activityId}`, 'DELETE');
      if (response.status === 204) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackClick = () => {
    navigate('/allActivities');
  };

  const handleEditSaveClick = async () => {
    if (editMode) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/activities/${activityId}`, {
          method: 'PUT',
          body: JSON.stringify(editedActivity),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
    setEditMode(!editMode);
  };

  const isLoggedIn = true;

  const renderSchedule = () => {
    if (activity.schedule && activity.schedule.includes('Monday')
      && activity.schedule.includes('Tuesday') && activity.schedule.includes('Wednesday')
      && activity.schedule.includes('Thursday') && activity.schedule.includes('Friday')
      && activity.schedule.includes('Saturday') && activity.schedule.includes('Sunday')) {
      return 'Every day from Monday to Sunday';
    }
    return activity.schedule?.join(', ');
  };

  return activity ? (
    <>
      <div className={classes.mainCtn}>
        <div className={classes.imageContainer}>
          <img src={activity.image} alt="Activity Image" />
        </div>
        <div className={classes.textCtn}>
          {editMode ? (
            <>
              <input
                type="text"
                value={editedActivity.type}
                onChange={(e) => setEditedActivity({ ...editedActivity, type: e.target.value })}
                className={classes.editInput}
              />
              <input
                type="text"
                value={editedActivity.schedule}
                onChange={(e) => setEditedActivity({ ...editedActivity, schedule: e.target.value })}
                className={classes.editInput}
              />
            </>
          ) : (
            <>
              <p>{activity.type}</p>
              <p>{renderSchedule()}</p>
            </>
          )}
          {isLoggedIn && (
            <div className={classes.buttonCtn}>
              {editMode ? (
                <button type="button" onClick={handleEditSaveClick}>
                  Save
                </button>
              ) : (
                <button type="button" onClick={handleEditSaveClick}>
                  Edit
                </button>
              )}
              <button type="button" onClick={handleDelete}>
                Delete
              </button>
              <button type="button" onClick={handleBackClick}>
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  ) : (
    <h2>Loading...</h2>
  );
};

export default CompanyActivityDetailsPage;





