import { useQuery } from 'react-query'

import { Package } from '../typings/package'
import { axiosClient } from '../utils/axios-client'

export const usePackages = () => {
  return useQuery<Package[], Error>(['packages'], async () => {
    try {
      const { data } = await axiosClient.get<{ packages: Package[] }>('/packages')
      return data.packages
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Error fetching packages')
    }
  })
}
