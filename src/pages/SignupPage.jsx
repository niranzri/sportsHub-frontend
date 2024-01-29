import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import classes from '../styles/form.module.css';
import Select from 'react-select';

const SignupPage = () => {

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [companies, setCompanies] = useState([]);
const [company, setCompany] = useState(null);

const [isPasswordValid, setIsPasswordValid] = useState(true);
const [isEmailValid, setIsEmailValid] = useState(true);

const navigate = useNavigate()

  const fetchCompanies = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/companies`)
      if (response.ok) {
        const companiesData = await response.json()
        console.log(companiesData)

        const formattedCompanies = companiesData.map(company => ({
            label: company.name,
            value: company,
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

  const handleEmailChange = (value) => {
    setEmail(value);
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

    //console.log("Selected Company:", company.value); 
    const credentials = { name, email, password, company: company.value };
    console.log(credentials)

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
        console.log({error, message: "Error while posting user"});
    }
  };

  return (
    <div className={classes.pageCtn}> 
      <form onSubmit={handleSubmit} className={classes.form}>
        <label> <span> Name: </span>
          <input 
                value={name} 
                onChange={event => setName(event.target.value)} 
                required/>
        </label>
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
        <label> <span> Company: </span> 
                <div className={classes.companyCtn}>
                <Select 
                options={companies}
                value={companies.find(selectedOption => selectedOption.value === company)}
                getOptionLabel={selectedOption => selectedOption.label}
                onChange={selectedOption => setCompany(selectedOption)}
                menuPosition="fixed"
                styles={{
                    container: (provided) => ({
                        ...provided,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        padding: '0',
                        margin: '0',
                        width: '100%',
                        cursor: 'pointer',
                    }),
                    input: (provided) => ({
                        ...provided,
                        flex: 1, 
                        display: 'flex',
                        fontSize: '14px',
                      }),
                    control: (provided) => ({
                        ...provided,
                        width: '100%', 
                        borderRadius: '4px', 
                        border: '1px solid #ccc', 
                      }),
                      menu: (provided) => ({
                        ...provided,
                        borderRadius: '4px', 
                        border: '1px solid #ccc', 
                      }),
                }}
                />
                </div>
        </label>
        <button type='submit' className={classes.accessButton}> Sign Up </button>
      </form>
    </div>
 );
}
 
export default SignupPage;