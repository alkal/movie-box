/**************************************************
    Project: Movie App - Javascript File
    Version: 1.0	
***************************************************/


$(function(){
    const apiKey='9198fa6d9a9713bc6b03ee9582525917';
    const apiBaseURL = 'http://api.themoviedb.org/3/';
    const imageBaseUrl = 'https://image.tmdb.org/t/p/';
    let currentPage=1;
    let totalPages;

    function contentInit(status){

        // Intro Message
        var contentInit=`
        <div class="jumbotron">
        <h1>Movie Box</h1>
        <p>Movie Box is a web-based responsive application, developed with HTML, CSS, Javascript and Bootstrap with the usage of <em>The Movie Database API (version 3)</em>. In this version of application - for the purposes of demo - a list of <strong>most popular movies</strong> are presented. Feel free to use your desktop, tablet or mobile phone to navigate through the lists and retrieve meaningful details for movies.</p>
        </div>
        `;
        $('.col-sm-9.col-sm-offset-3').empty().append(contentInit);
        
        //When error occurred
        if(status==='error'){
            var alertMsg=`
                <div class="alert alert-danger" role="alert">
                    <p class="h5"><i class="fa fa-warning fa-lg"></i>&nbsp;Oops! The connection to the server failed. Try again or contact with support team!</p>
                </div>
            `;
            $('.jumbotron').append(alertMsg);
        }

        //When error occurred
        if(status==='nav'){
            var alertMsg=`
                <div class="alert alert-info" role="alert">
                    <p class="h5"><i class="fa fa-search fa-lg"></i>&nbsp;Continue your navigation through the list of popular movies!</p>
                </div>
            `;
            $('.jumbotron').append(alertMsg);
        }
    }

    function getPopularMovies(currentPage){
        const popularMoviesURL = apiBaseURL + 'movie/popular?api_key=' + apiKey + '&page='+currentPage;
        $.getJSON( popularMoviesURL, function( json ) {
            //console.log( json );

            //Navigation Buttons' Status
            if(currentPage>1){$('button[data-nav="prev"]').prop("disabled", false);}
            else{$('button[data-nav="prev"]').prop("disabled", true);}
            if(currentPage===json.total_pages){$('button[data-nav="next"]').prop("disabled", true);}

            //Sidebar Title
            $('#pagination-list dd').empty().append(json.page + '&nbsp;of&nbsp;' + json.total_pages);
            $('.visible-xs-12 h4>small').empty().append('('+json.page + '&nbsp;of&nbsp;' + json.total_pages+')');
            
            //Empty #Main_Content area for all devices
            $('#popularMoviesList').empty();
            $('.visible-xs-12 .row').empty();
            for(let i = 0; i<json.results.length; i++){
                
            // Request Details assign to variables
            let movieID = json.results[i].id;
            let moviePoster = imageBaseUrl+'w92'+json.results[i].poster_path;
            let movieTitle = json.results[i].original_title;

            //Add single row in HTML page, EXCLUDED mobile devices.
            let popularMovieEntity='';

                popularMovieEntity+=`
                    <li>
                    <a href="#" class="movieListItem" data-target="` +movieID+ `">
                        <span>`+ movieTitle +`</span>
                    </a>
                    </li>`;
                
                //Display single row to HTML page, EXCLUDED mobile devices 
                $('#popularMoviesList').append(popularMovieEntity);
                
            //Add single row in HTML page, ONLY FOR mobile devices.
            let popularMovieEntityMobile='';

                popularMovieEntityMobile+=`
                    <div class="col-xs-6">
                        <a class="thumbnail" data-item="`+movieID+`" data-toggle="modal" data-target="#mobileModal">
                            <img class="img-responsice "src="`+moviePoster+`">
                            <span class="h5">`+movieTitle+`</span>
                        </a>
                    </div>`;
                
                //Display single row to HTML page, ONLY FOR mobile devices 
                $('.visible-xs-12 .row').append(popularMovieEntityMobile);

            }
        })
        .fail(function() {
            contentInit('error');
        });

    } // END of getPopularMovies

    function getMoviesByID(movie_id){
        const getMoviesByIdURL = apiBaseURL + 'movie/' + movie_id + '?api_key=' + apiKey;
        
        $.getJSON(getMoviesByIdURL, function(movieData){
            console.log(movieData)

            // Request Details assign to variables
            var poster = imageBaseUrl+'w300'+movieData.poster_path;
            var releaseYear=movieData.release_date.slice(0,4);
            var userScore=movieData.vote_average*10;
            var userVoteCount=movieData.vote_count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
            var releaseDate=reverseString(movieData.release_date);

            var genreItems='';
            for(let i = 0; i<movieData.genres.length; i++){
                genreItems+=`<span class="label label-default">`+movieData.genres[i].name+`</span>`;
            }

            //Display Movie Details, EXCLUDED FOR Mobile Phones
            var movieHTML = `
                <h1 class="page-header">`+movieData.title+`&nbsp;<small>(`+releaseYear+`)</small></h1>
                <div class="row movieDataItem">
                    <div class="col-sm-12 col-md-4 col-lg-3">
                        <img class="img-responsive" src="`+poster+`" alt="`+movieData.title+`">
                    </div>
                    <div class="col-sm-12 col-md-8 col-lg-9">
                        <div class="row">
                            <div class="col-sm-12">
                                <ul class="list-inline">
                                    <li>
                                        <div class="c100 p`+userScore+` small orange">
                                            <span>`+userScore+`%</span>
                                            <div class="slice">
                                                <div class="bar"></div>
                                                <div class="fill"></div>
                                            </div>
                                        </div>
                                        <div class="pull-left h5"> User Score <br/><small>(Voted by `+userVoteCount+` users)</small></div>
                                    </li>
                                    <li>
                                        <i class="fa fa-clock-o pull-left"></i><h5>Duration: <small>`+movieData.runtime+`min</small></h5>
                                    </li>
                                    <li>
                                        <i class="fa fa-calendar pull-left"></i><h5>Release Date: <small>`+releaseDate+`</small></h5>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <h3>Overview</h3>
                                <p class="lead">`+movieData.overview+`</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <h4>Genres</h4>
                                `+genreItems+`
                            </div>
                        </div>
                    </div>
                </div>
            `;

            $('.col-sm-9.col-sm-offset-3').empty().append(movieHTML);


            //Display Movie Details, ONLY FOR Mobile Phones
            
            var movieHtmlMobile=`
                <div class="row">
                    <div class="col-sm-12">
                        <ul class="list-inline">
                            <li>
                                <h4><small><i class="fa fa-clock-o"></i>&nbsp;Duration:&nbsp;`+movieData.runtime+`min</small></h4>
                            </li>
                            <li>
                                <h4><small><i class="fa fa-calendar"></i>&nbsp;Release Date:&nbsp;`+releaseDate+`</small></h4>
                            </li>
                        </ul>
                    </div>
                    <div class="col-sm-12">
                        <h3>Overview</h3>
                        <p class="lead">`+movieData.overview+`</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <h4>Genres</h4>
                        `+genreItems+`
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="h4 pull-left"> User Score <br/><small>(Voted by `+userVoteCount+` users)</small></div>
                        <div class="c100 p`+userScore+` small orange">
                                <span>`+userScore+`%</span>
                                <div class="slice">
                                    <div class="bar"></div>
                                    <div class="fill"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $('.modal-title').empty().append(movieData.title+`&nbsp;<small>(`+releaseYear+`)</small>&nbsp;`);
            $('.modal-body').empty().append(movieHtmlMobile);

        })
        .fail(function() {
            contentInit('error');
        });
    }// END of getMoviesByID

    function reverseString(str) {
        // Step 1. Use the split() method to return a new array
        var splitString = str.split("-"); 
     
        // Step 2. Use the reverse() method to reverse the new created array
        var reverseArray = splitString.reverse();
     
        // Step 3. Use the join() method to join all elements of the array into a string
        var joinArray = reverseArray.join("-"); 
        
        //Step 4. Return the reversed string
        return joinArray;
    }

    contentInit();

    getPopularMovies();


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
    $('.navbar-brand').on('click',function(){contentInit();getPopularMovies();})

   
});


