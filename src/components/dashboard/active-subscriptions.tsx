import { differenceInCalendarDays } from 'date-fns'
import { useCallback } from 'react'
import { ViewStyle, View, FlatList, StyleSheet } from 'react-native'
import { Card, Text, ProgressBar, Subheading, Chip } from 'react-native-paper'

import { useActiveSubscriptions } from '../../hooks/use-subscription'
import { Subscription } from '../../typings/subscription'
import Alert from '../ui/alert'

const ActiveSubscriptions = () => {
  const activeSubscriptions = useActiveSubscriptions()

  const ActiveSubscriptionItem = ({
    subscription,
    style
  }: {
    subscription: Subscription
    style?: ViewStyle
  }) => {
    const calculateSubscriptionProgress = useCallback((): [number, number] => {
      //days since the package was first subscribed
      const totalDays = differenceInCalendarDays(
        new Date(),
        new Date(subscription.subscribedAt)
      )
      // total days before the package expires
      const remainingDays = differenceInCalendarDays(
        new Date(subscription.expirationDate),
        new Date()
      )
      const subscribedDaysProgress = totalDays / subscription.package.numOfDays
      return [subscribedDaysProgress, remainingDays]
    }, [subscription])

    const [progress, remainingDays] = calculateSubscriptionProgress()

    return (
      <Card style={style}>
        <Card.Content>
          <View style={styles.header}>
            <Subheading>{subscription.package.name}</Subheading>
            <Chip>{subscription.package.vehicleType.replace('_', ' ')}</Chip>
          </View>
          <ProgressBar style={styles.progress} progress={progress} />
          <Text>Expires in {remainingDays} days</Text>
        </Card.Content>
      </Card>
    )
  }
  if (activeSubscriptions.length === 0)
    return (
      <Alert variant='warning'>{`You don't have any active subscriptions`}</Alert>
    )
  return (
    <View>
      <FlatList
        data={activeSubscriptions}
        renderItem={({ item, index }) => (
          <ActiveSubscriptionItem
            subscription={item}
            style={{ marginTop: index === 0 ? 0 : 10 }}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  progress: {
    marginVertical: 10
  }
})
export default ActiveSubscriptions
