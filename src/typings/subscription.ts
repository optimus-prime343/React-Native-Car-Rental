import { Package } from './package'

export type Subscription = {
  id: string
  subscribedAt: Date
  expirationDate: Date
  selectedTime: string
  userId: string | null
  packageId: string
  package: Package
}
