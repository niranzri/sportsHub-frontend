import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Select from 'react-select';
import classes from './styles/signup.module.css';
// import { AuthContext } from "../contexts/AuthContext"

const SignupPage = () => {

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [companies, setCompanies] = useState([]);
const [company, setCompany] = useState('');

const navigate = useNavigate()

const fetchCompanies = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/companies`)
      if (response.ok) {
        const companiesData = await response.json()
        console.log(companiesData)

        const formattedCompanies = companiesData.map(company => ({
            label: company.name,
            value: company.name,
          }));

        setCompanies(formattedCompanies)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCompanies()
  }, [])

const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = { name, email, password, company: company.name };

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

//<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center' }}>
return ( 
    <form onSubmit={handleSubmit} className={classes.form}>
        <label> Name:
            <input 
                value={name} 
                onChange={event => setName (event.target.value)} 
                required/>
        </label>
        <label> Email:
            <input 
                value={email} 
                onChange={event => setEmail (event.target.value)} 
                required/>
        </label>
        <label> Password: 
                <input 
                value={password} 
                onChange={event => setPassword (event.target.value)} 
                required/>
        </label>
        <label> Company: </label>
                <Select 
                options={companies}
                value={companies.find(option => option.value === company)}
                onChange={selectedOption => setCompany(selectedOption.name)}
                />
        <button type='submit'>Sign Up as User</button>
      { /* <button type='submit' style={{backgroundColor:'aqua'}}>Sign Up as Company</button> */}
    </form>
   
 );
}
 
export default SignupPage;