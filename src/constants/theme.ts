import { DefaultTheme as NavigationTheme, Theme } from '@react-navigation/native'
import { DefaultTheme as PaperTheme } from 'react-native-paper'

export const theme: Theme = {
  ...NavigationTheme,
  ...PaperTheme,
  colors: {
    ...NavigationTheme.colors,
    ...PaperTheme.colors
  }
}
