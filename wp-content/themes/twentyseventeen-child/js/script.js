(function($) {
  console.log(REST_API_EXAMPLE);

  $.ajax( {
    url: REST_API_EXAMPLE.SITE_URL + '/wp-json/wp/v2/movie?per_page=2',
    success: function ( data ) {
      console.log(data)
    }
  } );

      
  })( jQuery );