import React, { useState } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Button, Divider, Paragraph, TextInput, Title } from 'react-native-paper'
import { useToast } from 'react-native-toast-notifications'

import { useLogin } from '../hooks/use-login'
import { ScreenProps } from '../typings/navigation'

const LoginScreen = ({ navigation }: ScreenProps<'Login'>) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const toast = useToast()
  const login = useLogin()

  const handleLogin = async () => {
    try {
      const message = await login.mutateAsync({ email, password })
      toast.show(message, { type: 'success' })
      navigation.navigate('HomePage', { screen: 'Packages' })
    } catch (error: any) {
      toast.show(error.message, { type: 'danger' })
    }
  }
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/login.png')}
        style={styles.loginCoverImage}
      />
      <Title>Welcome back</Title>
      <Paragraph style={styles.textBody}>
        Login to your account to access all the features
      </Paragraph>
      <View style={styles.form}>
        <TextInput
          label='Email address'
          placeholder='Email'
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          label='Password'
          placeholder='Password'
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <Button
          mode='contained'
          style={styles.loginButton}
          disabled={!email || !password}
          onPress={handleLogin}
          loading={login.isLoading}
        >
          Login
        </Button>
        <Button onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot Password ?
        </Button>
      </View>
      <View style={styles.footer}>
        <Divider />
        <Paragraph>Dont have an account ?</Paragraph>
        <Button onPress={() => navigation.navigate('Signup')}>Sign up</Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  loginCoverImage: {
    width: 400,
    height: 250,
    marginBottom: 12
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10
  },
  form: {
    width: '90%'
  },
  textBody: {
    marginBottom: 16,
    textAlign: 'center'
  },
  input: {
    marginBottom: 12
  },
  loginButton: {
    marginBottom: 24
  },
  divider: {
    marginVertical: 10
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})
export default LoginScreen
