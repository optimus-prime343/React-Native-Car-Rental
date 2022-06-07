import { StyleSheet, ScrollView } from 'react-native'
import { Button, Divider } from 'react-native-paper'
import { useToast } from 'react-native-toast-notifications'
import { useQueryClient } from 'react-query'

import ChangePassword from '../components/change-password'
import UpdateProfileInfo from '../components/update-profile-info'
import { autoLogout } from '../utils/auth'

const ProfileScreen = () => {
  const toast = useToast()
  const queryClient = useQueryClient()

  const handleLogout = async () => {
    await autoLogout(() => queryClient.setQueryData(['user'], null))
    await queryClient.invalidateQueries(['subscriptions'])
    toast.show('Logged out')
  }
  return (
    <ScrollView style={styles.container}>
      <UpdateProfileInfo />
      <Divider />
      <ChangePassword />
      <Button icon='exit-to-app' style={styles.logoutButton} onPress={handleLogout}>
        Logout
      </Button>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 12
  },
  logoutButton: {
    marginTop: 12
  }
})
export default ProfileScreen
