import { useState } from "react";
import { Link } from "react-router-dom"
const LoginPage = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

return ( 
    <>
    <form  style={{ display: 'flex', flexDirection: 'column' }}>
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