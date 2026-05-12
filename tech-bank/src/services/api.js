import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:4300'
})

export default API