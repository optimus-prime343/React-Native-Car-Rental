export type Package = {
  id: string
  name: string
  description: string
  price: number
  numOfDays: number
  vehicleType: VehicleType
  createdAt: Date
  updatedAt: Date
}
export type VehicleType = 'TWO_WHEELER' | 'FOUR_WHEELER'
