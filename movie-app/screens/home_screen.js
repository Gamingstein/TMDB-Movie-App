import { View, Text, TouchableOpacity, ScrollView, Image, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native'
import { style } from "../themes";
import { useNavigation } from '@react-navigation/native'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import TrendingMovies from '../components/trendingmovies';
import MovieList from '../components/movielist';
import Loading from '../components/loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';

const ios = Platform.OS == 'ios';
const mrg = ios ? "" : "mt-16";

export default function HomeScreen() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);

    useEffect(() => {
        getTrending()
        getUpcoming()
        getTopRated()
    }, [])
    const getTrending = async () => {
        const data = await fetchTrendingMovies()
        if (data && data.results) setTrending(data.results)
        setLoading(false)
    }
    const getUpcoming = async () => {
        const data = await fetchUpcomingMovies()
        if (data && data.results) setUpcoming(data.results)
    }
    const getTopRated = async () => {
        const data = await fetchTopRatedMovies()
        if (data && data.results) setTopRated(data.results)
    }


    return (
        <View className="flex-1 bg-neutral-800">
            <SafeAreaView className={`mb-5 ${mrg}`}>
                <StatusBar style="light" />
                <View className="flex-row justify-between items-center mx-4">
                    <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
                    <Text className="font-bold text-white text-3xl">
<<<<<<< HEAD
                        Movies<Text style={style.text}>Hub</Text>
=======
                        <Text style={style.text}>Movies</Text>Hub
>>>>>>> origin/main
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size={30} strokeWidth={2} color={"white"} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {
                loading ? (
                    <Loading />
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 10 }}
                    >
                        {trending.length > 0 && <TrendingMovies data={trending} />}
                        <MovieList title={"Upcoming"} data={upcoming} />
                        <MovieList title={"Top Rated"} data={topRated} />
                    </ScrollView>

                )
            }

        </View>
        // <Image source={require('../assets/images/tmp.png')} style={{ width: 100, height: 200 }} />
    )
}
