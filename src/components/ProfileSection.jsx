import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'
import classes from '../styles/profile.module.css';

const ProfileSection = () => {
  const { user, companyId } = useContext(AuthContext)
  const [userInfo, setUserInfo] = useState();
  const [company, setCompany] = useState({});
  
  useEffect (() => {
    const fetchUserInfo = async () => {
      console.log(user)
      if (user) {
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
   }
  fetchUserInfo()
  }, [user])

  const handleDeleteCompany = async () => {
    try {
      const response = await fetchWithToken(`/companies/${companyId}`, 'DELETE');
      if (response.status === 204) {
        navigate('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditCompany = async () => {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/companies/${companyId}`, {
          method: 'PUT',
          body: JSON.stringify(company),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.log(error);
      }
    }


  if (!userInfo) {
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
            <p> {userInfo.company._id}</p>
            <p> {userInfo.company.name} </p>
            <p> {userInfo.company.address} {userInfo.company.postcode} {userInfo.company.city} </p>
          </div>
          <div className={classes.buttonsCtn}>
            <button 
              type='button' 
              onClick={handleEditCompany} 
              className={classes.companyButton}> 
              Edit company 
            </button>
            <button 
              type='button' 
              onClick={handleDeleteCompany} 
              className={classes.companyButton}> 
              Delete company 
            </button>
          </div>
          </>
        )}
        </>
    );
}
     
export default ProfileSection;