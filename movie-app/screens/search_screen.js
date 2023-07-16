import { View, Text, SafeAreaView, Platform, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading';
import { debounce } from 'lodash'
import { fallbackMoviePoster, image185, image500, searchMovies } from '../api/moviedb';

const ios = Platform.OS == 'ios';
const { width, height } = Dimensions.get('window')
const mrg = ios ? "" : "mt-16";

export default function SearchScreen() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([])
    let movieName = 'The Batman'

    const handleSearch = value => {
        if (value && value.length > 3) {
            setLoading(true)
            searchMovies({
                query: value,
                include_adult: 'false',
                language: 'en-US',
                page: '1',
            }).then(data => {
                setLoading(false)
                if (data && data.results) setResults(data.results)
            })
        } else {
            setLoading(false)
            setResults([])
        }
    }
    const handleTextDebouce = useCallback(debounce(handleSearch, 400), [])

    return (
        <SafeAreaView className={`bg-neutral-800 flex-1`}>
            <View className={`mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full ${mrg}`}>
                <TextInput
                    onChangeText={handleTextDebouce}
                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    className='pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wide'
                />
                <TouchableOpacity className='rounded-full p-3 m-1 bg-neutral-500' onPress={() => navigation.navigate('Home')}>
                    <XMarkIcon size={25} color={'white'} />
                </TouchableOpacity>
            </View>
            {
                loading ? (<Loading />) :
                    results.length > 0 ? (
                        <ScrollView showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                            className='space-y-3'
                        >
                            <Text className='text-white font-semibold ml-1'>Results ({results.length})</Text>
                            <View className='flex-row justify-between flex-wrap'>
                                {
                                    results.map((item, index) => {
                                        return (
                                            <TouchableWithoutFeedback
                                                key={index}
                                                onPress={() => navigation.push('Movie', item)}
                                            >
                                                <View className='space-y-2 mb-4'>

                                                    <Image source={{ uri: image185(item?.poster_path) || fallbackMoviePoster }}
                                                        className='rounded-3xl'
                                                        style={{ width: width * 0.44, height: height * 0.32 }}
                                                    />
                                                    <Text className='text-neutral-300 ml-1'>{item?.title.length > 22 ? item?.title.slice(0, 22) + '...' : item?.title}</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    ) : (
                        <View className='flex-row justify-center'>
                            <Image source={require('../assets/images/movieTime.png')} className='h-96 w-96' />
                        </View>
                    )
            }
        </SafeAreaView>
    )
}