import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import React from 'react'
import { style } from '../themes'
import { useNavigation } from '@react-navigation/native'
import { fallbackMoviePoster, image185 } from '../api/moviedb';

var { width, height } = Dimensions.get('window');

export default function MovieList({ title, data, hideSeeAll }) {
    let Moviename = 'Batman'
    const navigation = useNavigation();
    return (
        <View className="space-y-4 mb-8" >
            <View className="mx-4 flex-row justify-between items-center">
                <Text className="text-white text-xl">{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity>
                            <Text style={style.text} className='text-xl'>See All</Text>
                        </TouchableOpacity>

                    )
                }
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }} >
                {data.map((item, index) => {
                    return (
                        <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Movie', item)}>
                            <View className='space-y-1 mr-4'>
                                <Image source={{ uri: image185(item.poster_path) || fallbackMoviePoster }} className='rounded-3xl' style={{ width: width * 0.33, height: height * 0.22 }} />
                                <Text className='text-neutral-300 ml-1'>
                                    {item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                })}
            </ScrollView>
        </View>
    )
}