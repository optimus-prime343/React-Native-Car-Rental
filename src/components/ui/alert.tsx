import { ReactNode } from 'react'
import { View, Text, ViewStyle, StyleSheet, ViewProps } from 'react-native'

type Variant = 'success' | 'warning' | 'danger'

interface Props extends ViewProps {
  variant: Variant
  children: ReactNode
}
const Alert = ({ variant, children, style, ...rest }: Props) => {
  const variantStyles: Record<Variant, ViewStyle> = {
    danger: {
      backgroundColor: '#fa5252'
    },
    success: {
      backgroundColor: '#40c057'
    },
    warning: {
      backgroundColor: '#fab005'
    }
  }
  return (
    <View style={[variantStyles[variant], styles.container, style]} {...rest}>
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 4
  },
  text: {
    fontSize: 18,
    textAlign: 'center'
  }
})
export default Alert
