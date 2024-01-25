import classes from '../styles/landing.module.css'

const LandingPage = () => {
    return (  
        <>
            <div className={classes.hero}>
                <h1>Unleash Your Fitness Potential</h1>
                <p>Access hundreds of sports facilities and fitness classes all in one app</p>
            </div>
            <div className={classes.content}>
                <p>More information about our site</p>
            </div>
        </>
    );
}

 
export default LandingPage;