import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CompanyProfilePage from './pages/CompanyProfilePage.jsx'
import CompanyActivityDetailsPage from './pages/CompanyActivityDetailsPage'
import PersonProfilePage from './pages/PersonProfilePage'
import PersonMyActivitiesPage from './pages/PersonMyActivitiesPage'
import Navbar from './components/Navbar'


function App() {
 

  return (
    <>
   <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/company/:companyId' element={<CompanyProfilePage />} />
        <Route path='/company/:activityId' element={<CompanyActivityDetailsPage />} />
        <Route path='/' element={<CompanyCreateActivityPage />} />
        <Route path='/personProfile' element={<PersonProfilePage />} />
        <Route path='/' element={<PersonMyActivitiesPage />} />
        <Route path='*' element={<h1>404 Page not found</h1>} />
        </Routes>
    </>
  )
}

export default App
