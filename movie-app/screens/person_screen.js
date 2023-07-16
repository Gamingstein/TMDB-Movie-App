import { View, Text, Dimensions, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { style } from '../themes'
import MovieList from '../components/movielist'
import Loading from '../components/loading'
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from '../api/moviedb'


var { width, height } = Dimensions.get('window');

const ios = Platform.OS == 'ios';
const mrg = ios ? "" : "mt-16";

export default function PersonScreen() {
    const { params: item } = useRoute()
    const [isfav, setIsfav] = useState(false)
    const [person, setPerson] = useState({})
    const [personMovies, setPersonMovies] = useState([])
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        setLoading(true)
        // console.log(item)
        getPersonDetails(item.id)
        getPersonMovies(item.id)
    }, [item])

    const getPersonDetails = async (id) => {
        const data = await fetchPersonDetails(id)
        if (data) setPerson(data)
        setLoading(false)
    }
    const getPersonMovies = async (id) => {
        const data = await fetchPersonMovies(id)
        if (data && data.cast) setPersonMovies(data.cast)
    }
    return (
        <ScrollView className='flex-1 bg-neutral-900' contentContainerStyle={{ paddingBottom: 20 }}>
            <SafeAreaView className={`flex-row justify-between items-center mx-4 ${mrg}`}>
                <TouchableOpacity className='rounded-full p-2 bg-transparent' onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size={28} strokeWidth={2.5} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsfav(!isfav)}>
                    <HeartIcon size={35} color={isfav ? 'red' : 'white'} />
                </TouchableOpacity>
            </SafeAreaView>
            {
                loading ? (
                    <Loading />
                ) : (
                    <View>
                        <View className='flex-row justify-center'
                            style={{
                                shadowColor: 'gray',
                                shadowRadius: 40,
                                shadowOffset: { width: 0, height: 5 },
                                shadowOpacity: 1
                            }}
                        >
                            <View className='rounded-full overflow-hidden items-center h-72 w-72'

                            >
                                <Image
                                    source={{ uri: image342(person?.profile_path) || fallbackPersonImage }}
                                    style={{ width: width * 0.74, height: height * 0.43 }} />
                            </View>
                        </View>
                        <View className='mt-6'>
                            <Text className='text-3xl text-white font-bold text-center'>
                                {person?.name}
                            </Text>
                            <Text className='text-base text-neutral-500 text-center'>
                                {person?.place_of_birth}
                            </Text>
                        </View>
                        <View className='mx-3 p-4 mt-6 flex-row justify-between items-center rounded-full bg-neutral-700'>
                            <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                                <Text className='text-white font-semibold'>Gender</Text>
                                <Text className='text-neutral-400 text-sm'>{person?.gender == 1 ? 'Female' : 'Male'}</Text>
                            </View>
                            <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                                <Text className='text-white font-semibold'>Birthday</Text>
                                <Text className='text-neutral-400 text-sm'>{person?.birthday}</Text>
                            </View>
                            <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                                <Text className='text-white font-semibold'>Known for</Text>
                                <Text className='text-neutral-400 text-sm'>{person?.known_for_department}</Text>
                            </View>
                            <View className='px-2 items-center'>
                                <Text className='text-white font-semibold'>Popularity</Text>
                                <Text className='text-neutral-400 text-sm'>{person.popularity}</Text>
                            </View>
                        </View>
                        <View className='my-6 mx-4 space-y-2'>
                            {person?.biography?.length > 0 ? (
                                <>
                                    <Text className='text-lg text-white'>Biography</Text>
                                    <Text className='text-neutral-400 tracking-wide'>{person.biography}</Text>
                                </>
                            ) : null}
                        </View>
                        <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} />
                    </View>
                )}
        </ScrollView>
    )
}