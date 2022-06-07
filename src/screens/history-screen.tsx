import React from 'react'
import { View, Text, StyleSheet, RefreshControl } from 'react-native'

import SubscriptionList from '../components/subscription/subscription-list'
import LoadingSpinner from '../components/ui/loading-spinner'
import { useSubscriptions } from '../hooks/use-subscription'

const HistoryScreen = () => {
  const { data: subscriptions = [], isLoading, refetch } = useSubscriptions()
  if (isLoading) return <LoadingSpinner />
  return (
    <View style={styles.container}>
      {subscriptions.length === 0 && (
        <Text style={styles.noSubscriptionText}>
          You don't have subscriptions yet.
        </Text>
      )}
      <RefreshControl refreshing={isLoading} onRefresh={refetch}>
        <SubscriptionList subscriptions={subscriptions} />
      </RefreshControl>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6
  },
  noSubscriptionText: {
    marginTop: 6,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#ffc9c9',
    color: '#fa5252',
    padding: 10,
    borderRadius: 6
  }
})
export default HistoryScreen
