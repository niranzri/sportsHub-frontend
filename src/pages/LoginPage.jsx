import { useContext, useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import classes from '../styles/form.module.css';

const LoginPage = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

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
            saveToken(parsed.authToken)
            navigate('/') // Navigate to user page - currently '/companies/:companyId', but I would do /:userId
          }

    } catch (error) {
        console.log(error);
    }
};

return (
    <div className={classes.pageCtn}> 
    <form onSubmit={handleSubmit} className={classes.form}>
        <label> <span> E-mail: </span>
            <input 
                value={email} 
                onChange={event => setEmail (event.target.value)} 
                required/>
        </label>
        <label> <span> Password: </span>
                <input 
                value={password} 
                onChange={event => setPassword (event.target.value)} 
                required/>
        </label>

        <button type='submit' className={classes.accessButton}> Log In </button>
    </form>
    <p className={classes.text}>Don't have an account yet?</p>
        <Link to={'/signup'}> <span> Sign Up </span> </Link>
    </div>
 );

}
 
export default LoginPage;