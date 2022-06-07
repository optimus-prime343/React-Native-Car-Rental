import { useMutation } from 'react-query'

import { axiosClient } from '../utils/axios-client'

type SubscribeInput = {
  packageId: string
  selectedTime: Date
}
export const useSubscribe = () => {
  return useMutation<string, Error, SubscribeInput>(
    async ({ packageId, selectedTime }) => {
      try {
        const { data } = await axiosClient.post<{ clientSecret: string }>(
          `/subscription/subscribe/${packageId}`,
          { selectedTime }
        )
        return data.clientSecret
      } catch (error: any) {
        throw new Error(error.response?.data?.message)
      }
    }
  )
}
