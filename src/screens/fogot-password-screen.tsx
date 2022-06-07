import React, { useState } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Button, Paragraph, TextInput, Title } from 'react-native-paper'
import { useToast } from 'react-native-toast-notifications'

import { useRequestPasswordReset } from '../hooks/use-request-password-reset'
import { ScreenProps } from '../typings/navigation'

const ForgotPasswordScreen = ({ navigation }: ScreenProps<'ForgotPassword'>) => {
  const toast = useToast()
  const requestPasswordReset = useRequestPasswordReset()
  const [email, setEmail] = useState('')

  const handleRequestPassworReset = async () => {
    try {
      const message = await requestPasswordReset.mutateAsync({ email })
      toast.show(message, { type: 'success' })
      navigation.navigate('VerifyResetToken')
    } catch (error: any) {
      toast.show(error.message, { type: 'danger' })
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/forgotpassword.png')}
        />
        <Title>Forgot password ? </Title>
        <Paragraph style={styles.text}>
          Please enter your email address and we will send you a email with password
          reset instructions
        </Paragraph>
        <TextInput
          style={styles.input}
          label='Email address'
          value={email}
          onChangeText={setEmail}
        />
        <Button
          mode='contained'
          disabled={!email}
          onPress={handleRequestPassworReset}
          loading={requestPasswordReset.isLoading}
        >
          Send password reset request
        </Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24
  },
  innerContainer: {
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 24,
    borderRadius: 6
  },
  text: {
    textAlign: 'center'
  },
  input: {
    width: '100%',
    marginVertical: 10
  }
})
export default ForgotPasswordScreen
