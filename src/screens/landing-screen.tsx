import { View, Text, Image, StyleSheet } from 'react-native'
import { Button, Paragraph, Title } from 'react-native-paper'

import { ScreenProps } from '../typings/navigation'

const LandingScreen = ({ navigation }: ScreenProps<'Landing'>) => {
  const handlePress = () => {
    navigation.navigate('Login')
  }
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Title style={styles.companyName}>
          <Text style={styles.highlight}>Easy</Text>Drive
        </Title>
        <Paragraph style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, harum
          nobis officiis accusantium cupiditate vitae ipsa quasi culpa amet error.
        </Paragraph>
      </View>
      <Image source={require('../assets/images/landing.png')} style={styles.image} />
      <Button mode='contained' onPress={handlePress}>
        Get Started
      </Button>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  textContainer: {
    alignItems: 'center'
  },
  companyName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12
  },
  paragraph: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 25
  },
  highlight: {
    color: '#6200EE'
  },
  image: {
    width: '100%',
    flex: 1,
    resizeMode: 'cover',
    marginVertical: 12
  }
})
export default LandingScreen
