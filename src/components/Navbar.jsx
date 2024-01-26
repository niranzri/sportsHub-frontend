import classes from '../styles/navbar.module.css'
import { Link } from "react-router-dom";

const Navbar = () => {
 

  return (  
    <div className={classes.navbarCtn}>  
        <Link to='/' className={`${classes.link} ${classes.logo}`}>home</Link>
        <div className={classes.linksContainer}>
            <Link to='/login' className={classes.link}>login</Link> 
            <Link to='/signup' className={classes.link}>sign up</Link>   
            <Link to='/profile' className={classes.link}>profile</Link> 
           
            </div>
        </div>
);
}

export default Navbar;


