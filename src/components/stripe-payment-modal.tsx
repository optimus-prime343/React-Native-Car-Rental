import { CardField, useStripe } from '@stripe/stripe-react-native'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Modal, Portal, Surface } from 'react-native-paper'
import { useToast } from 'react-native-toast-notifications'
import { useQueryClient } from 'react-query'

import { useSubscribe } from '../hooks/use-subscribe'
import { useUser } from '../hooks/use-user'

interface Props {
  packageId: string
  selectedTime: Date
  onDismiss: () => void
}
const StripePaymentModal = ({ packageId, selectedTime, onDismiss }: Props) => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)
  const { data: user } = useUser()
  const subscribe = useSubscribe()
  const { confirmPayment } = useStripe()
  const contentContainerStyle = { padding: 16 }

  const handlePayment = async () => {
    setLoading(true)
    try {
      const clientSecretKey = await subscribe.mutateAsync({
        packageId,
        selectedTime
      })
      const { error } = await confirmPayment(clientSecretKey, {
        type: 'Card',
        billingDetails: {
          email: user?.email
        }
      })
      if (error) return toast.show(error.message, { type: 'danger' })
      toast.show('Payment successful', { type: 'success' })
      queryClient.invalidateQueries(['subscriptions'])
    } catch (error: any) {
      toast.show(error.message, { type: 'error' })
    } finally {
      setLoading(false)
      onDismiss()
    }
  }
  return (
    <Portal>
      <Modal
        visible={!!selectedTime}
        onDismiss={onDismiss}
        contentContainerStyle={contentContainerStyle}
      >
        <Surface style={styles.surface}>
          <CardField postalCodeEnabled={false} style={{ height: 70 }} />
          <Button onPress={handlePayment}>
            {loading ? 'Processing payment...' : 'Confirm payment'}
          </Button>
        </Surface>
      </Modal>
    </Portal>
  )
}
const styles = StyleSheet.create({
  surface: {
    padding: 4
  }
})
export default StripePaymentModal
