import { useState } from "react";
import { useNavigate } from 'react-router-dom'
// import { AuthContext } from "../contexts/AuthContext"

const SignupPage = () => {

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const navigate = useNavigate()

const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = { name, email, password };

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials),
        });

        if (response.status === 201) {
            // The user was created successully
            navigate('/login')
          }

    } catch (error) {
        console.log(error);
    }
};

return ( 
      
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center' }}>
        <label>Name:
            <input value={name} onChange={event => setName (event.target.value)} required/></label>
        <label>Email:
            <input value={email} onChange={event => setEmail (event.target.value)} required/></label>
        <label>Password:<input value={password} onChange={event => setPassword (event.target.value)} required/></label>
        <button type='submit'>Sign Up as User</button>
      { /* <button type='submit' style={{backgroundColor:'aqua'}}>Sign Up as Company</button> */}
    </form>
   
 );
}
 
export default SignupPage;