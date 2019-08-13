(function($) {


  $('document').ready(function(){

    //getMovies();

  })




  function getFilters(){

    var posts = [];
    var xhrCalls = [];
    
  }

  function getMovies(){

    var posts = [];
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
          posts = posts.concat(data);
        },
      });
      // Add ajax call to the array.
      xhrCalls.push(call)
    }
  
     // Handle Ajax Success.
     function successCallback() {
  
      // Sort the posts by "ID"
      posts.sort((a, b) => (a.id > b.id) ? 1 : -1)
  
      // Log each post title.
      $( ".entry-content .loader" ).fadeOut();
      $.each(posts, function(index, post){
        console.log(post.title.rendered);
        $(".movies").append(`<li>${post.title.rendered}</li>`);
  
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