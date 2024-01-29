import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import classes from '../styles/navbar.module.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (  
    <div className={classes.navbarCtn}>  
      <Link to='/' className={`${classes.link} ${classes.logo}`}>home</Link>
      <div className={classes.linksContainer}>
        {isAuthenticated ? (
          <>
            <Link to='/profile' className={classes.link}>profile</Link>
            <button onClick={logout} className={`${classes.link} ${classes.logoutButton}`}>log out</button>
          </>
        ) : (
          <>
            <Link to='/login' className={classes.link}>log in</Link>
            <Link to='/signup' className={classes.link}>sign up</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
