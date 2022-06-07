import { useMutation } from 'react-query'

import { axiosClient } from '../utils/axios-client'

type ResetPasswordInput = {
  token: string
  password: string
  confirmPassword: string
}
export const useResetPassword = () => {
  return useMutation<string, Error, ResetPasswordInput>(async resetPasswordInput => {
    const { token, ...payload } = resetPasswordInput
    try {
      const { data } = await axiosClient.post<{ message: string }>(
        `/auth/reset-password/${token}`,
        payload
      )
      return data.message
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Password reset failed')
    }
  })
}
