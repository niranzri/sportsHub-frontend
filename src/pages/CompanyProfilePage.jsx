import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import classes from '../styles/profile.module.css';
import ProfileSection from '../components/ProfileSection.jsx'

const CompanyProfilePage = () => {
    
    return (
        <div className={classes.pageCtn}>
            <div className={classes.profileCtn}>
                <ProfileSection />
            </div>
            <div className={classes.activitiesCtn}>

            </div>
        </div>
    );
}
 
export default CompanyProfilePage;