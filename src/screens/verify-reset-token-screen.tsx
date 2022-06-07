import { useState } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Button, Paragraph, TextInput, Title } from 'react-native-paper'
import { useToast } from 'react-native-toast-notifications'
import { useMutation } from 'react-query'

import { ScreenProps } from '../typings/navigation'
import { axiosClient } from '../utils/axios-client'

const VerifyResetTokenScreen = ({ navigation }: ScreenProps<'VerifyResetToken'>) => {
  const toast = useToast()

  const [code, setCode] = useState('')

  const verifyToken = useMutation<string, Error, string>(async token => {
    try {
      const { data } = await axiosClient.post<{ message: string }>(
        `/auth/verify-reset-token/${token}`
      )
      return data.message
    } catch (error: any) {
      throw new Error(error.response.data.message)
    }
  })
  const handlePress = async () => {
    try {
      const message = await verifyToken.mutateAsync(code)
      toast.show(message, { type: 'success' })
      navigation.replace('ResetPassword', { token: code })
    } catch (error: any) {
      toast.show(error.message, { type: 'danger' })
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/forgotpassword.png')}
      />
      <View>
        <Title style={styles.title}>Verify your token</Title>
        <Paragraph style={styles.text}>
          Enter the verification code that we sent on your email to proceed
        </Paragraph>
        <TextInput
          placeholder='OTP'
          label='Verification code'
          value={code}
          onChangeText={setCode}
          style={{ width: '100%' }}
        />
        <Button
          style={styles.button}
          onPress={handlePress}
          loading={verifyToken.isLoading}
          disabled={!code || code.length !== 6 || code.length > 6}
          mode='contained'
        >
          Confirm
        </Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 12
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 12
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  text: {
    marginVertical: 12,
    textAlign: 'center'
  },
  button: {
    marginTop: 12
  }
})
export default VerifyResetTokenScreen
