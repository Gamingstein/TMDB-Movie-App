import axios from 'axios'
import { apiKey } from '../constants'

const apiBaseUrl = "https://api.themoviedb.org/3"
const TrendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const UpcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`

const movieDetailEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`
const movieSimilarEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`
const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`

const searchMovieEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`

const personDetailEndpoint = id => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`
const personMoviesEndpoint = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`

export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null

export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }
    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.log("error", error)
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(TrendingMoviesEndpoint)
}
export const fetchUpcomingMovies = () => {
    return apiCall(UpcomingMoviesEndpoint)
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint)
}

export const fetchMovieDetails = id => {
    return apiCall(movieDetailEndpoint(id))
}
export const fetchMovieCredits = id => {
    return apiCall(movieCreditsEndpoint(id))
}
export const fetchSimilarMovies = id => {
    return apiCall(movieSimilarEndpoint(id))
}
export const fetchPersonDetails = id => {
    return apiCall(personDetailEndpoint(id))
}
export const fetchPersonMovies = id => {
    return apiCall(personMoviesEndpoint(id))
}
export const searchMovies = params => {
    return apiCall(searchMovieEndpoint, params)
}