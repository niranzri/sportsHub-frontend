import classes from '../styles/navbar.module.css'
import { Link } from "react-router-dom";

const Navbar = () => {
 

  return (  
    <div className={classes.navbarCtn}>  
        <Link to='/' className={`${classes.link} ${classes.logo}`}>Home</Link>
        <div className={classes.linksContainer}>
            <Link to='/login' className={classes.link}>Login</Link> 
            <Link to='/signup' className={classes.link}>SignUp</Link>   
            {/* <Link to='/profile' className={classes.link}>profile</Link> */}
           
            </div>
        </div>
);
}

export default Navbar;


