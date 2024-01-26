import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import classes from '../styles/signup.module.css';
import Select from 'react-select';
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
    const credentials = { name, email, password, company };

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
    <div className={classes.pageCtn}> 
    <form onSubmit={handleSubmit} className={classes.form}>
        <label> <span> Name: </span>
            <input 
                value={name} 
                onChange={event => setName (event.target.value)} 
                required/>
        </label>
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
        <label> <span> Company: </span> 
                <Select 
                options={companies}
                value={companies.find(option => option.value === company)}
                onChange={selectedOption => setCompany(selectedOption.name)}
                styles={{
                    input: (provided) => ({
                        ...provided,
                        flex: 1, 
                        width: '100%'// Input takes the remaining space
                      }),
                    control: (provided) => ({
                        ...provided,
                        width: '100%', 
                        height: '50%', // Adjust height as needed
                        display: 'flex',
                        textAlign: 'left',
                        marginLeft: '10%',
                        borderRadius: '4px', // Match the border radius of other inputs
                        border: '1px solid #ccc', // Match the border style of other inputs
                        boxShadow: 'none', // Remove box-shadow
                      }),
                      menu: (provided) => ({
                        ...provided,
                        borderRadius: '4px', // Optional: Match the border radius of other inputs
                        border: '1px solid #ccc', // Optional: Match the border style of other inputs
                        boxShadow: 'none', // Optional: Remove box-shadow
                      }),
                }}
                />
        </label>
        <button type='submit'>Sign Up as User</button>
      { /* <button type='submit' style={{backgroundColor:'aqua'}}>Sign Up as Company</button> */}
    </form>
    </div>
 );
}
 
export default SignupPage;