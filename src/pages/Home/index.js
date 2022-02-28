import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, Text } from 'react-native';

import {
    Container,
    SearchContainer,
    Input,
    SearchButton,
    Title,
    BannerButton,
    Banner,
    SliderMovie
} from './styles';
import { Feather } from '@expo/vector-icons';
import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem'

import api, { key } from '../../services/api.js';
import { getSizeMovie, randomBanner } from '../../utils/sizeMovie';
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();

function Home() {

    const [nowMovies, setNowMovies] = useState([]);
    const [PopularMovies, setPopularMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [bannerMovie, setBannerMovie] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

        const ac = new AbortController();

        async function getMovies() {

            const [nowData, popularData, topData] = await Promise.all([
                api.get('/movie/now_playing', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
                api.get('/movie/popular', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
                api.get('/movie/top_rated', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
            ])
            if (isActive) {
                const listTopMovies = getSizeMovie(6, topData.data.results);

                setNowMovies(getSizeMovie(10, nowData.data.results));
                setPopularMovies(getSizeMovie(8, popularData.data.results));
                setTopMovies(listTopMovies);
                setLoading(false);
                setBannerMovie(nowData.data.results[randomBanner(nowData.data.results)])

            }


        }
        getMovies();
        return ()=>{
            isActive = false;
            ac.abort(); 
        }
    }, [])


    function navigateDetailsPage(item){
        navigation.navigate('Detail');
    }

    if (loading) {
        return (
            <Container>
                <ActivityIndicator size="large" color="#fff"
                />
            </Container>
        )
    }

    return (
        <Container>
            <Header title="React Prime" />
            <SearchContainer>
                <Input
                    placeholder='Ex Vingadores'
                    placeholderTextColor='#ddd'
                />
                <SearchButton>
                    <Feather name='search' size={30} color="#fff"></Feather>
                </SearchButton>
            </SearchContainer>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Title>Em cartaz</Title>

                <BannerButton
                    activeOpacity={0.9}
                    onPress={() => navigateDetailsPage(bannerMovie)}
                >
                    <Banner
                        resizeMethod="resize"
                        source={{ uri: `https://images.tmdb.org/t/p/original/${bannerMovie.poster_path}` }}
                    />
                </BannerButton>

                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={nowMovies}
                    renderItem={({ item }) => <SliderItem data={item} navigatePage={()=>navigateDetailsPage(item)}/>}
                    keyExtrator={(item) => String(item.id)}
                />

                <Title>Populares</Title>
                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={PopularMovies}
                    renderItem={({ item }) => <SliderItem data={item} navigatePage={()=>navigateDetailsPage(item)} />}
                    keyExtrator={(item) => String(item.id)}
                />

                <Title>Mais Votados</Title>
                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={topMovies}
                    renderItem={({ item }) => <SliderItem data={item} navigatePage={()=>navigateDetailsPage(item)} />}
                    keyExtrator={(item) => String(item.id)}
                />
            </ScrollView>
        </Container>
    )
}

export default Home; 