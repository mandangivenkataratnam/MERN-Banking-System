import React from 'react'

import {NavLink, useNavigate} from 'react-router-dom'

import {
  FaHome,
  FaUsers,
  FaCodeBranch,
  FaExchangeAlt,
  FaSignOutAlt
} from 'react-icons/fa'

import '../styles/sidebar.css'

const Sidebar = () => {

  const navigate = useNavigate()

  const user = JSON.parse( localStorage.getItem('user'))

  const role = user?.role?.toLowerCase()


  const handleLogout = () => {
    localStorage.removeItem(
      'user'
    )
    navigate('/login')
  }


  return (
    <div className='sidebar'>

      {/* LOGO */}
      <div className='sidebar-header'>
        <img
          src='https://cdn-icons-png.flaticon.com/512/2830/2830284.png'
          alt='Bank Logo'
          className='bank-logo'
        />

        <h2 className='sidebar-title'>
          Tech Bank
        </h2>
      </div>


      {/* LINKS */}
      <div className='sidebar-links'>
        <NavLink
          to='/'
          className='sidebar-link'
        >

          <FaHome />

          <span>Dashboard</span>
        </NavLink>
        {
          role === 'admin' && (
            <>
              <NavLink
                to='/customers'
                className='sidebar-link'
              >
                <FaUsers />
                <span>Customer</span>
              </NavLink>


              <NavLink
                to='/branches'
                className='sidebar-link'
              >

                <FaCodeBranch />

                <span>Branches</span>

              </NavLink>
            </>
          )
        }


        <NavLink
          to='/transactions'
          className='sidebar-link'
        >

          <FaExchangeAlt />

          <span>Transactions</span>

        </NavLink>
      </div>


      {/* LOGOUT */}

      <div className='sidebar-bottom'>

        <button
          className='logout-btn-sidebar'
          onClick={handleLogout}
        >

          <FaSignOutAlt />

          <span>Logout</span>

        </button>
      </div>
    </div>
  )
}

export default Sidebar