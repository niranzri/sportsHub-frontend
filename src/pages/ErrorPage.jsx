import React from 'react';

import classes from '../styles/error.module.css'
import { Link } from 'react-router-dom';


const ErrorPage = () => {
  return (
   
     <div className={classes.mainCtn}>
      <h1 className={classes.h1Text}> Oops! </h1>
      <h1 className={classes.text404}> 404 - Page not found </h1>
      <p className={classes.text}> The page you looking for might have been removed, <br/>
      had its name changed or it is temporarily unavailble.
       </p>
       <Link to='/' className={classes.link}>
        <p>Go to Home Page</p>
       </Link>
     </div>
   
  );
};

export default ErrorPage;