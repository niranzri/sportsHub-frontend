import { useContext, useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import classes from '../styles/form.module.css';

const LoginPage = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [isPasswordValid, setIsPasswordValid] = useState(true);
const [isEmailValid, setIsEmailValid] = useState(true);
const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

const navigate = useNavigate()
const { saveToken, setUser } = useContext(AuthContext)

const handleEmailChange = (value) => {
    setEmail(value);
    setIsLoginSuccessful(true);
    // Checks if the password is empty and hides it from display
    if (value.trim() === '') {
      setIsEmailValid(true);
    } else {
    // Checks the password format and update the state
      setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value));
    }
  }

  const handlePasswordChange = (value) => {
    setPassword(value);
    setIsLoginSuccessful(true);
    // Checks if the password is empty and hides it from display
    if (value.trim() === '') {
      setIsPasswordValid(true);
    } else {
    // Checks the password format and update the state
      setIsPasswordValid(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(value));
    }
  }

const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isPasswordValid) {
        console.log("Password does not meet the format requirements");
        return;
      }
  
    if (!isEmailValid) {
        console.log("E-mail is not valid");
        return;
      }

    setIsLoginSuccessful(true); 
    const credentials = { email, password };

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials),
        });

        if (response.status === 200) {
            // If user was logged in successully
            const parsed = await response.json()
            const user = parsed.user;
            setUser(user);
            saveToken(parsed.authToken)
            console.log({message: "user id", userId: user.userId})
            setIsLoginSuccessful(true);
            navigate(`/profile`)
          } else {
            setIsLoginSuccessful(false);
          }

    } catch (error) {
        console.log(error);
        setIsLoginSuccessful(false);
    }
};

return (
    <div className={classes.pageCtn}> 
        <form onSubmit={handleSubmit} className={classes.form}>
            <label> <span> E-mail: </span>
                <input 
                    value={email} 
                    onChange={event => handleEmailChange(event.target.value)} 
                    required/>
            </label>
            <div className={classes.notificationCtn}>
                {!isEmailValid && (
                    <div className={classes.notification}>
                    * Please provide a valid e-mail address.
                    </div>
                )}
            </div>
            <label> <span> Password: </span>
                    <input 
                    type="password"
                    value={password} 
                    onChange={event => handlePasswordChange(event.target.value)} 
                    required/>
            </label>
            <div className={classes.notificationCtn}>
                {!isPasswordValid && (
                    <div className={classes.notification}>
                    * Password must have at least 6 characters and contain at least one number, one lowercase, and one uppercase letter.
                    </div>
                )}
            </div>
            <button type='submit' className={`${classes.accessButton} ${classes.loginButton}`}> Log In </button>
            <div className={classes.notificationCtn}>
              {!isLoginSuccessful && (
                <div className={classes.notification}>
                  * No user found.
                </div>
              )}
            </div>
        </form>
        <div className={classes.textLogin}>
          <h3>Don't have an account yet?</h3>
          <div className={classes.btnCtn}>
            <button 
              type='button' 
              className={classes.accessButton}
              onClick={() => navigate('/signup')}> 
              Sign up
            </button>
          </div>
        </div>
    </div>
 );

}
 
export default LoginPage;