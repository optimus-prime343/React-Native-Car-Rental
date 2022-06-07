import { useFormik } from 'formik'
import { Image, StyleSheet, View } from 'react-native'
import {
  Button,
  Checkbox,
  Paragraph,
  Text,
  TextInput,
  Title,
  useTheme
} from 'react-native-paper'
import { useToast } from 'react-native-toast-notifications'

import { useSignup } from '../hooks/use-signup'
import { ScreenProps } from '../typings/navigation'

const SignupScreen = ({ navigation }: ScreenProps<'Signup'>) => {
  const toast = useToast()
  const { colors } = useTheme()
  const signup = useSignup()
  const { handleChange, handleBlur, handleSubmit, values, setFieldValue } =
    useFormik({
      initialValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreedToTerms: false
      },
      onSubmit: async values => {
        const { agreedToTerms, ...signupPayload } = values
        try {
          const message = await signup.mutateAsync(signupPayload)
          toast.show(message, { type: 'success' })
        } catch (error: any) {
          toast.show(error.message, { type: 'danger' })
        }
      }
    })
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/signup.png')}
        style={styles.signupImage}
      />
      <Title>Create a new account</Title>
      <Paragraph>Get access to all the features by creating a new account</Paragraph>
      <View style={styles.form}>
        <TextInput
          label='Name'
          style={styles.input}
          value={values.name}
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
        />
        <TextInput
          label='Email Address'
          style={styles.input}
          value={values.email}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
        />
        <TextInput
          label='Password'
          style={styles.input}
          value={values.password}
          secureTextEntry
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
        />
        <TextInput
          label='Confirm Password'
          value={values.confirmPassword}
          secureTextEntry
          onChangeText={handleChange('confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
        />
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={values.agreedToTerms ? 'checked' : 'unchecked'}
            onPress={() => setFieldValue('agreedToTerms', !values.agreedToTerms)}
            color={colors.primary}
          />
          <Text>I agree to Terms and Conditions</Text>
        </View>
        <Button
          onPress={handleSubmit}
          mode='contained'
          disabled={!values.agreedToTerms}
          loading={signup.isLoading}
        >
          Confirm Signup
        </Button>
      </View>
      <View style={styles.footer}>
        <Text>Already have an account ?</Text>
        <Button onPress={() => navigation.navigate('Login')}>Login</Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  signupImage: {
    marginVertical: 10,
    width: '100%',
    height: 150,
    resizeMode: 'contain'
  },
  form: {
    width: '90%',
    marginTop: 16
  },
  input: {
    marginBottom: 12
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})
export default SignupScreen
