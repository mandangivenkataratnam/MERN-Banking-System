import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import DashboardCard from '../components/DashboardCard'

import {
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa'

import '../styles/dashboard.css'

const Dashboard=()=>{

  const [customers,setCustomers]=useState([])
  const [transactions,setTransactions]=useState([])
  const [user,setUser]=useState(null)

  useEffect(()=>{

    fetchDashboardData()

    const storedUser=JSON.parse(
      localStorage.getItem('user')
    )

    setUser(storedUser)

  },[])

  const fetchDashboardData=async()=>{

    try{

      const customerResponse=await axios.get(
        'http://localhost:4300/customers'
      )

      const transactionResponse=await axios.get(
        'http://localhost:4300/transactions'
      )

      setCustomers(customerResponse.data)

      setTransactions(transactionResponse.data)

    }catch(error){
      console.log(error)
    }
  }

  return(
    <div className='dashboard-page'>

      {/* HEADER */}

      <div className='dashboard-header'>

        <div>

          <h1 className='dashboard-title'>

            Welcome Back 👋

            {
              user?.name &&
              ` ${
                user.name.charAt(0)
                .toUpperCase()
                +
                user.name.slice(1)
              }`
            }

          </h1>

          <p className='dashboard-subtitle'>
            Monitor your banking system performance
          </p>

        </div>

        <div className='dashboard-status'>

          <div className='status-box income'>

            <FaArrowUp />

            <span>
              +12% Growth
            </span>

          </div>

          <div className='status-box expense'>

            <FaArrowDown />

            <span>
              -3% Expenses
            </span>

          </div>

        </div>

      </div>

      {/* GRID */}

      <div className='dashboard-grid'>

        <DashboardCard
          title='Customers'
          value={customers.length}
        />

        <DashboardCard
          title='Branches'
          value='24'
        />

        <DashboardCard
          title='Transactions'
          value={transactions.length}
        />

        <DashboardCard
          title='Employees'
          value='300'
        />

      </div>

      {/* RECENT TRANSACTIONS */}

      <div className='recent-transactions'>

        <div className='section-header'>

          <h2>
            Recent Transactions
          </h2>

          <button
            onClick={()=>
              window.location.href=
              '/transactions'
            }
          >
            View All
          </button>

        </div>

        <table>

          <thead>

            <tr>

              <th>ID</th>

              <th>Sender</th>

              <th>Receiver</th>

              <th>Amount</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {
              transactions
              .slice(-5)
              .reverse()
              .map((item)=>(

                <tr key={item.id}>

                  <td>
                    #{item.id}
                  </td>

                  <td>
                    {item.sender}
                  </td>

                  <td>
                    {item.receiver}
                  </td>

                  <td>
                    {item.amount}
                  </td>

                  <td>

                    <span
                      className={
                        item.status===
                        'Success'
                        ?'success-status'
                        :'pending-status'
                      }
                    >

                      {item.status}

                    </span>

                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Dashboard