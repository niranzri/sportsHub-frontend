import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'
import classes from '../styles/profile.module.css';


const ProfileSection = () => {
  const { user } = useContext(AuthContext)
  const [userInfo, setUserInfo] = useState();
  // variables edit and delete buttons
  const [editedCompany, setEditedCompany] = useState({});
  const [isEditClicked, setIsEditClicked] = useState(false);
  
  useEffect (() => {
    const fetchUserInfo = async () => {
      console.log(user)
      if (user) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/profile/${user._id}`);
          if (response.ok) {
            const userData = await response.json();
            setUserInfo(userData);
            setEditedCompany({
              address: userData.company.address,
              postcode: userData.company.postcode,
              city: userData.company.city,
            });
          } else {
            console.log(`Couldn't fetch the user data from server`);
          }
        } catch (error) {
          console.log(error);
        }
     }
   }
  fetchUserInfo()
  }, [user])

  console.log("the edited company is:", editedCompany)

  // Updates company
  const handleEditCompany = async () => {
    if (isEditClicked) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/companies/${userInfo.company._id}`, {
          method: 'PUT',
          body: JSON.stringify(editedCompany),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setCompany(editedCompany);

      } catch (error) {
        console.log("Couldn't edit company, sorry", error);
      }
    }
    setIsEditClicked(!isEditClicked);
    }



  if (!userInfo) {
    return <div> Loading...</div>;
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
              {isEditClicked ? (
              <>
                <input
                  type="text"
                  value={editedCompany.name}
                  onChange={(event) => setEditedCompany({ ...editedCompany, name: event.target.value })}
                />
                <input
                  type="text"
                  value={editedCompany.address}
                  onChange={(event) => setEditedCompany({ ...editedCompany, address: event.target.value })}
                />
                <input
                  type="text"
                  value={editedCompany.postcode}
                  onChange={(event) => setEditedCompany({ ...editedCompany, postcode: event.target.value })}
                />
                <input
                  type="text"
                  value={editedCompany.city}
                  onChange={(event) => setEditedCompany({ ...editedCompany, city: event.target.value })}
                />
              </>
            ) : (
              <>
                <p> {userInfo.company.name} </p>
                <p> {userInfo.company.address} {userInfo.company.postcode} {userInfo.company.city} </p>
              </>
            )}
          </div>
          {isEditClicked ? (
              <button
                type='button'
                onClick={handleEditCompany}
                className={classes.companyButton}>
                Save changes
              </button>
            ) : (
              <button
                type='button'
                onClick={() => setIsEditClicked(true)}
                className={classes.companyButton}>
                Edit company information
              </button>
            )}
          </>
        )}
        </>
    );
}
     
export default ProfileSection;