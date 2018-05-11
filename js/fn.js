/* ------------------------------------------------------ 
        Function to clear DOM
-------------------------------------------------------*/

function clearSidebar(){
    $('#popularMoviesList').empty();
    $('.visible-xs-12 .row').empty();
}

function clearMainContent(){
    $('.jumbotron').addClass('hidden');
    $('#mainContent').empty();
    $('.modal-title').empty();
    $('.modal-body').empty();

}

/* ------------------------------------------------------ 
        Function to Modify Navigation Bar
-------------------------------------------------------*/

function modifyNavigationbar(currentPage, totalPages){
    
    //Navigation Buttons' Status
    if(currentPage>1){$('button[data-nav="prev"]').prop("disabled", false);}
    else{$('button[data-nav="prev"]').prop("disabled", true);}
    if(currentPage==totalPages){$('button[data-nav="next"]').prop("disabled", true);}

    $('span[data-currentPage]').html(currentPage);
    $('span[data-totalPages]').html(totalPages);
}

/* ------------------------------------------------------ 
    Function to Add Movie Item to the Sidebar List
-------------------------------------------------------*/

function addMovieToList(movieID,moviePoster,movieTitle){

    let popularMovieEntity=`
        <li>
            <a href="#" class="movieListItem" data-target="${movieID}">
                <span>${movieTitle}</span>
            </a>
        </li>`;
                
    //Display single row to HTML page, EXCLUDED mobile devices 
    $('#popularMoviesList').append(popularMovieEntity);


    let popularMovieEntityMobile=`
        <div class="col-xs-6">
            <a class="thumbnail" data-item="${movieID}" data-toggle="modal" data-target="#mobileModal">
                <img class="img-responsice "src="${moviePoster}">
                <span class="h5">${movieTitle}</span>
            </a>
        </div>`;
                
    //Display single row to HTML page, ONLY FOR mobile devices 
    $('.visible-xs-12 .row').append(popularMovieEntityMobile);
}


/* ------------------------------------------------------ 
    Function to Present Details for a Selected Movie
-------------------------------------------------------*/

function displaySingleMovieItem(movieTitle,movieOverview,poster,releaseYear,userScore,userVoteCount,releaseDate,movieRuntime,genreItems){
        
        //Display Movie Details, EXCLUDED FOR Mobile Phones
        var movieHTML = `
        <h1 class="page-header">${movieTitle} <small>(${releaseYear})</small></h1>
        <div class="row movieDataItem">
            <div class="col-sm-12 col-md-4 col-lg-3">
                <img class="img-responsive" src="${poster}" alt="${movieTitle}">
            </div>
            <div class="col-sm-12 col-md-8 col-lg-9">
                <div class="row">
                    <div class="col-sm-12">
                        <ul class="list-inline">
                            <li>
                                <div class="c100 p${userScore} small orange">
                                    <span>${userScore}%</span>
                                    <div class="slice">
                                        <div class="bar"></div>
                                        <div class="fill"></div>
                                    </div>
                                </div>
                                <div class="pull-left h5"> User Score <br/><small>(Voted by ${userVoteCount} users)</small></div>
                            </li>
                            <li>
                                <i class="fa fa-clock-o pull-left"></i><h5>Duration: <small> ${movieRuntime} min</small></h5>
                            </li>
                            <li>
                                <i class="fa fa-calendar pull-left"></i><h5>Release Date: <small>${releaseDate}</small></h5>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <h3>Overview</h3>
                        <p class="lead">${movieOverview}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <h4>Genres</h4>
                        ${genreItems}
                    </div>
                </div>
            </div>
        </div>
    `;

    $('#mainContent').html(movieHTML);


    //Display Movie Details, ONLY FOR Mobile Phones
            
    var movieHtmlMobile=`
        <div class="row">
            <div class="col-sm-12">
                <ul class="list-inline">
                    <li>
                        <h4><small><i class="fa fa-clock-o"></i>&nbsp;Duration:${movieRuntime}min</small></h4>
                    </li>
                    <li>
                        <h4><small><i class="fa fa-calendar"></i>&nbsp;Release Date:${releaseDate}</small></h4>
                    </li>
                </ul>
            </div>
            <div class="col-sm-12">
                <h3>Overview</h3>
                <p class="lead">${movieOverview}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <h4>Genres</h4>
                ${genreItems}
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="h4 pull-left"> User Score <br/><small>(Voted by ${userVoteCount} users)</small></div>
                <div class="c100 p${userScore} small orange">
                        <span>${userScore}%</span>
                        <div class="slice">
                            <div class="bar"></div>
                            <div class="fill"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    $('.modal-title').append(`${movieTitle} <small>(${releaseYear})</small>&nbsp;`);
    $('.modal-body').append(movieHtmlMobile);
}

/* ------------------------------------------------------ 
    Function to reserver a string
-------------------------------------------------------*/

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

/* ------------------------------------------------------ 
    Function to manage error messages
-------------------------------------------------------*/

function contentInit(status){
    if(status===undefined){
        $('.jumbotron').removeClass('hidden');
        $('.alert-danger').addClass('hidden');
        $('.alert-info').addClass('hidden');
        $('#mainContent').empty();
    }

    //When error occurred
    if(status==='error'){
        $('.alert-danger').removeClass('hidden');
    }

    //When error occurred
    if(status==='nav'){
        $('.alert-info').removeClass('hidden');
    }
}