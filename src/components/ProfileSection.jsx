import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'
import classes from '../styles/profile.module.css';

const ProfileSection = () => {
  const { user } = useContext(AuthContext)
  const [userInfo, setUserInfo] = useState();
  const [companyInfo, setCompanyInfo] = useState(null);

  console.log(user)

  if (!user) {
    return null; 
  }
  
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

  
  useEffect(() => {
    fetchUserInfo()
  }, [])
  

    return (
        <>
            <h1> {userInfo.name} </h1>
            <h2> {userInfo.company}</h2>
        </>
    );
}
     
export default ProfileSection;