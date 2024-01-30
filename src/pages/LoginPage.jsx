import { useContext, useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import classes from '../styles/form.module.css';

const LoginPage = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [isRightCredentials, setIsRightCredentials] = useState(true);

const navigate = useNavigate()
const { saveToken } = useContext(AuthContext)

const handleSubmit = async (event) => {
    event.preventDefault();
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
            console.log(parsed)
            const user = parsed.user;
            saveToken(parsed.authToken)
            console.log({message: "user id", userId: user.userId})
            navigate(`/profile`)
            //navigate(`/companies/${company_.id}`) // Navigate to company profile page 
          }

    } catch (error) {
        console.log(error);
        setIsRightCredentials(false);
    }
};

return (
    <div className={classes.pageCtn}> 
    <form onSubmit={handleSubmit} className={classes.form}>
        <label> <span> E-mail: </span>
            <input 
                value={email} 
                onChange={event => setEmail(event.target.value)} 
                required/>
        </label>
        <label> <span> Password: </span>
                <input 
                type="password"
                value={password} 
                onChange={event => setPassword(event.target.value)} 
                required/>
        </label>
        {!isRightCredentials && (
            <div className={classes.notificationCtn}>
                <div className={classes.notification}>
                * Please provide a valid e-mail address.
                </div>
            </div>
          )}
        <button type='submit' className={classes.accessButton}> Log In </button>
    </form>
    <p className={classes.text}>Don't have an account yet?</p>
        <Link to={'/signup'}> <span> Sign Up </span> </Link>
    </div>
 );

}
 
export default LoginPage;