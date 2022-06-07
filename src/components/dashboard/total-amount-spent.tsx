import { useCallback } from 'react'
import { View, ViewProps } from 'react-native'
import { Card, Headline, Subheading } from 'react-native-paper'
import { FlatGrid } from 'react-native-super-grid'

import { useSubscriptions } from '../../hooks/use-subscription'
import { VehicleType } from '../../typings/package'

const COLORS: string[] = [
  '#82c91e25',
  '#f5a62325',
  '#f8360025',
  '#00b0ff25',
  '#00cec925'
]

const TotalAmountSpent = ({ style, ...rest }: ViewProps) => {
  const { data: subscriptions = [] } = useSubscriptions()

  const getSpendingPerVehicle = useCallback(
    (vehicleType: VehicleType): number => {
      return subscriptions
        .filter(subscription => subscription.package.vehicleType === vehicleType)
        .reduce((acc, curr) => acc + curr.package.price, 0)
    },
    [subscriptions]
  )

  const totalSpendingOnTwoWheeler = getSpendingPerVehicle('TWO_WHEELER')
  const totalSpendingOnFourWheeler = getSpendingPerVehicle('FOUR_WHEELER')
  const totalSpent = totalSpendingOnTwoWheeler + totalSpendingOnFourWheeler

  const data = {
    'Total Spent on Two Whellers': `$${totalSpendingOnTwoWheeler}`,
    'Total Spent on Four Whellers': `$${totalSpendingOnFourWheeler}`,
    'Total Spent': `$${totalSpent}`,
    'Total Subscriptions': subscriptions.length
  }

  const displaySpendingData = () => (
    <FlatGrid
      itemDimension={130}
      data={Object.keys(data)}
      renderItem={({ item: key, index }) => (
        <Card key={index} style={{ backgroundColor: COLORS[index] }}>
          <Card.Content>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Headline>{`${data[key as keyof typeof data]}`}</Headline>
              <Subheading style={{ textAlign: 'center' }}>{key}</Subheading>
            </View>
          </Card.Content>
        </Card>
      )}
    />
  )
  return (
    <View style={style} {...rest}>
      {displaySpendingData()}
    </View>
  )
}

export default TotalAmountSpent
