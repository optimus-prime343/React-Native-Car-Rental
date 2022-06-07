import { StyleSheet, View } from 'react-native'

import ActiveSubscriptions from '../components/dashboard/active-subscriptions'
import ExpiredSubscriptions from '../components/dashboard/expired-subscriptions'
import TotalAmountSpent from '../components/dashboard/total-amount-spent'

const HomeScreen = () => {
  return (
    <View>
      <TotalAmountSpent />
      <View style={styles.container}>
        <ActiveSubscriptions />
        <ExpiredSubscriptions style={{ marginTop: 10 }} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12
  }
})
export default HomeScreen
