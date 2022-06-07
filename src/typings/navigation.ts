import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import {
  CompositeScreenProps,
  NavigatorScreenParams
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { Package } from './package'

export type RootStackParamList = {
  Landing: undefined
  Login: undefined
  ForgotPassword: undefined
  Signup: undefined
  HomePage: NavigatorScreenParams<BottomTabParamList>
  VerifyResetToken: undefined
  ResetPassword: {
    token: string
  }
  Payment: {
    package: Package
  }
  PackageDetail: {
    package: Package
  }
}
export type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>
export type BottomTabParamList = {
  Home: undefined
  Packages: undefined
  History: undefined
  Profile: undefined
}

export type CombinedScreenProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >
