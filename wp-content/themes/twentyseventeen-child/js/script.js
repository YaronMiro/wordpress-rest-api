(function($) {

  var posts = [];
  var xhrCalls = [];

  for (var page = 1; page <= LOCALIZE.TOTAL_PAGES; page++) {
    var call = $.ajax({
      type: 'GET',
      dataType: 'json',
      url: LOCALIZE.SITE_URL + `/wp-json/wp/v2/movie?page=${page}&per_page=${LOCALIZE.POSTS_PER_PAGE}&filter[orderby]=id&order=asc`,
      async: false,
      success: function(data) {
        posts = posts.concat(data);
      },
    });
    // Add ajax call to the array.
    xhrCalls.push(call)
  }

   // Handle Ajax Success.
   function successCallback() {

    // Log each post title.
    $.each(posts, function(index, post){
      console.log(post.title.rendered);
    })
  };
  
  // Handle Ajax Error.
  function errorHandler(error) {
    console.log('Error: ', error);
  };

  // Run all ajaxCalls simultaneously.
  $.when.apply($, xhrCalls).then(successCallback, errorHandler);

  })( jQuery );