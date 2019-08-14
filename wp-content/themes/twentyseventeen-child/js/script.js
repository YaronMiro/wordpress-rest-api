(function($) {
  
  var movies = [];
  var genreTerms = [];

  var $genreFilters = $('.genre-filter');
  var $resetButton =  $('.reset-btn');
  var $searchButton = $(".search-box");

  setFiltersMode('disabled');
  getMovies();

  // Update on genre selection.
  $genreFilters.change(filterByGenre);
  $resetButton.click(clearFilters);
  $searchButton.keyup(filterBySearch)

  function clearFilters() {
    genreTerms = [];
    $('.genre-filter').prop("checked", false);
    setMoviesDisplay('show');
  }

  function filterByGenre() {
    // Checked.
    $self = $(this);
    if(this.checked) {
      genreTerms.push('.' + $self.val())
    // Un-checked.  
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
    // Filter by genre.
    else {
      setMoviesDisplay('hide');
      setMoviesDisplay('show', genreTerms.join(', '));
    }
  };

  // Show or Hide Movies.
  function setMoviesDisplay(type, selector) {
    var selector = selector ? selector : '.movies li';
    var $movies = $(selector);
    type == 'hide' ? $movies.hide(0) : $movies.show(0);
  }

  // Enable or Disable all filters.
  function setFiltersMode(type) {
    var mode = type === 'disabled' ? true : false
    $genreFilters.prop('disabled', mode);
    $resetButton.prop('disabled', mode)
    $searchButton.prop('disabled', mode)
  }

  // Filter movies by title
  function filterBySearch() {
    // Declare variables
    var input, filter, ul, li, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
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