import { useRef } from 'react'
import { View, TextInputProps, TextInput, StyleSheet } from 'react-native'

interface Props extends TextInputProps {
  icon?: JSX.Element
}

const CustomInput = ({ icon, ...rest }: Props) => {
  const inputRef = useRef<TextInput | null>(null)
  return (
    <View
      style={[
        styles.inputContainer,
        inputRef.current?.isFocused() ? styles.inputFocused : null
      ]}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <TextInput {...rest} style={styles.input} ref={inputRef} />
    </View>
  )
}
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4
  },
  input: {
    flex: 1,
    padding: 8
  },
  inputFocused: {
    borderColor: 'green'
  },
  iconContainer: {
    alignSelf: 'center',
    paddingHorizontal: 6
  }
})
export default CustomInput
