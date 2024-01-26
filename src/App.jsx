import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CompanyProfilePage from './pages/CompanyProfilePage.jsx'
import CompanyActivityDetailsPage from './pages/CompanyActivityDetailsPage'
import CompanyCreateActivityPage from './pages/CompanyCreateActivityPage.jsx'
import AllActivitiesPage from './pages/AllActivitiesPage.jsx'
import PersonProfilePage from './pages/PersonProfilePage'
import PersonMyActivitiesPage from './pages/PersonMyActivitiesPage'
import Navbar from './components/Navbar'
import ErrorPage from './pages/ErrorPage.jsx'


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/companies/:companyId' element={<CompanyProfilePage />} />
        <Route path='/companies/:companyId/:activityId' element={<CompanyActivityDetailsPage />} />
        <Route path='/companies/:companyId/createActivity' element={<CompanyCreateActivityPage />} /> 
        <Route path='/allActivities' element={<AllActivitiesPage />} />
        <Route path='/activityDetails' element={<ActivityDetailsPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App

        /*
<Route path='/myProfile' element={<PersonProfilePage />} />
<Route path='/myActivities' element={<PersonMyActivitiesPage />} />*/