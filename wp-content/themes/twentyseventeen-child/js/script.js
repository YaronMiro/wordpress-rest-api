(function($) {
  
  var movies = [];
  var genreTerms = [];
  var loadMoreQuantity = 10;
  var $genreFilters = $('.genre-filter');
  var $resetButton = $('.reset-btn');
  var $searchBox = $(".search-box");

  // Update on genre selection.
  $genreFilters.change(filterByGenre);
  $searchBox.keyup(filterBySearch)
  $resetButton.click(clearFilters);
  
  setFiltersMode('disabled');
  getMovies();
  
  // Clear all filters.
  function clearFilters() {
    genreTerms = [];
    $genreFilters.prop('checked', false);
    $searchBox.val('');
    setMovieDisplayMode('show');
  }

  // Filter by genre (checkbox).
  function filterByGenre() {
    // Checked action.
    $self = $(this);
    if(this.checked) {
      genreTerms.push('.' + $self.val())
    // Un-checked action.  
    } else {
      var index = genreTerms.indexOf('.' + $self.val());
      if (index > -1) {
        genreTerms.splice(index, 1);
      }
    }

    // In case all checkbox were unchecked.
    if (!genreTerms.length) {
      setMovieDisplayMode('show');
    }
    // In case we have at least one checkbox checked.
    else {
      setMovieDisplayMode('hide');
      setMovieDisplayMode('show', genreTerms.join(', '));
    }
  };

  // Show or Hide Movies.
  function setMovieDisplayMode(type, selector) {
    var selector = selector ? selector : '.movies li';
    var $movies = $(selector);
    type == 'hide' ? $movies.hide(0) : $movies.show(0);
  }

  // Enable or Disable all filters.
  function setFiltersMode(type) {
    var mode = type === 'disabled' ? true : false
    $genreFilters.prop('disabled', mode);
    $resetButton.prop('disabled', mode)
    $searchBox.prop('disabled', mode)
  }

  // Filter movies by title (search box)
  function filterBySearch() {
    $(".movies li").each(function(index, movie){
      var $movie = $(movie);
      var searchText = $searchBox.val().toLowerCase();
      var movieTitle = $movie.text().toLowerCase();
      movieTitle.indexOf(searchText) > -1 ? setMovieDisplayMode('show', $movie) : setMovieDisplayMode('hide', $movie);
    })
  }

  // Get the movies from the server.
  function getMovies(){
    var xhrCalls = [];
    $site_main = $( '.site-main' );
    $site_main.find('.movies-main').append( '<h5 class=\"loader\">Loading...</h5>' );
    $site_main.find('.movies-main').append( '<ul class=\"movies\"></ul>' );
  
    for (var page = 1; page <= LOCALIZE.TOTAL_PAGES; page++) {
      var call = $.ajax({
        type: 'GET',
        dataType: 'json',
        url: LOCALIZE.SITE_URL + `/wp-json/wp/v2/movie?page=${page}&per_page=${LOCALIZE.POSTS_PER_PAGE}`,
        success: function(data) {
          movies = movies.concat(data);
        },
      });
      // Add ajax call to the array.
      xhrCalls.push(call)
    }
  
     // Handle Ajax Success.
     function successCallback() {
  
      // Sort the posts by "ID".
      movies.sort((a, b) => (a.id > b.id) ? 1 : -1)
      
      // Hide loader and enable filters (since we have all the data).
      $( '.loader' ).fadeOut();
      setFiltersMode('enabled');

      // Inject each movie into the DOM.
      $.each(movies, function(index, movie){
        movie.genreClass = $.map(movie.genre, function(genre) {return 'genre-term-id-'+ genre}).join(' ');
        $(".movies").append(`<li class="${movie.genreClass}">${movie.title.rendered}</li>`);
      })
    };
    
    // Handle Ajax Error.
    function errorHandler(error) {
      $( '.loader' ).fadeOut();
      $(".movies").append(`<li>We have encountered an error, please try again by reloading the page</li>`);
      console.log('Error: ', error);
    };
  
    // Run all ajaxCalls simultaneously.
    $.when.apply($, xhrCalls).then(successCallback, errorHandler);
  }

  })( jQuery );