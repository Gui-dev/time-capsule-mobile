import { useState } from 'react'
import {
  Alert,
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native'
import { Link, useRouter } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from 'expo-secure-store'

import Logo from './../src/assets/logo.svg'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { api } from '../src/lib/api'

const NewMemory = () => {
  const { top, bottom } = useSafeAreaInsets()
  const router = useRouter()
  const [isPublic, setIsPublic] = useState<boolean>(false)
  const [content, setContent] = useState<string>('')
  const [preview, setPreview] = useState<string | null>(null)

  const openImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      })
      if (!result.canceled) {
        setPreview(result.assets[0].uri)
      }
    } catch (error) {
      Alert.alert('Opssss', 'Você deve selecionar uma imagem')
    }
  }

  const handleCreateMemory = async () => {
    const token = await SecureStore.getItemAsync('token')
    let coverUrl = ''

    if (preview) {
      const uploadFormData = new FormData()
      uploadFormData.append('file', {
        name: 'image.jpg',
        type: 'image/jpeg',
        uri: preview,
      } as any)
      const uploadResponse = await api.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      coverUrl = uploadResponse.data.fileUrl
    }

    await api.post(
      '/memories',
      {
        content,
        isPublic,
        coverUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    router.push('/memories')
  }

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
          onPress={openImagePicker}
        >
          {preview ? (
            <Image
              source={{ uri: preview }}
              className="h-full w-full rounded-lg object-cover"
              alt=""
            />
          ) : (
            <View className="flex-row items-center gap-2">
              <Feather name="image" color={colors.gray[100]} />
              <Text className="font-body text-sm text-gray-200">
                Adicionar foto ou vídeo de capa
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TextInput
          multiline
          className="p-0 font-body text-lg text-gray-50"
          placeholderTextColor={colors.gray[500]}
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre a experiência que você quer lembrar para sempre"
          value={content}
          onChangeText={setContent}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          className="items-center self-end rounded-full bg-green-500 px-5 py-2"
          onPress={handleCreateMemory}
        >
          <Text className="font-alt text-sm uppercase text-black">Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default NewMemory
