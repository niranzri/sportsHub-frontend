import { useContext, useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

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
            navigate('/')
            // navigate('/') // change navigation once we have the routes figured out
          }

    } catch (error) {
        console.log(error);
    }
};

return ( 
    <>
    <form onSubmit={handleSubmit}  style={{ display: 'flex', flexDirection: 'column' }}>
        <label>Email:
            <input value={email} onChange={event => setEmail (event.target.value)} required/></label>
        <label>Password:
            <input value={password} onChange={event => setPassword (event.target.value)} required/></label>
        <button type='submit' style={{backgroundColor:'aqua'}}>Login</button>
    </form>
        <p>Don't have an account yet?</p>
        <Link to={'/signup'}> Sign Up</Link>
    </>
 );
}
 
export default LoginPage;