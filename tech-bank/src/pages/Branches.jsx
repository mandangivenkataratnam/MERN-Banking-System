import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {FaMapMarkerAlt,FaPhoneAlt,FaUserTie,FaBuilding,FaTimes,FaEnvelope,FaTrash,FaEdit,FaPlus} from 'react-icons/fa'
import '../styles/branches.css'

const Branches=()=>{

  const [branches,setBranches]=useState([])
  const [selectedBranch,setSelectedBranch]=useState(null)
  const [showModal,setShowModal]=useState(false)
  const [isEdit,setIsEdit]=useState(false)

  const [formData,setFormData]=useState({
    id:'',
    branch:'',
    manager:'',
    phone:'',
    location:'',
    email:''
  })

  useEffect(()=>{
    fetchBranches()
  },[])

  const fetchBranches=async()=>{

    try{

      const response=await axios.get(
        'http://localhost:4300/branches'
      )

      setBranches(response.data)

    }catch(error){
      console.log(error)
    }
  }

  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  // ADD BRANCH

  const handleAddBranch=async(e)=>{

    e.preventDefault()

    try{

      await axios.post(
        'http://localhost:4300/branches',
        formData
      )

      fetchBranches()
      resetForm()

    }catch(error){
      console.log(error)
    }
  }

  // DELETE BRANCH

  const handleDeleteBranch=async(id)=>{

    try{

      await axios.delete(
        `http://localhost:4300/branches/${id}`
      )

      fetchBranches()

    }catch(error){
      console.log(error)
    }
  }

  // EDIT BRANCH

  const handleEditBranch=(branch)=>{

    setFormData({
      _id:branch._id,
      branch:branch.branch,
      manager:branch.manager,
      phone:branch.phone,
      location:branch.location,
      email:branch.email
    })

    setShowModal(true)
    setIsEdit(true)
  }

  // UPDATE BRANCH

  const handleUpdateBranch=async(e)=>{

    e.preventDefault()

    try{

      await axios.put(
        `http://localhost:4300/branches/${formData._id}`,
        formData
      )

      fetchBranches()
      resetForm()

    }catch(error){
      console.log(error)
    }
  }

  // RESET FORM

  const resetForm=()=>{

    setFormData({
      _id:'',
      branch:'',
      manager:'',
      phone:'',
      location:'',
      email:''
    })

    setShowModal(false)
    setIsEdit(false)
  }

  return(

    <div className='branches-page'>

      {/* HEADER */}

      <div className='branches-header'>

        <div>

          <h1 className='branches-title'>
            Bank Branches
          </h1>

          <p className='branches-subtitle'>
            Manage and monitor all branch offices
          </p>

        </div>

        <button
          className='add-branch-btn'
          onClick={()=>{

            setShowModal(true)
            setIsEdit(false)

          }}
        >

          <FaPlus />
          Add Branch

        </button>

      </div>

      {/* GRID */}

      <div className='branches-grid'>

        {branches.map((item)=>(

          <div
            className='branch-card'
            key={item._id}
          >

            <div className='branch-icon'>
              <FaBuilding />
            </div>

            <h2>
              {item.branch}
            </h2>

            <div className='branch-details'>

              <p>
                <FaUserTie />
                <span>{item.manager}</span>
              </p>

              <p>
                <FaPhoneAlt />
                <span>{item.phone}</span>
              </p>

              <p>
                <FaMapMarkerAlt />
                <span>{item.location}</span>
              </p>

            </div>

            <div className='branch-actions'>

              <button
                className='branch-btn'
                onClick={()=>
                  setSelectedBranch(item)
                }
              >
                View
              </button>

              <button
                className='edit-branch-btn'
                onClick={()=>
                  handleEditBranch(item)
                }
              >
                <FaEdit />
              </button>

              <button
                className='delete-branch-btn'
                onClick={()=>
                  handleDeleteBranch(item._id)
                }
              >
                <FaTrash />
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* VIEW MODAL */}

      {selectedBranch&&(

        <div className='branch-modal-overlay'>

          <div className='branch-modal'>

            <button
              className='close-branch-modal'
              onClick={()=>
                setSelectedBranch(null)
              }
            >
              <FaTimes />
            </button>

            <div className='modal-top-icon'>
              <FaBuilding />
            </div>

            <h2>
              {selectedBranch.branch}
            </h2>

            <div className='modal-details'>

              <div className='modal-detail-item'>

                <FaUserTie />

                <div>

                  <h4>
                    Branch Manager
                  </h4>

                  <p>
                    {selectedBranch.manager}
                  </p>

                </div>

              </div>

              <div className='modal-detail-item'>

                <FaPhoneAlt />

                <div>

                  <h4>
                    Contact Number
                  </h4>

                  <p>
                    {selectedBranch.phone}
                  </p>

                </div>

              </div>

              <div className='modal-detail-item'>

                <FaEnvelope />

                <div>

                  <h4>
                    Email Address
                  </h4>

                  <p>
                    {selectedBranch.email}
                  </p>

                </div>

              </div>

              <div className='modal-detail-item'>

                <FaMapMarkerAlt />

                <div>

                  <h4>
                    Branch Location
                  </h4>

                  <p>
                    {selectedBranch.location}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* ADD / EDIT MODAL */}

      {showModal&&(

        <div className='branch-modal-overlay'>

          <div className='branch-form-modal'>

            <div className='modal-header'>

              <h2>
                {isEdit
                  ?'Edit Branch'
                  :'Add Branch'}
              </h2>

              <button
                className='close-branch-modal'
                onClick={resetForm}
              >
                <FaTimes />
              </button>

            </div>

            <form
              onSubmit={
                isEdit
                ?handleUpdateBranch
                :handleAddBranch
              }
            >

              <input
                type='text'
                name='branch'
                placeholder='Branch Name'
                value={formData.branch}
                onChange={handleChange}
                required
              />

              <input
                type='text'
                name='manager'
                placeholder='Manager Name'
                value={formData.manager}
                onChange={handleChange}
                required
              />

              <input
                type='text'
                name='phone'
                placeholder='Phone Number'
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <input
                type='text'
                name='location'
                placeholder='Location'
                value={formData.location}
                onChange={handleChange}
                required
              />

              <input
                type='email'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                required
              />

              <button
                type='submit'
                className='save-branch-btn'
              >

                {isEdit
                  ?'Update Branch'
                  :'Save Branch'}

              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}

export default Branches