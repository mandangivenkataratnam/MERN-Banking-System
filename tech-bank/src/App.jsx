import React from 'react'

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'
import Branches from './pages/Branches'
import Transactions from './pages/Transactions'
import Login from './pages/Login'

import ProtectedRoute
from './components/ProtectedRoute'

import AdminRoute
from './components/AdminRoute'

const AppLayout = () => {

  const location = useLocation()

  const hideLayout =
    location.pathname === '/login'

    const user =
JSON.parse(
  localStorage.getItem('user')
)

  return (

    <>

      {!hideLayout && <Navbar />}

      <div className='layout'>

        {!hideLayout && <Sidebar />}

        <div
          className={
            hideLayout
              ? 'login-page-content'
              : 'page-content'
          }
        >

         <Routes>

  <Route
  path='/login'
  element={
    user
    ? <Dashboard />
    : <Login />
  }
/>


  <Route
    path='/'
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />


  <Route
  path='/customers'
  element={
    <AdminRoute>
      <Customers />
    </AdminRoute>
  }
/>

<Route
  path='/branches'
  element={
    <AdminRoute>
      <Branches />
    </AdminRoute>
  }
/>


  <Route
    path='/transactions'
    element={
      <ProtectedRoute>
        <Transactions />
      </ProtectedRoute>
    }
  />

</Routes>

        </div>

      </div>

    </>

  )
}


const App = () => {

  return (

    <BrowserRouter>

      <AppLayout />

    </BrowserRouter>
  )
}

export default App