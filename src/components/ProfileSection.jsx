import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'
import classes from '../styles/profile.module.css';

const ProfileSection = () => {
  //const { user } = useContext(AuthContext)
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState([]);
  const [company, setCompany] = useState([]);

  //console.log(user)

  //if (!user) {
  //  return null; 
  //}
  
  useEffect (() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/profile/${userId}`);
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


  fetchUserInfo()}, [userId]
  )

  console.log(userInfo)

    return (
        <>
            <h1> {userInfo.name} </h1>
            <h3> {userInfo.company.name} </h3>
        </>
    );
}
     
export default ProfileSection;