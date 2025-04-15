import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from '@heroui/react'
import HomePage from './components/Home/Home.jsx'
import LoginPage from './components/Login/Login.jsx'
import SignupPage from './components/Signup/Signup.jsx'
import OwnerDashboard from './components/Dashboard/OwnerDashboard.jsx'
import TenantDashboard from './components/Dashboard/TenantDashboard.jsx'
import PropertyCard from './components/Property/PropertyCard.jsx'
import AddProperty from './components/Property/AddProperty.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>} >
      <Route path='' element={<HomePage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignupPage/>} />
      <Route path='/owner-dashboard' element={<OwnerDashboard/>} />
      <Route path='/tenant-dashboard' element={<TenantDashboard/>} />
      <Route path='/card' element={<PropertyCard/>} />
      <Route path='/add-property' element={<AddProperty />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <HeroUIProvider>
    <ToastProvider />
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </HeroUIProvider>
)
