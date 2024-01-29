import { useParams } from 'react-router-dom';
import { useState} from 'react';
import classes from '../styles/profile.module.css';

const ProfileSection = () => {

    const { userId } = useParams('');
    const [user, setUser] = useState({});

    const fetchUser = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/${userId}`)
          if (response.ok) {
            const userData = await response.json()
            setUser(userData)
          } else {
            console.log(`Couldn't fetch the user data`)
          }
        } catch (error) {
          console.log(error)
        }
      }

    return (
        <>
            <h1> Hello! </h1>
        </>
    );
}
     
export default ProfileSection;