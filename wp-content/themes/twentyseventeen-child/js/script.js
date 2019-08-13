(function($) {
  
  var movies = [];
  var genreTerms = [];
  getMovies();

  // Update on genre selection.
  $('.genre-filter').change(filterByGenre);
  $('.clear-btn').click(clearFilters);

  function clearFilters() {
    genreTerms = [];
    $('.genre-filter').prop( "checked", false );
    setMoviesDisplay('show');
  }

  function filterByGenre() {
    // Checked
    $self = $(this);
    if(this.checked) {
      genreTerms.push('.' + $self.val())
    // un-checked    
    } else {
      var index = genreTerms.indexOf('.' + $self.val());
      if (index > -1) {
        genreTerms.splice(index, 1);
      }
    }

    // Show all (same as clear);
    if (!genreTerms.length) {
      setMoviesDisplay('show');
    }
    // Filter by genre
    else {
      setMoviesDisplay('hide');
      setMoviesDisplay('show', genreTerms.join(', '));
    }
  };

  function setMoviesDisplay(type, selector) {
    var selector = selector ? selector : ".movies li";
    var $movies = $(selector);
    type == 'hide' ? $movies.hide(0) : $movies.show(0);
  }

  function getMovies(){
    var xhrCalls = [];
    $site_main = $( ".site-main" );
    $site_main.find(".movies-main").append( "<h5 class=\"loader\">Loading...</h5>" );
    $site_main.find(".movies-main").append( "<ul class=\"movies\"></ul>" );
  
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
  
      // Sort the posts by "ID"
      movies.sort((a, b) => (a.id > b.id) ? 1 : -1)
  
      // Log each post title.
      $( ".loader" ).fadeOut();
      $.each(movies, function(index, movie){
        movie.genreClass = $.map(movie.genre, function(genre) {return 'genre-term-id-'+ genre}).join(' ');
        $(".movies").append(`<li class="${movie.genreClass}">${movie.title.rendered}</li>`);
      })
    };
    
    // Handle Ajax Error.
    function errorHandler(error) {
      console.log('Error: ', error);
    };
  
    // Run all ajaxCalls simultaneously.
    $.when.apply($, xhrCalls).then(successCallback, errorHandler);
  }

  })( jQuery );