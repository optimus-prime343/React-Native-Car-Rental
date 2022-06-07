import { useQuery } from 'react-query'

import { Subscription } from '../typings/subscription'
import { axiosClient } from '../utils/axios-client'

export const useSubscriptions = () => {
  return useQuery<Subscription[], Error>(['subscriptions'], async () => {
    try {
      const { data } = await axiosClient.get<{ subscriptions: Subscription[] }>(
        '/subscription'
      )
      return data.subscriptions
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ?? 'Error fetching subscriptions'
      )
    }
  })
}

export const useActiveSubscriptions = () =>
  (useSubscriptions().data ?? []).filter(
    subscription => new Date(subscription.expirationDate) > new Date()
  )
export const useInActiveSubscriptions = () =>
  (useSubscriptions().data ?? []).filter(
    subscription => new Date(subscription.expirationDate) < new Date()
  )
