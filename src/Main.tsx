import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoadingSpinner from './components/ui/loading-spinner'
import { theme } from './constants/theme'
import { useUser } from './hooks/use-user'
import ForgotPasswordScreen from './screens/fogot-password-screen'
import HistoryScreen from './screens/history-screen'
import HomeScreen from './screens/home-screen'
import LandingScreen from './screens/landing-screen'
import LoginScreen from './screens/login-screen'
import PackageDetailScreen from './screens/package-detail-screen'
import PackagesScreen from './screens/packages-screen'
import PaymentScreen from './screens/payment-screen'
import ProfileScreen from './screens/profile-screen'
import ResetPasswordScreen from './screens/reset-password-screen'
import SignupScreen from './screens/signup-screen'
import VerifyResetTokenScreen from './screens/verify-reset-token-screen'
import { BottomTabParamList, RootStackParamList } from './typings/navigation'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()
const Stack = createNativeStackNavigator<RootStackParamList>()

const RenderBottomTabs = () => {
  return (
    <BottomTab.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='home' size={size} color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name='Packages'
        component={PackagesScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='apps' size={size} color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name='History'
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='time' size={size} color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons size={size} color={color} name='person' />
          )
        }}
      />
    </BottomTab.Navigator>
  )
}
const Main = () => {
  const { data: user, isLoading } = useUser()
  if (isLoading) return <LoadingSpinner />
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name='HomePage' component={RenderBottomTabs} />
            <Stack.Screen name='Payment' component={PaymentScreen} />
            <Stack.Screen
              name='PackageDetail'
              component={PackageDetailScreen}
              options={{ headerShown: true }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name='Landing' component={LandingScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
            <Stack.Screen name='Signup' component={SignupScreen} />
            <Stack.Screen
              name='VerifyResetToken'
              component={VerifyResetTokenScreen}
            />
            <Stack.Screen name='ResetPassword' component={ResetPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Main
