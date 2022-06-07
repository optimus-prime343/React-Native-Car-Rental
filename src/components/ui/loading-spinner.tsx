import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ActivityIndicator, useTheme } from 'react-native-paper'

const LoadingSpinner = () => {
  const { colors } = useTheme()
  return (
    <View style={styles.container}>
      <ActivityIndicator animating color={colors.primary} size={50} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default LoadingSpinner
