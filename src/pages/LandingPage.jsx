import { useNavigate } from 'react-router-dom';
import classes from '../styles/landing.module.css';
import sportsImage from '../pictures/lpsports.png'
import mapsImage from '../pictures/maps.png'


const LandingPage = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/allActivities');
  };

  return (
    <div className={classes.pageCtn}>
      <div className={classes.hero}>
        <h1>Unleash Your Fitness Potential</h1>
        <p>Access hundreds of sports facilities and fitness classes all in one app.</p>
        <div className={classes.buttonCtn}>
          <button type='button' onClick={handleExploreClick}>Explore</button>
        </div>
      </div>
      <div className={classes.bellowHero}>
        <div className={classes.textContent}>
          <h1>Endless <br/>  variety</h1>
          <p>Access hundreds of sports facilities and fitness classes all in one app</p>
            </div>
          <div className={classes.textContent}>
          <h1>Discover something new</h1>
          <p>Sick of the same old? You will never get bored with us. Discover new activities every day.</p>
             </div>
         <div className={classes.textContent}>
          <h1>Combine activities</h1>
          <p>Like to switch things up? A multi-sport plan is the way to go.</p>
          </div>
        </div>

      <div className={classes.featureSection}>
        <div className={classes.imageContainer}>
          <img src={sportsImage} alt="Feature" />
        </div>
        <div className={classes.textContent}>
          <h2>Get Active wherever you want!</h2>
          <p>Some more text here maybe?</p> 
        </div>
      </div>
       <div className={classes.mapsContainer}>
       <img src={mapsImage} alt="Maps" />
        <div className={classes.infoBox}>
      <h1>Discover your possibilities</h1>
      <h2>See all the venues offering your favorite sports and wellness activities. For now only in Berlin, utrecht and Nantes. European-wide coming soon!</h2>
      <div className={classes.buttonCtn}>
        <button type='button' onClick={handleExploreClick}>Explore</button>
      </div>
    </div>
  </div>
</div>
   
      
    
  );
}

export default LandingPage;


{ /* <div className={classes.bellowHero}>
<h2>Get access to the top gyms, sports & wellness offers in Berlin, Utrecht and Nantes. Are you ready?</h2>
</div> */}