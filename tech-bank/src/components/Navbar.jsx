import React, { useEffect, useState } from 'react'

import '../styles/navbar.css'

import {
  FaBell,
  FaChevronDown,
  FaSignOutAlt
} from 'react-icons/fa'

import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: '',
    role: '',
    image: ''
  })

  const [showDropdown, setShowDropdown] = useState(false)


  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem('user')
    )

    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    navigate('/login')
  }

  return (
    <nav className='navbar'>

      {/* LEFT */}
      <div className='navbar-left'>
        <h2 className='logo'>
          Tech Bank
        </h2>
      </div>

      {/* RIGHT */}
      <div className='navbar-right'>

        {/* NOTIFICATION */}
        <div className='notification-icon'>
          <FaBell />
          <span className='notification-badge'>3</span>
        </div>

        {/* PROFILE */}
        <div className='profile-wrapper'>
          <div
            className='profile-section'
            onClick={() =>
              setShowDropdown(
                !showDropdown
              )
            }
          >

            <img
              src={
                user.image ||
                '/customer.jpg'
              }
              alt='Profile'
              className='profile-image'
            />

            <div className='profile-details'>
              <h4>
                 {
                    user.name
                    ? user.name.charAt(0).toUpperCase() +
                     user.name.slice(1)
                     : 'Guest'
              }
               </h4>

              <p>
                {
                  user.role === 'Admin'
                  ? 'Admin'
                  : 'Customer'
                }
              </p>
            </div>

            <FaChevronDown className='dropdown-icon'/>
          </div>


          {/* DROPDOWN */}
          {
            showDropdown && (
              <div className='profile-dropdown'>
                <div className='dropdown-user-info'>
                  <img
                    src={
                      user.image ||
                      '/customer.jpg'
                    }
                    alt='Profile'
                  />
                  <div>
                    <h4>
                     {
                        user.name
                        ? user.name.charAt(0).toUpperCase() +
                        user.name.slice(1)
                        : 'Guest'
                }
                    </h4>

                    <p>
                      {
                        user.role
                      }
                    </p>

                  </div>
                </div>

                <button
                  className='logout-dropdown-btn'
                  onClick={handleLogout}
                >
                  <FaSignOutAlt />
                  Logout
                </button>

              </div>
            )
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar