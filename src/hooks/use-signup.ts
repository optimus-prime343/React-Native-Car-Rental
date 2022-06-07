import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQueryClient } from 'react-query'

import { CreateUserInput } from '../typings/auth'
import { axiosClient } from '../utils/axios-client'

export const useSignup = () => {
  const queryClient = useQueryClient()
  return useMutation<string, Error, CreateUserInput>(async createuserPayload => {
    try {
      const { data } = await axiosClient.post<{ token: string }>(
        '/auth/signup',
        createuserPayload
      )
      await AsyncStorage.setItem('token', data.token)
      await queryClient.invalidateQueries(['user'])
      return 'Successfully created a new account'
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Signup failed')
    }
  })
}
