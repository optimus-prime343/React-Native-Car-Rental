import { useFormik } from 'formik'
import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, TextInput, Title } from 'react-native-paper'
import { useToast } from 'react-native-toast-notifications'

import { useUpdateUser } from '../hooks/use-update-user'
import { useUser } from '../hooks/use-user'

const UpdateProfileInfo = () => {
  const toast = useToast()
  const updateUser = useUpdateUser()
  const { data: user } = useUser()
  const { handleChange, handleBlur, values, handleSubmit } = useFormik({
    initialValues: {
      name: user?.name ?? '',
      email: user?.email ?? ''
    },
    onSubmit: async values => {
      if (!user) return
      try {
        const message = await updateUser.mutateAsync({ id: user.id, ...values })
        toast.show(message, { type: 'success' })
      } catch (error: any) {
        toast.show(error.message, { type: 'danger' })
      }
    }
  })
  const isProfileInfoChanged = useMemo<boolean>(() => {
    return values.name !== user?.name || values.email !== user?.email
  }, [values, user])

  return (
    <View>
      <Title style={styles.title}>Update profile information</Title>
      <TextInput
        label='Name'
        value={values.name}
        onChangeText={handleChange('name')}
        onBlur={handleBlur('name')}
        style={styles.input}
      />
      <TextInput
        label='Email'
        value={values.email}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        style={styles.input}
      />
      <Button
        mode='contained'
        onPress={handleSubmit}
        disabled={!isProfileInfoChanged}
        loading={updateUser.isLoading}
      >
        Update Profile Information
      </Button>
    </View>
  )
}
const styles = StyleSheet.create({
  input: {
    marginBottom: 12
  },
  title: {
    textAlign: 'center',
    marginBottom: 12
  }
})
export default UpdateProfileInfo
