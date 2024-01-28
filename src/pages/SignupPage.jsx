import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import classes from '../styles/form.module.css';
import Select from 'react-select';
// import { AuthContext } from "../contexts/AuthContext"

const SignupPage = () => {

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [companies, setCompanies] = useState([]);
const [company, setCompany] = useState([]); // should not be an array

const [showCompanyFields, setShowCompanyFields] = useState(false);
const [companyName, setCompanyName] = useState('');
const [companyCity, setCompanyCity] = useState('');
const [companyAddress, setCompanyAddress] = useState('');
const [companyPostcode, setCompanyPostcode] = useState('');

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
        
        formattedCompanies.push({label: 'Other'}); // ADDED 
        setCompanies(formattedCompanies)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCompanies()
  }, [company])

  //ADDED
  const handleCompanyChange = async (selectedOption) => {
    if (selectedOption && selectedOption.label === 'Other') {
      setShowCompanyFields(true);
    } else {
      setShowCompanyFields(false);
      setCompany(selectedOption);
    }
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  if (!company.value.hasOwnProperty("_id")) {
    const newCompany = {
      name: companyName,
      city: companyCity,
      address: companyAddress,
      postcode: companyPostcode
    }
    setCompany({value: newCompany})
    console.log("The newly created company is", company)

    const postCompanyResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/companies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCompany),
    });

    if (postCompanyResponse.status === 201) {
      const newCompany = await postCompanyResponse.json();
      console.log("New company", newCompany); // defined

    } else {
      console.log("Failed to create new company");
    }

  }

    console.log("The company value is:", company.value) // undefined
    const credentials = { name, email, password, company: company.value };

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
                onChange={event => setEmail(event.target.value)} 
                required/>
        </label>
        <label> <span> Password: </span>
                <input 
                value={password} 
                onChange={event => setPassword(event.target.value)} 
                required/>
        </label>
        <label> <span> Company: </span> 
                <div className={classes.companyCtn}>
                <Select 
                options={companies}
                value={companies.find(selectedOption => selectedOption.value === company)}
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
            <label>
              <span> Company Name: </span>
              <input
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
                required
              />
            </label>
            <label>
              <span> Company City: </span>
              <input
                value={companyCity}
                onChange={(event) => setCompanyCity(event.target.value)}
                required
              />
            </label>
            <label>
              <span> Company Address: </span>
              <input
                value={companyAddress}
                onChange={(event) => setCompanyAddress(event.target.value)}
                required
              />
            </label>
            <label>
              <span> Company Postcode: </span>
              <input
                value={companyPostcode}
                onChange={(event) => setCompanyPostcode(event.target.value)}
                required
              />
            </label>
          </>
        )}
        <button type='submit' className={classes.accessButton}> Sign Up </button>
    </form>
    </div>
 );
}
 
export default SignupPage;