import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import React from 'react'
import Corousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native'
import { fallbackMoviePoster, image500 } from '../api/moviedb';

var { width, height } = Dimensions.get('window');

const MovieCard = ({ item, handleClick }) => {
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <View>
                <Image source={{ uri: image500(item.poster_path) || fallbackMoviePoster }} style={{ width: width * 0.6, height: height * 0.4 }} className=" rounded-3xl" />
            </View>
        </TouchableWithoutFeedback>
    )
}

const TrendingMovies = ({ data }) => {
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('Movie', item);
    }
    return (
        <View className="mb-8">
            <Text className="text-white text-xl mb-5 mx-4">Trending</Text>
            <Corousel
                data={data}
                renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
                firstItem={1}
                inactiveSlideOpacity={0.6}
                sliderWidth={width}
                itemWidth={width * 0.68}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
            />
        </View>

    )
}

export default TrendingMovies