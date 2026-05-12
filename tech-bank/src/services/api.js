import axios from 'axios'

const API = axios.create({
  baseURL: 'https://mern-banking-system-mvxw.onrender.com'
})

export default API