import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Button, Paragraph, TextInput, Title } from 'react-native-paper'
import { useToast } from 'react-native-toast-notifications'

import { useResetPassword } from '../hooks/use-reset-password'
import { ScreenProps } from '../typings/navigation'

const ResetPasswordScreen = ({
  route,
  navigation
}: ScreenProps<'ResetPassword'>) => {
  const toast = useToast()
  const resetPassword = useResetPassword()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handlePasswordReset = async () => {
    try {
      const message = await resetPassword.mutateAsync({
        token: route.params.token,
        password,
        confirmPassword
      })
      toast.show(message, { type: 'success' })
      navigation.replace('Login')
    } catch (error: any) {
      toast.show(error.message, { type: 'danger' })
    }
  }
  const isButtonDisabled =
    !password || !confirmPassword || password !== confirmPassword

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/resetpassword.png')}
      />
      <Title style={styles.title}>Reset your password</Title>
      <View>
        <TextInput
          label='Password'
          value={password}
          placeholder='New password'
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          label='Confirm password'
          value={confirmPassword}
          placeholder='Confirm new password'
          onChangeText={setConfirmPassword}
          style={styles.input}
          secureTextEntry
        />
        <Button
          onPress={handlePasswordReset}
          disabled={isButtonDisabled}
          mode='contained'
        >
          Reset Password
        </Button>
      </View>
      <View style={styles.footer}>
        <Paragraph>Remember your password ?</Paragraph>
        <Button onPress={() => navigation.navigate('Login')}>Login</Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 6,
    marginBottom: 12
  },
  title: {
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  input: {
    marginBottom: 12
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})
export default ResetPasswordScreen
