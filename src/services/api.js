import axios from 'axios';

// URL Filmes em cartaz
// movie/now_playing ?api_key=4c8992456106b45df4efeac63acacb0b&language=pt-BR&page=1
export const key = '4c8992456106b45df4efeac63acacb0b' 

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3'
})

export default api;