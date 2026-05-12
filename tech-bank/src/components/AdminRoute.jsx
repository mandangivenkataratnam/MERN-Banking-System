import React from 'react'

import {Navigate} from 'react-router-dom'

const AdminRoute = ({
  children
}) => {

  const user =
    JSON.parse(
      localStorage.getItem('user')
    )

  if (!user) {
    return <Navigate to='/login' />
  }

  if (
    user.role
    .toLowerCase() !== 'admin'
  ) {
    return <Navigate to='/' />
  }

  return children
}

export default AdminRoute