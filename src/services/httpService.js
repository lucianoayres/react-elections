import axios from 'axios'

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : process.env.REACT_APP_BACKEND_URL

const axiosInstance = axios.create({ baseURL: BASE_URL, timeout: 20000 })

export async function read(endpoint){
  const { data } = await axiosInstance.get(endpoint)
  return data
}