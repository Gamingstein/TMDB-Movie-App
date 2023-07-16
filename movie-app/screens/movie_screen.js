import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { style, theme } from '../themes';
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../components/cast';
import MovieList from '../components/movielist';
import Loading from '../components/loading';
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500, image342, fallbackMoviePoster } from '../api/moviedb';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const mrg = ios ? "" : "mt-16";

export default function MovieScreen() {
    let Moviename = 'The Batman'
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({})
    const navigation = useNavigation();
    const [isfav, setIsfav] = useState(false)
    const [cast, setCast] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const { params: item } = useRoute()
    useEffect(() => {
        setLoading(true)
        getMovieDetails(item.id)
        getMovieCredits(item.id)
        getSimilarMovies(item.id)
    }, [item])
    const getMovieDetails = async (id) => {
        const data = await fetchMovieDetails(id)
        if (data) setMovie(data)
        setLoading(false)
    }
    const getMovieCredits = async (id) => {
        const data = await fetchMovieCredits(id)
        if (data && data.cast) setCast(data.cast)
    }
    const getSimilarMovies = async (id) => {
        const data = await fetchSimilarMovies(id)
        // console.log(data)
        if (data && data.results) setSimilarMovies(data.results)
    }
    return (
        <View className='flex-1 bg-neutral-900'>
            {
                loading ? (
                    <Loading />
                ) : (
                    <>
                        <View className='absolute flex-1 justify-between items-center'>
                            <Image
                                source={{ uri: image500(movie?.poster_path) || fallbackMoviePoster }}
                                style={{ width, height: height * 0.55 }}
                            />
                        </View>
                        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false} className="flex-1 bg-transparent">
                            <View className='w-full'>
                                <LinearGradient
                                    colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                    style={{
                                        width,
                                        height: height * 0.4
                                    }}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                    className='absolute bottom-0' />
                                <SafeAreaView className={`flex-row justify-between items-center mx-4 ${mrg}`}>
                                    <TouchableOpacity className='rounded-full p-2 bg-transparent' onPress={() => navigation.goBack()}>
                                        <ChevronLeftIcon size={28} strokeWidth={2.5} color={'white'} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setIsfav(!isfav)}>
                                        <HeartIcon size={35} color={isfav ? 'red' : 'white'} />
                                    </TouchableOpacity>
                                </SafeAreaView>
                                <View style={{ marginTop: (height * 0.3) }} className='space-y-6'>
                                    <Text className='text-white text-center text-3xl tracking-wider font-bold'>{movie?.title}</Text>
                                    <Text className='text-neutral-400 font-semibold text-base text-center'>{movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime} min</Text>
                                </View>
                            </View>
                            <View className='space-y-4 bg-neutral-900'>
                                <View className='flex-row justify-center mx-4 space-x-2'>
                                    {
                                        movie?.genres?.map((genres, index) => {
                                            let showDot = index + 1 != movie?.genres?.length;
                                            return (
                                                <Text key={index} className='text-neutral-400 font-semibold text-base text-center'>{genres?.name} {showDot ? "•" : null}</Text>
                                            )
                                        })
                                    }

                                </View>
                                <Text className='text-neutral-400 mx-4 tracking-wide'>
                                    {
                                        movie?.overview
                                    }
                                </Text>
                                {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}
                                {similarMovies.length > 0 && <MovieList data={similarMovies} title={'Similar Movies'} hideSeeAll={true} />}
                            </View>
                        </ScrollView>
                    </>
                )
            }
        </View>
    )
}