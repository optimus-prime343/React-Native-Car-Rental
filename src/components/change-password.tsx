import { useFormik } from 'formik'
import React, { useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Divider, TextInput, Title } from 'react-native-paper'
import { useToast } from 'react-native-toast-notifications'

import { useChangePassword } from '../hooks/use-change-password'

const ChangePassword = () => {
  const toast = useToast()
  const changePassword = useChangePassword()
  const { handleChange, handleBlur, handleSubmit, values, resetForm } = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    onSubmit: async values => {
      try {
        const message = await changePassword.mutateAsync(values)
        toast.show(message, { type: 'success' })
        resetForm()
      } catch (error: any) {
        toast.show(error.message, { type: 'danger' })
      }
    }
  })
  const isDisabled = useMemo<boolean>(() => {
    return (
      !values.currentPassword ||
      !values.newPassword ||
      !values.confirmNewPassword ||
      values.newPassword !== values.confirmNewPassword
    )
  }, [values])
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Update password</Title>
      <Divider />
      <TextInput
        style={styles.input}
        label='Current password'
        value={values.currentPassword}
        onChangeText={handleChange('currentPassword')}
        onBlur={handleBlur('currentPassword')}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        label='New password'
        value={values.newPassword}
        onChangeText={handleChange('newPassword')}
        onBlur={handleBlur('newPassword')}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        label='Confirm new password'
        value={values.confirmNewPassword}
        onChangeText={handleChange('confirmNewPassword')}
        onBlur={handleBlur('confirmNewPassword')}
        secureTextEntry
      />
      <Button
        mode='contained'
        onPress={handleSubmit}
        disabled={isDisabled}
        loading={changePassword.isLoading}
      >
        Confirm password update
      </Button>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: 24
  },
  input: {
    marginBottom: 12
  },
  title: {
    textAlign: 'center',
    marginBottom: 12
  }
})
export default ChangePassword
