import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, ImageBackground, Text, View } from 'react-native'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import colors from 'tailwindcss/colors'

import blurBackground from './src/assets/bg-blur.png'
import Logo from './src/assets/logo.svg'

export default function App() {
  const [isLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!isLoadedFonts) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <ActivityIndicator size="large" color={colors.green[700]} />
      </View>
    )
  }

  return (
    <ImageBackground
      source={blurBackground}
      className="relative flex-1 items-center bg-gray-900"
      imageStyle={{
        position: 'absolute',
        left: '-100%',
      }}
    >
      <Text className="font-alt text-5xl text-gray-50">Hello World!</Text>
      <Logo height={20} width={210} />
      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
