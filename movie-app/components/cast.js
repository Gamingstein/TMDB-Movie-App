import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { fallbackPersonImage, image185 } from '../api/moviedb'

export default function Cast({ navigation, cast }) {
    let personName = 'Robert Pattinson'
    let characterName = 'Bruce Wayne'
    return (
        <View className='my-6'>
            <Text className='text-lg text-white mx-4 mb-5'>Top Cast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
                {cast && cast.map((person, index) => {
                    return (
                        <TouchableOpacity key={index} className='mr-5 items-center' onPress={() => navigation.navigate('Person', person)}>
                            <View className='rounded-full overflow-hidden h-20 w-20 items-center border-neutral-800 border'>
                                <Image
                                    source={{ uri: image185(person?.profile_path) || fallbackPersonImage }}
                                    // source={require("../assets/images/tmp.png")}
                                    className='rounded-2xl h-24 w-20'
                                />
                            </View>
                            <Text className='text-white text-xs mt-1'>
                                {person?.character?.length >= 15 ? person?.character?.slice(0, 10) + '...' : person?.character}
                            </Text>
                            <Text className='text-neutral-400 text-xs mt-1 text-center'>
                                {person?.name?.length > 17 ? person?.name?.slice(0, 17) + "..." : person?.name}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}