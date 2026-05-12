import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaEnvelope, FaLock, FaUniversity } from 'react-icons/fa'
import '../styles/login.css'

const Login = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'https://mern-banking-system-mvxw.onrender.com/auth/login',
        formData
      )

      localStorage.setItem(
        'user',
        JSON.stringify(response.data)
      )

      navigate('/')

    } catch (error) {
      setError('Invalid Email or Password')
    }
  }

  return (
    <div className='login-page'>

      <div className='login-container'>

        {/* LEFT */}

        <div className='login-left'>

          <div className='bank-icon'>
            <FaUniversity />
          </div>

          <h1>Welcome Back</h1>

          <p>
            Securely access your
            Tech Bank dashboard
          </p>

        </div>

        {/* RIGHT */}

        <div className='login-right'>

          <h2 className='login-title'>
            Login Account
          </h2>

          <p className='login-subtitle'>
            Enter your credentials
            to continue
          </p>

          {error && (
            <p className='login-error'>
              {error}
            </p>
          )}

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className='input-group'>

              <label>Email</label>

              <div className='input-box'>

                <FaEnvelope />

                <input
                  type='email'
                  name='email'
                  placeholder='Enter your email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div className='input-group'>

              <label>Password</label>

              <div className='input-box'>

                <FaLock />

                <input
                  type='password'
                  name='password'
                  placeholder='Enter your password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <button
              type='submit'
              className='login-btn'
            >
              Login
            </button>

          </form>

          {/* DEMO */}

          <div className='demo-login'>

            <h4>Demo Login</h4>

            <p>
              Admin:
              admin@gmail.com
            </p>

            <p>
              Password:
              admin123
            </p>

            <br />

            <p>
              Customer:
              customer@gmail.com
            </p>

            <p>
              Password:
              customer123
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Login