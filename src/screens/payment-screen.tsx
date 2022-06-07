import { CardField, useStripe } from '@stripe/stripe-react-native'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'
import { useToast } from 'react-native-toast-notifications'

import { useSubscribe } from '../hooks/use-subscribe'
import { useUser } from '../hooks/use-user'
import { ScreenProps } from '../typings/navigation'

const PaymentScreen = ({ route }: ScreenProps<'Payment'>) => {
  const toast = useToast()
  const { data: user } = useUser()
  const subscribe = useSubscribe()
  const { package: _package } = route.params
  const { confirmPayment } = useStripe()

  const handlePayment = async () => {
    const clientSecretKey = await subscribe.mutateAsync({
      packageId: _package.id,
      selectedTime: new Date()
    })
    const { error } = await confirmPayment(clientSecretKey, {
      type: 'Card',
      billingDetails: {
        email: user?.email
      }
    })
    if (error) return toast.show(error.message, { type: 'danger' })
    toast.show('Payment successful', { type: 'success' })
  }

  return (
    <View style={styles.container}>
      <CardField postalCodeEnabled={false} style={styles.cardField} />
      <Button onPress={handlePayment}>Confirm Payment</Button>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 12
  },
  cardField: {
    width: '100%',
    height: 100
  }
})
export default PaymentScreen
