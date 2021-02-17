import axios from 'axios'

export * from './constants'

const api = axios.create({
  baseURL: 'https://swapi.dev/api/'
})

export default api
