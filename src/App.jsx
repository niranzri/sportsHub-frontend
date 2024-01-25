import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CompanyProfilePage from './pages/CompanyProfilePage.jsx'
import CompanyActivityDetailsPage from './pages/CompanyActivityDetailsPage'
import CompanyCreateActivityPage from './pages/CompanyCreateActivityPage.jsx'
import PersonProfilePage from './pages/PersonProfilePage'
import PersonMyActivitiesPage from './pages/PersonMyActivitiesPage'
import Navbar from './components/Navbar'


function App() {
 

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/company/:companyId' element={<CompanyProfilePage />} />
        <Route path='/companies/:companyId/:activityId' element={<CompanyActivityDetailsPage />} />
        <Route path='/companies/:companyId/createActivity' element={<CompanyCreateActivityPage />} /> 
        <Route path='/myProfile' element={<PersonProfilePage />} />
        <Route path='/myActivities' element={<PersonMyActivitiesPage />} />
        <Route path='*' element={<h1>404 Page not found</h1>} />
      </Routes>
    </>
  )
}

export default App
