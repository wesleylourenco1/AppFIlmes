export function getSizeMovie(size, list){
    let listMovie = [];
    for(let i = 0, l = size; i<l; i++){
        listMovie.push(list[i]);
    }
    return listMovie;
}
export function randomBanner(movies){
    return Math.floor(Math.random()* movies.length)
}
