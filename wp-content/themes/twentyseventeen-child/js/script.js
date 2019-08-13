(function($) {
  console.log(REST_API_EXAMPLE);

  $.ajax( {
    url: REST_API_EXAMPLE.SITE_URL + '/wp-json/wp/v2/movie?per_page=20',
    success: function ( data, status, xhr ) {
      console.log(data);
      console.log(xhr);
      console.log(xhr.getResponseHeader('X-WP-Total'));
      console.log(xhr.getResponseHeader('X-WP-TotalPages'));
    }
  } );

      
  })( jQuery );