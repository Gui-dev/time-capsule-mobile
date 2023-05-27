import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, Text, View } from 'react-native'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import colors from 'tailwindcss/colors'

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
    <View className="flex-1 items-center justify-center bg-gray-900">
      <Text className="font-alt text-5xl text-gray-50">Hello World!</Text>
      <StatusBar style="light" translucent />
    </View>
  )
}
