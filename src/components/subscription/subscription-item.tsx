import { NavigationProp, useNavigation } from '@react-navigation/native'
import { format } from 'date-fns'
import { StyleSheet, View } from 'react-native'
import { Card, Chip, Title, Text, Divider, Button } from 'react-native-paper'

import { RootStackParamList } from '../../typings/navigation'
import { Subscription } from '../../typings/subscription'

interface Props {
  subscription: Subscription
}
const SubscriptionItem = ({ subscription }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList, 'HomePage'>>()
  const {
    package: _package,
    expirationDate,
    subscribedAt,
    selectedTime
  } = subscription
  const isPackageActive = new Date(expirationDate) > new Date()
  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.header}>
          <Title>{_package.name}</Title>
          <Chip>{_package.vehicleType.split('_').join(' ')}</Chip>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text style={styles.text}>
            <Text style={styles.label}>Total number of days : </Text>
            {_package.numOfDays}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Subscribed At : </Text>
            {format(new Date(subscribedAt), 'PPP')}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>
              {isPackageActive ? 'Expires At' : 'Expired At'} :{' '}
            </Text>
            {format(new Date(expirationDate), 'PPP')}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Selected Time : </Text>
            {format(new Date(selectedTime), 'p')}
          </Text>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() => navigation.navigate('PackageDetail', { package: _package })}
        >
          View Package Detail
        </Button>
      </Card.Actions>
    </Card>
  )
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    padding: 6,
    position: 'relative'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  divider: {
    marginTop: 6
  },
  label: {
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16,
    marginTop: 8
  }
})
export default SubscriptionItem
