const main=document.getElementById('main')
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e60196be91358ae862773b990c7fa4c5&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=e60196be91358ae862773b990c7fa4c5&query="';


const form=document.getElementById('form');
const search=document.getElementById('search');
// Get initial movies
getMovies(API_URL);

async function getMovies(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        showMovies(data.results);  // Successfully fetched data
    } catch (error) {
        console.error('Error fetching the movies:', error);  // Error handling
    }
}
function showMovies(movies){
    main.innerHTML=''
    movies.forEach((movie)=>{
        const {title,poster_path,vote_average,overview }=movie
        const movieEl=document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML=`
         
            <img src="${IMG_PATH +poster_path}" alt="${title}" >
            <div class="movie-info">
             <h3>${title}</h3>
             <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
             <h3>Overview</h3>
             ${overview}
            </div>
         
        `
        main.appendChild(movieEl)
    })
}
function getClassByRate(vote){
    if(vote>=8)
        return 'green'
    else if(vote>=5)
            return 'orange'
    else return 'red'
    
}
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const searchTerm=search.value;
    if(searchTerm && searchTerm !=='') {
        getMovies(SEARCH_API+searchTerm)
        search.value=''
    }
    else{
        window.location.reload();
    }
});





// const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e60196be91358ae862773b990c7fa4c5&page=1';
// const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
// const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=e60196be91358ae862773b990c7fa4c5&query=';

// const form = document.getElementById('form');
// const search = document.getElementById('search');

// // Get initial movies
// getMovies(API_URL);

// async function getMovies(url) {
//     try {
//         const res = await fetch(url);
//         const data = await res.json();
//         console.log(data.results);  // Successfully fetched data
//     } catch (error) {
//         console.error('Error fetching the movies:', error);  // Error handling
//     }
// }

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const searchTerm = search.value.trim(); // Trim to remove excess spaces

//     if (searchTerm && searchTerm !== '') {
//         getMovies(SEARCH_API + encodeURIComponent(searchTerm)); // Encode search term
//         search.value = '';
//     } else {
//         window.location.reload();
//     }
// });
