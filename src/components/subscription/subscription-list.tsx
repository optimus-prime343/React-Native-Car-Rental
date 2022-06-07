import { View, FlatList } from 'react-native'

import { Subscription } from '../../typings/subscription'
import SubscriptionItem from './subscription-item'

interface Props {
  subscriptions: Subscription[]
}
const SubscriptionList = ({ subscriptions }: Props) => {
  return (
    <View>
      <FlatList
        data={subscriptions}
        renderItem={({ item }) => <SubscriptionItem subscription={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  )
}
export default SubscriptionList
