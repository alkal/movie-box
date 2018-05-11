/**************************************************
    Project: Movie App - Javascript File
    Version: 1.0	
***************************************************/


$(function(){
    
    function getPopularMovies(currentPage){
        const popularMoviesURL =`${apiBaseURL}movie/popular?api_key=${apiKey}&page=${currentPage} `;
        
        clearSidebar(); //clear DOM
        
        $.getJSON( popularMoviesURL, function( json ) {
            
            modifyNavigationbar(`${json.page}`,`${json.total_pages}`)
            
            $.each(json.results, function (i, item){
                // Request Details assign to variables
                let movieID = item.id;
                let moviePoster = imageBaseUrl+'w92'+item.poster_path;
                let movieTitle = item.original_title;

                addMovieToList (`${movieID}`,`${moviePoster}`,`${movieTitle}`);
            } );
        })
        .fail(function() {
            contentInit('error');
        });

    } // END of getPopularMovies

    function getMoviesByID(movie_id){
        const getMoviesByIdURL =`${apiBaseURL}movie/${movie_id}?api_key=${apiKey}`;
        
        clearMainContent(); //clear DOM
        
        $.getJSON(getMoviesByIdURL, function(movieData){
            //console.log(movieData)

            // Request Details assign to variables
            let movieTitle=movieData.title;
            let movieOverview=movieData.overview;
            let poster = imageBaseUrl+'w300'+movieData.poster_path;
            let releaseYear=movieData.release_date.slice(0,4);
            let userScore=movieData.vote_average*10;
            let userVoteCount=movieData.vote_count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
            let releaseDate=reverseString(movieData.release_date);
            let movieRuntime=movieData.runtime;

            let genreItems='';
            for(let i = 0; i<movieData.genres.length; i++){
                genreItems+=`<span class="label label-default">${movieData.genres[i].name}</span>`;
            }

            displaySingleMovieItem(movieTitle,movieOverview,poster,releaseYear,userScore,userVoteCount,releaseDate,movieRuntime,genreItems);

        })
        .fail(function() {
            contentInit('error');
        });
    }// END of getMoviesByID

    
    // On-click Event assign to navigation buttons
    $('.btn-group .btn').on('click',function(){

        if(($(this).attr('data-nav')=='next')){
            currentPage+=1;
            contentInit('nav');
            getPopularMovies(currentPage);
        }
        else if(($(this).attr('data-nav')=='prev')){
            currentPage-=1;
            contentInit('nav');
            getPopularMovies(currentPage);
        } 
    });

    // On-click Event assign to movie's title
    $('body').on("click",'.movieListItem', function(){
        sigleItem=( $(this).attr('data-target'));
        getMoviesByID(sigleItem);
    });

    // On-click Event assign to movie's thumbnail, ONLY FOR mobile devices
    $('body').on("click",'.thumbnail', function(){
        sigleItem=( $(this).attr('data-item'));
        getMoviesByID(sigleItem);
    });

    // On-click Event assign to logo app
    $('.navbar-brand').on('click',function(){
        contentInit();
        getPopularMovies();
    });

    contentInit();

    getPopularMovies();

});


