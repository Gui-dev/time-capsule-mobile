import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import colors from 'tailwindcss/colors'
import * as SecureStore from 'expo-secure-store'
import { useRouter } from 'expo-router'

import Logo from './../src/assets/logo.svg'
import { api } from './../src/lib/api'

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/7fde7a3674230d176138',
}

export default function App() {
  const router = useRouter()
  const [isLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '7fde7a3674230d176138',
      scopes: ['identify'],
      redirectUri: makeRedirectUri({
        scheme: 'time-capsule',
      }),
    },
    discovery,
  )

  const handleGithubOAuthCode = async (code: string) => {
    try {
      const response = await api.post('/register', {
        code,
      })
      const { token } = response.data
      await SecureStore.setItemAsync('token', token)
      router.push('/memories')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // console.log(
    //   makeRedirectUri({
    //     scheme: 'time-capsule',
    //   }),
    // )
    if (response?.type === 'success') {
      const { code } = response.params
      handleGithubOAuthCode(code)
    }
  }, [response])

  if (!isLoadedFonts) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <ActivityIndicator size="large" color={colors.green[700]} />
      </View>
    )
  }

  return (
    <View className="flex-1 items-center px-8 py-10">
      <View className="flex-1 items-center justify-center gap-6">
        <Logo height={20} width={210} />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2"
          onPress={() => signInWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            CADASTRAR LEMBRANÇA
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💚 by Gui Silva
      </Text>
      <StatusBar style="light" translucent />
    </View>
  )
}
