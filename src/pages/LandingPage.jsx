import { useNavigate } from 'react-router-dom';
import classes from '../styles/landing.module.css'


const LandingPage = () => {

const navigate = useNavigate()
const handleExploreClick = () => {
    navigate('/allActivities'); 
  }; 

    return (  
        <>
            <div className={classes.hero}>
                <h1>Unleash Your Fitness Potential</h1>
                <p>Access hundreds of sports facilities and fitness classes all in one app</p>
                 <div className={classes.buttonCtn}>
                     <button type='button' onClick={handleExploreClick}>Explore</button>
            </div>
           { /* <div className={classes.content}>
                <p>More information about our site</p>
          </div> */}
            </div>
        </>
    );
}

 
export default LandingPage;