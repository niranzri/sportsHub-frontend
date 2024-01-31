import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CompanyProfilePage from './pages/CompanyProfilePage.jsx'
import CompanyActivityDetailsPage from './pages/CompanyActivityDetailsPage'
import CompanyCreateActivityPage from './pages/CompanyCreateActivityPage.jsx'
import AllActivitiesPage from './pages/AllActivitiesPage.jsx'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import ErrorPage from './pages/ErrorPage.jsx'
import ActivityDetailsPage from './pages/ActivityDetailsPage.jsx'
import './App.css'

function App() {

  return (
    <div className="wrapper">
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/profile' element={ <PrivateRoute> <CompanyProfilePage/> </PrivateRoute>} /> 
        <Route path='/companies/:companyId/:activityId' element={<PrivateRoute> <CompanyActivityDetailsPage /> </PrivateRoute>} />
        <Route path='/companies/:companyId/createActivity' element={ <PrivateRoute> <CompanyCreateActivityPage/> </PrivateRoute>} /> 
        <Route path='/allActivities' element={<AllActivitiesPage />} />
        <Route path='/activityDetails/:activityId' element={<ActivityDetailsPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

