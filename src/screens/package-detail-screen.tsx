import RNDateTimePicker, {
  DateTimePickerEvent
} from '@react-native-community/datetimepicker'
import { useStripe } from '@stripe/stripe-react-native'
import { format } from 'date-fns'
import { useCallback, useLayoutEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Chip, Paragraph, Text, Title } from 'react-native-paper'
import { useToast } from 'react-native-toast-notifications'
import { useQueryClient } from 'react-query'

import { useSubscribe } from '../hooks/use-subscribe'
import { ScreenProps } from '../typings/navigation'

const PackageDetailScreen = ({
  route,
  navigation
}: ScreenProps<'PackageDetail'>) => {
  const queryClient = useQueryClient()
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const subscribe = useSubscribe()
  const toast = useToast()

  const { package: _package } = route.params

  const [showPicker, setShowPicker] = useState(false)
  const [selectedTime, setSelectedTime] = useState<Date | undefined>()
  const [loading, setLoading] = useState(false)

  const handleOnChange = (_event: DateTimePickerEvent, date?: Date) => {
    setShowPicker(false)
    if (date) {
      if (date.getHours() < 10 || date.getHours() > 18) {
        return toast.show('Please select a time between 10am and 6pm', {
          type: 'danger'
        })
      }
      setSelectedTime(date)
    }
  }
  const handleSubscribe = useCallback(async () => {
    if (!selectedTime) return toast.show('Please select a time', { type: 'danger' })
    setLoading(true)
    try {
      const clientSecretKey = await subscribe.mutateAsync({
        packageId: _package.id,
        selectedTime
      })
      const { error: error_one } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecretKey,
        merchantDisplayName: 'Car Rental'
      })
      if (error_one) return toast.show(error_one.message, { type: 'danger' })
      const { error: error_two } = await presentPaymentSheet()
      if (error_two) return toast.show(error_two.message, { type: 'danger' })

      await queryClient.invalidateQueries(['subscriptions'])
      toast.show('You have successfully subscribed to this package', {
        type: 'success'
      })
      navigation.navigate('HomePage', { screen: 'History' })
    } catch (error: any) {
      toast.show(error.message, { type: 'danger' })
    } finally {
      setLoading(false)
    }
  }, [selectedTime])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: _package.name
    })
  })
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/images/details.png')}
        />
        <View style={styles.header}>
          <Title>{_package.name}</Title>
          <Chip>{_package.vehicleType.split('_').join(' ')}</Chip>
        </View>
        <Paragraph>{_package.description}</Paragraph>
        <Text style={styles.price}>{`$${_package.price}`}</Text>
        <Button icon='clock' onPress={() => setShowPicker(true)}>
          Choose your time
        </Button>
        {showPicker && (
          <RNDateTimePicker
            onChange={handleOnChange}
            value={new Date()}
            mode='time'
          />
        )}
        {selectedTime && (
          <View style={styles.subscribe}>
            <Text style={styles.selectedTime}>
              Selected Time : {format(selectedTime, 'p')}
            </Text>
            <Button mode='contained' onPress={handleSubscribe} loading={loading}>
              Subscribe
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 12
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 24,
    borderRadius: 6
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8
  },
  subscribe: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6
  },
  selectedTime: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})
export default PackageDetailScreen
