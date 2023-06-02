import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, ImageBackground, View } from 'react-native'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { styled } from 'nativewind'
import colors from 'tailwindcss/colors'
import * as SecureStore from 'expo-secure-store'

import blurBackground from './../src/assets/bg-blur.png'
import Stripes from './../src/assets/stripes.svg'
import { Stack } from 'expo-router'
import { useEffect, useState } from 'react'

const StyledStripes = styled(Stripes)

const Layout = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    undefined | boolean
  >(undefined)
  const [isLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      setIsUserAuthenticated(!!token)
    })
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
      className="relative flex-1 bg-gray-900"
      imageStyle={{
        position: 'absolute',
        left: '-100%',
      }}
    >
      <StatusBar style="light" translucent />
      <StyledStripes height={844} width={8} className="absolute left-2" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="memories" />
      </Stack>
    </ImageBackground>
  )
}

export default Layout
