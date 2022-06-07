import { format } from 'date-fns'
import { View, Text, FlatList, ViewProps, StyleSheet } from 'react-native'
import { Card, ProgressBar, Subheading } from 'react-native-paper'

import { useInActiveSubscriptions } from '../../hooks/use-subscription'
import { Subscription } from '../../typings/subscription'
import Alert from '../ui/alert'

const ExpiredSubscriptions = ({ style, ...rest }: ViewProps) => {
  const expiredSubscriptions = useInActiveSubscriptions()
  const ExpiredSubscriptionItem = ({
    subscription
  }: {
    subscription: Subscription
  }) => (
    <Card>
      <Card.Content>
        <Subheading>{subscription.package.name}</Subheading>
        <ProgressBar progress={1} color='red' style={styles.progress} />
        <Text>
          Expired in : {format(new Date(subscription.expirationDate), 'PP')}
        </Text>
      </Card.Content>
    </Card>
  )
  if (expiredSubscriptions.length === 0)
    return (
      <Alert variant='warning' style={{ marginTop: 10 }}>
        {`You dont't have any expired subscriptions`}
      </Alert>
    )
  return (
    <View style={style} {...rest}>
      <FlatList
        data={expiredSubscriptions}
        renderItem={({ item }) => <ExpiredSubscriptionItem subscription={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  progress: {
    marginVertical: 15
  }
})
export default ExpiredSubscriptions
