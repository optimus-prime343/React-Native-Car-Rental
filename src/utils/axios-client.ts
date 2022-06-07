import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const createAxiosClient = () => {
  const axiosClient = axios.create({
    baseURL: 'https://enigmatic-chamber-48745.herokuapp.com/api',
    withCredentials: true
  })
  AsyncStorage.getItem('token').then(token => {
    if (token) {
      axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  })
  return axiosClient
}
export const axiosClient = createAxiosClient()
