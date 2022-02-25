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
import { getSizeMovie } from '../../utils/sizeMovie';

function Home() {

    const [nowMovies, setNowMovies] = useState([]);
    const [PopularMovies, setPopularMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

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


            const listTopMovies = getSizeMovie(6, topData.data.results);

            setNowMovies(getSizeMovie(10, nowData.data.results));
            setPopularMovies(getSizeMovie(8, popularData.data.results));
            setTopMovies(listTopMovies);

            setLoading(false);

        }
        getMovies();
    }, [])

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
                    onPress={() => alert('teste')}
                >
                    <Banner
                        resizeMethod="resize"
                        source={{ uri: 'https://images.unsplash.com/photo-1602461601079-fb03b7b35e61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' }}
                    />
                </BannerButton>

                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={nowMovies}
                    renderItem={({ item }) => <SliderItem data={item} />}
                    keyExtrator={(item) => String(item.id)}
                />

                <Title>Populares</Title>
                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={PopularMovies}
                    renderItem={({ item }) => <SliderItem data={item} />}
                    keyExtrator={(item) => String(item.id)}
                />

                <Title>Mais Votados</Title>
                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={topMovies}
                    renderItem={({ item }) => <SliderItem data={item} />}
                    keyExtrator={(item) => String(item.id)}
                />
            </ScrollView>
        </Container>
    )
}

export default Home; 