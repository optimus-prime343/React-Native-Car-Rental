import { useMutation } from 'react-query'

import { axiosClient } from '../utils/axios-client'

type ChangePasswordInput = {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}
export const useChangePassword = () => {
  return useMutation<string, Error, ChangePasswordInput>(
    async changePasswordInput => {
      try {
        const { data } = await axiosClient.post<{ message: string }>(
          '/auth/change-password',
          changePasswordInput
        )
        return data.message
      } catch (error: any) {
        console.log(error.response.data.message)
        throw new Error(error.response?.data?.message ?? 'Error changing password')
      }
    }
  )
}
