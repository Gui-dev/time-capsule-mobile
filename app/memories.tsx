import { Link, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import colors from 'tailwindcss/colors'
import { Feather } from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'

import Logo from './../src/assets/logo.svg'
import { api } from '../src/lib/api'

interface IMemory {
  id: string
  excerpt: string
  coverUrl: string
  createdAt: string
}

const Memories = () => {
  const { top, bottom } = useSafeAreaInsets()
  const router = useRouter()
  const [memories, setMemories] = useState<IMemory[]>([])

  const handleSignOut = async () => {
    await SecureStore.deleteItemAsync('token')
    router.push('/')
  }

  const loadMemories = async () => {
    const token = await SecureStore.getItemAsync('token')
    const response = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setMemories(response.data)
  }

  useEffect(() => {
    loadMemories()
  }, [])

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        paddingTop: top,
        paddingBottom: bottom + 60,
      }}
      style={{}}
    >
      <View className="mt-4 flex-row items-center justify-between px-8">
        <Logo />
        <View className="flex-row gap-2">
          <Link href="/new" asChild>
            <TouchableOpacity className="h-8 w-8 items-center justify-center rounded-full bg-green-500">
              <Feather name="plus" color={colors.gray[900]} size={16} />
            </TouchableOpacity>
          </Link>

          <TouchableOpacity
            className="h-8 w-8 items-center justify-center rounded-full bg-red-500"
            onPress={handleSignOut}
          >
            <Feather name="log-out" color={colors.gray[900]} size={16} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-6 space-y-10">
        {memories.map((memory) => {
          return (
            <View key={memory.id} className="space-y-4">
              <View className="flex-row items-center gap-2">
                <View className="h-px w-5 bg-gray-50" />
                <Text className="font-body text-xs text-gray-100">
                  {dayjs(memory.createdAt)
                    .locale(ptBr)
                    .format('D[ de ]MMMM[, ]YYYY')}
                </Text>
              </View>
              <View className="space-y-4 px-8">
                <Image
                  source={{ uri: memory.coverUrl }}
                  alt=""
                  className="aspect-video w-full rounded-lg"
                />
                <Text className="font-body text-base leading-relaxed text-gray-100">
                  {memory.excerpt}
                </Text>
                <Link href="/memories/:id" asChild>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-row items-center gap-2"
                  >
                    <Text className="font-body text-sm text-gray-200">
                      Ler mais
                    </Text>
                    <Feather
                      name="arrow-right"
                      size={16}
                      color={colors.gray[400]}
                      className="mr-6"
                    />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default Memories
