import { useState } from 'react'
import { ScrollView, Switch, Text, TextInput, View } from 'react-native'
import { Link } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Logo from './../src/assets/logo.svg'
import { TouchableOpacity } from 'react-native-gesture-handler'

const NewMemory = () => {
  const { top, bottom } = useSafeAreaInsets()
  const [isPublic, setIsPublic] = useState<boolean>(false)

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{
        paddingTop: top,
        paddingBottom: bottom + 60,
      }}
      style={{}}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <Logo />
        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Feather name="arrow-left" color={colors.gray[100]} size={16} />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-6">
        <View className="flex-row items-center justify-between gap-2">
          <Text className="font-body text-base text-gray-200">
            tornar memória pública
          </Text>
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            trackColor={{ false: '#767577', true: '#372560' }}
            thumbColor={isPublic ? '#9B79EA' : '#9E9EA0'}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
        >
          <View className="flex-row items-center gap-2">
            <Feather name="image" color={colors.gray[100]} />
            <Text className="font-body text-sm text-gray-200">
              Adicionar foto ou vídeo de capa
            </Text>
          </View>
        </TouchableOpacity>
        <TextInput
          multiline
          className="p-0 font-body text-lg text-gray-50"
          placeholderTextColor={colors.gray[500]}
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre a experiência que você quer lembrar para sempre"
        />

        <TouchableOpacity
          activeOpacity={0.7}
          className="items-center self-end rounded-full bg-green-500 px-5 py-2"
          onPress={() => console.log('Clicou')}
        >
          <Text className="font-alt text-sm uppercase text-black">Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default NewMemory
