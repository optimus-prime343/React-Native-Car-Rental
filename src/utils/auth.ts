import AsyncStorage from '@react-native-async-storage/async-storage'

import { axiosClient } from './axios-client'

export const autoLogin = async (token: string, callback?: () => void) => {
  axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
  await AsyncStorage.setItem('token', token)
  if (callback) callback()
}
export const autoLogout = async (callback?: () => void) => {
  axiosClient.defaults.headers.common['Authorization'] = ''
  delete axiosClient.defaults.headers.common['Authorization']
  await AsyncStorage.removeItem('token')
  if (callback) callback()
}
