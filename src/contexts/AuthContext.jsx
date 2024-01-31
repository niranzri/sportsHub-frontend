import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [user, setUser] = useState()
  const [companyId, setCompanyId] = useState()
  const navigate = useNavigate();


  let isLogin = false;

  const saveToken = tokenFromLogin => {
    setToken(tokenFromLogin)
    setIsAuthenticated(true)
    window.localStorage.setItem('authToken', tokenFromLogin)
  }

  const logout = () => {
    setToken()
    setIsAuthenticated(false)
    window.localStorage.removeItem('authToken')
    setUser(null);
    navigate('/')
  }

  const verifyToken = async tokenToVerify => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${tokenToVerify}`,
        },
      })
      if (response.status === 200) {
        isLogin = true;
        setToken(tokenToVerify)
        setIsAuthenticated(true)
        setIsLoading(false)
        
        const userData = await response.json();
        setUser(userData);
        console.log(userData)
       let userId = userData._id
       setCompanyId(userData.company)
       console.log(userData.company)
        console.log(userId)

        
      }
      if (response.status === 401) {
        throw new Error('Invalid Token')
      }
    } catch (error) {
      setIsLoading(false)
      window.localStorage.removeItem('authToken')
    }
  }

  useEffect(() => {
    const tokenFromLocalStorage = window.localStorage.getItem('authToken')
    if (tokenFromLocalStorage) {
      verifyToken(tokenFromLocalStorage)
    } else {
      setIsLoading(false)
    }
  }, [])

  // Function to use for protected API endppoints
  const fetchWithToken = async (endpoint, method = 'GET', payload) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      return response
    } catch (error) {
      console.error('Something went wrong with the fetchWithToken', error)
    }
  }
 

  return (
    <AuthContext.Provider value={{ isLoading, isAuthenticated, saveToken, logout, fetchWithToken, verifyToken, setUser, user, companyId }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider

