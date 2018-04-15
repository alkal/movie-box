/**************************************************
    Project: Movie App - Javascript File
    Version: 1.0	
***************************************************/

const apiKey='9198fa6d9a9713bc6b03ee9582525917';
const apiBaseURL = 'http://api.themoviedb.org/3/';
const imageBaseUrl = 'https://image.tmdb.org/t/p/';

function getPopularMovies(){
    const popularMoviesURL = apiBaseURL + 'movie/popular?api_key=' + apiKey;
    var jsonObject=$.getJSON( popularMoviesURL, function( json ) {
        console.log( json );
        currentPage=json.page;
        console.log( currentPage );
        totalPages=json.total_pages;
        console.log( totalPages );
        return [currentPage,totalPages];      
    })
    .fail(function() {
        // if request is failed
        console.log( "error" );
    });

    return jsonObject;
}

var malakia=getPopularMovies();
console.log(malakia);

