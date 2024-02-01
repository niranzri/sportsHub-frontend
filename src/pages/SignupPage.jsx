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

const [showCompanyFields, setShowCompanyFields] = useState(false);
const [companyName, setCompanyName] = useState('');
const [companyCity, setCompanyCity] = useState('');
const [companyAddress, setCompanyAddress] = useState('');
const [companyPostcode, setCompanyPostcode] = useState('');

const [isPasswordValid, setIsPasswordValid] = useState(true);
const [isEmailValid, setIsEmailValid] = useState(true);
const [isCompanyAdded, setIsCompanyAdded] = useState(false);

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
        
        formattedCompanies.push({label: 'Other', value: 'Other'});
        setCompanies(formattedCompanies)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCompanies()
  }, []) 

  const handleCompanyChange = (value) => {
    if (value && value.label === 'Other') {
      setShowCompanyFields(true);
      setCompany({ label: 'Other', value: 'Other' });
    } else if (value) {
      setShowCompanyFields(false);
      setIsCompanyAdded(true);
      setCompany(value);
    }
  }

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

  const handleAddCompany = async () => {
    if (!company?.value?._id) {
      const newCompany = {
        name: companyName,
        city: companyCity,
        address: companyAddress,
        postcode: companyPostcode
      }

    try {
      const postCompanyResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/companies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCompany),
      });
  
      if (postCompanyResponse.status === 201) {
        const newCompanyResponse = await postCompanyResponse.json();

        setCompany({label: newCompanyResponse.name, value: newCompanyResponse})
        setIsCompanyAdded(true);
        
        const fetchCompanyResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/companies/${newCompanyResponse._id}`);
        const fetchedCompany = await fetchCompanyResponse.json();


      // Updates the state with the fetched company
        setCompany({ label: fetchedCompany.name, value: fetchedCompany });
      
      } else {
        console.log("Failed to create new company");
      }
    } catch (error) {
      console.log({error, message: "Error while posting new company"})
    }
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

    if (!isCompanyAdded) {
      console.log("You need to add the company before signing up");
      return;
    }

    const credentials = { name, email, password, company};

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials),
        });

        if (response.status === 201) {
            navigate('/login')
          }

    } catch (error) {
        console.log({error, message: "Error while posting user"});
    }
  };


  return (
    <div className={classes.pageCtn}> 
      <form onSubmit={handleSubmit} className={classes.form}>
      <p> User information </p>
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
                value={company}
                getOptionLabel={selectedOption => selectedOption.label}
                onChange={handleCompanyChange}
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
        {showCompanyFields && (
          <>
          <p> Company information </p>
            <label>
              <span> Name: </span>
              <input
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
                required
              />
            </label>
            <label>
              <span> City: </span>
              <input
                value={companyCity}
                onChange={(event) => setCompanyCity(event.target.value)}
                required
              />
            </label>
            <label>
              <span> Address: </span>
              <input
                value={companyAddress}
                onChange={(event) => setCompanyAddress(event.target.value)}
                required
              />
            </label>
            <label>
              <span> Postcode: </span>
              <input
                value={companyPostcode}
                onChange={(event) => setCompanyPostcode(event.target.value)}
                required
              />
            </label>
          </>
        )}
        <div className={classes.btnCtn}>
          {showCompanyFields && (
          <button 
            type='button' 
            onClick={handleAddCompany} 
            className={classes.accessButton}> 
            Add company 
          </button>)}
          <button type='submit' 
            className={classes.accessButton}> 
            Sign Up 
          </button>
        </div>
      </form>
    </div>
 );
}
 
export default SignupPage;