import { useMutation } from 'react-query'

import { axiosClient } from '../utils/axios-client'

interface RequestPasswordResetInput {
  email: string
}
export const useRequestPasswordReset = () => {
  return useMutation<string, Error, RequestPasswordResetInput>(
    async requestPasswordInput => {
      try {
        const { data } = await axiosClient.post<{ message: string }>(
          '/auth/request-password-reset',
          requestPasswordInput
        )
        return data.message
      } catch (error: any) {
        throw new Error(
          error.response?.data?.message ?? 'Failed to request password reset'
        )
      }
    }
  )
}
