import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'
import classes from '../styles/profile.module.css';

const ProfileSection = () => {
  const { user } = useContext(AuthContext)
  //const { userId } = useParams();
  const [userInfo, setUserInfo] = useState([]);
  
  useEffect (() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/profile/${user._id}`);
        if (response.ok) {
         
          const userData = await response.json();
          setUserInfo(userData);
        
        } else {
          console.log(`Couldn't fetch the user data`);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if(user){
  fetchUserInfo()
    }
  }, [user]
  )

  console.log(userInfo)

  if (userInfo.length === 0) {
    return <div>Loading...</div>;
  }


    return (
        <>
        {userInfo && (
          <>
          <div className={classes.imageCtn}>
            <img src={userInfo.company.image} alt="Company image" className={classes.imageGym}/>
          </div>
          <div className={classes.infoCtn}>
            <h3> Employee info </h3>
            <p> {userInfo.name} </p>
            <p> {userInfo.email} </p>
            <h3> Company info </h3>
            <p> {userInfo.company.name} </p>
            <p> {userInfo.company.address} {userInfo.company.postcode} {userInfo.company.city} </p>
            </div>
          </>
        )}
        </>
    );
}
     
export default ProfileSection;