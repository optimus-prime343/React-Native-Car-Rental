import { useMutation, useQueryClient } from 'react-query'

import { LoginInput } from '../typings/auth'
import { autoLogin } from '../utils/auth'
import { axiosClient } from '../utils/axios-client'

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation<string, Error, LoginInput>(async loginInput => {
    try {
      const { data } = await axiosClient.post<{ token: string }>(
        '/auth/login',
        loginInput
      )
      await autoLogin(data.token, () => queryClient.invalidateQueries(['user']))
      return 'Successfully logged in'
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Failed to login')
    }
  })
}
