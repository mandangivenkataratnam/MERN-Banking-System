import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaUsers, FaSearch, FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
import '../styles/customers.css'

const Customers = () => {

  const [customers, setCustomers] = useState([])
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {

    try {

      const response = await axios.get(
        'https://mern-banking-system-mvxw.onrender.com/customers'
      )

      setCustomers(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      if (!formData.name || !formData.email) {

        alert('Please fill all fields')
        return
      }

      if (editingId) {

        await axios.put(
          `https://mern-banking-system-mvxw.onrender.com/customers/${editingId}`,
          formData
        )

      } else {

        await axios.post(
          'https://mern-banking-system-mvxw.onrender.com/customers',
          formData
        )
      }

      fetchCustomers()

      setShowModal(false)
      setEditingId(null)

      setFormData({
        name: '',
        email: ''
      })

    } catch (error) {

      console.log(error)
      alert('Customer not saved')
    }
  }

  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `https://mern-banking-system-mvxw.onrender.com/customers/${id}`
      )

      fetchCustomers()

    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = (customer) => {

    setEditingId(customer._id)

    setFormData({
      name: customer.name,
      email: customer.email
    })

    setShowModal(true)
  }

  const filteredCustomers = customers.filter((item) =>
    item.name
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (

    <div className='customers-page'>

      {/* HEADER */}

      <div className='customers-header'>

        <div>
          <h1 className='customers-title'>
            Customers
          </h1>

          <p className='customers-subtitle'>
            Manage customer accounts
          </p>
        </div>

        <button
          className='add-customer-btn'
          onClick={() => {

            setShowModal(true)
            setEditingId(null)

            setFormData({
              name: '',
              email: ''
            })
          }}
        >
          + Add Customer
        </button>

      </div>

      {/* STATS */}

      <div className='customer-stats-card'>

        <div className='stats-icon'>
          <FaUsers />
        </div>

        <div>
          <h3>Total Customers</h3>
          <h2>{customers.length}</h2>
        </div>

      </div>

      {/* SEARCH */}

      <div className='search-box'>

        <FaSearch />

        <input
          type='text'
          placeholder='Search customers...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* TABLE */}

      <div className='customers-table-container'>

        <table>

          <thead>

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredCustomers.map((customer) => (

              <tr key={customer._id}>

                <td>{customer.name}</td>

                <td>{customer.email}</td>

                <td>

                  <div className='action-buttons'>

                    <button
                      className='edit-btn'
                      onClick={() => handleEdit(customer)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className='delete-btn'
                      onClick={() => handleDelete(customer._id)}
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* MODAL */}

      {showModal && (

        <div className='customer-modal-overlay'>

          <div className='customer-modal'>

            <div className='modal-header'>

              <h2>
                {editingId
                  ? 'Edit Customer'
                  : 'Add Customer'}
              </h2>

              <button
                className='close-modal-btn'
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className='modal-input-group'>

                <label>Name</label>

                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className='modal-input-group'>

                <label>Email</label>

                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <button
                type='submit'
                className='save-customer-btn'
              >
                {editingId
                  ? 'Update Customer'
                  : 'Save Customer'}
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}

export default Customers