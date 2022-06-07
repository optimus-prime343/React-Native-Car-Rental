import { useMutation, useQueryClient } from 'react-query'

import { UpdateUserInput, User } from '../typings/user'
import { axiosClient } from '../utils/axios-client'

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation<string, Error, UpdateUserInput>(async updateUserInput => {
    try {
      await axiosClient.patch<{ user: User }>('/user', updateUserInput)
      queryClient.invalidateQueries(['user'])
      return 'Successfully updated profile information'
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Error updating user')
    }
  })
}
