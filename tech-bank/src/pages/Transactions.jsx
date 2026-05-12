import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {
  FaExchangeAlt,
  FaArrowUp,
  FaArrowDown,
  FaSearch,
  FaTimes,
  FaEdit,
  FaTrash,
} from 'react-icons/fa'

import '../styles/transactions.css'

const Transactions = () => {
  const [transactions, setTransactions] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState('')

  const [formData, setFormData] = useState({
    sender: '',
    receiver: '',
    amount: '',
    type: 'Credit',
  })

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        'https://mern-banking-system-mvxw.onrender.com/transactions'
      )

      setTransactions(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddTransaction = async (e) => {
    e.preventDefault()

    try {
      const transactionData = {
        sender: formData.sender,
        receiver: formData.receiver,
        amount: `₹${formData.amount}`,
        type: formData.type,
        status: 'Success',
        date: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
      }

      if (editingId) {
        await axios.put(
          `https://mern-banking-system-mvxw.onrender.com/transactions/${editingId}`,
          transactionData
        )
      } else {
        await axios.post(
          'https://mern-banking-system-mvxw.onrender.com/transactions',
          transactionData
        )
      }

      fetchTransactions()

      setFormData({
        sender: '',
        receiver: '',
        amount: '',
        type: 'Credit',
      })

      setEditingId(null)
      setShowModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://mern-banking-system-mvxw.onrender.com/transactions/${id}`
      )

      fetchTransactions()
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = (item) => {
    setEditingId(item._id)

    setFormData({
      sender: item.sender,
      receiver: item.receiver,
      amount: item.amount.replace('₹', ''),
      type: item.type,
    })

    setShowModal(true)
  }

  const filteredTransactions = transactions.filter((item) =>
    item.sender.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='transactions-page'>

      {/* HEADER */}

      <div className='transactions-header'>
        <div>
          <h1 className='transactions-title'>
            Transactions
          </h1>

          <p className='transactions-subtitle'>
            Monitor all banking transactions
          </p>
        </div>

        <button
          className='new-transaction-btn'
          onClick={() => {
            setShowModal(true)
            setEditingId(null)

            setFormData({
              sender: '',
              receiver: '',
              amount: '',
              type: 'Credit',
            })
          }}
        >
          + New Transaction
        </button>
      </div>

      {/* STATS */}

      <div className='transactions-stats'>

        <div className='transaction-card'>
          <div className='transaction-icon credit-icon'>
            <FaArrowDown />
          </div>

          <div>
            <h3>Total Credit</h3>
            <h2>₹2,45,000</h2>
          </div>
        </div>

        <div className='transaction-card'>
          <div className='transaction-icon debit-icon'>
            <FaArrowUp />
          </div>

          <div>
            <h3>Total Debit</h3>
            <h2>₹1,32,000</h2>
          </div>
        </div>

        <div className='transaction-card'>
          <div className='transaction-icon total-icon'>
            <FaExchangeAlt />
          </div>

          <div>
            <h3>Total Transactions</h3>
            <h2>{transactions.length}</h2>
          </div>
        </div>

      </div>

      {/* SEARCH */}

      <div className='transaction-search'>
        <FaSearch />

        <input
          type='text'
          placeholder='Search transactions...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}

      <div className='transactions-table-container'>
        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((item) => (
              <tr key={item._id}>

                <td>{item._id.slice(-5)}</td>

                <td>{item.sender}</td>

                <td>{item.receiver}</td>

                <td>{item.amount}</td>

                <td>
                  <span
                    className={
                      item.type === 'Credit'
                        ? 'credit-badge'
                        : 'debit-badge'
                    }
                  >
                    {item.type}
                  </span>
                </td>

                <td>
                  <span
                    className={`status ${item.status.toLowerCase()}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td>{item.date}</td>

                <td>
                  <div className='transaction-actions'>

                    <button
                      className='transaction-edit-btn'
                      onClick={() => handleEdit(item)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className='transaction-delete-btn'
                      onClick={() => handleDelete(item._id)}
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
        <div className='transaction-modal-overlay'>

          <div className='transaction-modal'>

            <div className='transaction-modal-header'>

              <h2>
                {editingId
                  ? 'Edit Transaction'
                  : 'New Transaction'}
              </h2>

              <button
                className='close-transaction-modal'
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>

            </div>

            <form onSubmit={handleAddTransaction}>

              <div className='transaction-input-group'>
                <label>Sender Name</label>

                <input
                  type='text'
                  name='sender'
                  placeholder='Enter sender'
                  value={formData.sender}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='transaction-input-group'>
                <label>Receiver Name</label>

                <input
                  type='text'
                  name='receiver'
                  placeholder='Enter receiver'
                  value={formData.receiver}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='transaction-input-group'>
                <label>Amount</label>

                <input
                  type='number'
                  name='amount'
                  placeholder='Enter amount'
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='transaction-input-group'>
                <label>Transaction Type</label>

                <select
                  name='type'
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value='Credit'>
                    Credit
                  </option>

                  <option value='Debit'>
                    Debit
                  </option>
                </select>
              </div>

              <button
                type='submit'
                className='save-transaction-btn'
              >
                {editingId
                  ? 'Update Transaction'
                  : 'Save Transaction'}
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  )
}

export default Transactions