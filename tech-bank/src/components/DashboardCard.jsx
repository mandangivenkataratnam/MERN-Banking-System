import React from 'react'
import {
  FaUsers,
  FaCodeBranch,
  FaExchangeAlt,
  FaUserTie
} from 'react-icons/fa'

const DashboardCard = ({ title, value }) => {
  const getIcon = () => {
    switch(title) {
      case 'Customers':
        return <FaUsers />

      case 'Branches':
        return <FaCodeBranch />

      case 'Transactions':
        return <FaExchangeAlt />

      case 'Employees':
        return <FaUserTie />

      default:
        return null
    }
  }

  return (
    <div className='dashboard-card'>
      <div className='card-top'>
        <div className='card-icon'>
          {getIcon()}
        </div>
      </div>

      <div className='card-content'>
        <h3>{title}</h3>
        <h2>{value}</h2>
      </div>
    </div>
  )
}

export default DashboardCard