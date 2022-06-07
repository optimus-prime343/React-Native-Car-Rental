import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQuery } from 'react-query'

import { User } from '../typings/user'
import { axiosClient } from '../utils/axios-client'

export const useUser = () => {
  return useQuery(['user'], async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (!token) return null
      const { data } = await axiosClient.get<{ user: User | null }>('/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return data.user
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Failed to fetch user')
    }
  })
}
