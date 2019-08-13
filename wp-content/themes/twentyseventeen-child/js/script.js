(function($) {
  console.log(REST_API_EXAMPLE);

//   $.when($.ajax("request1"), $.ajax("request2"), $.ajax("request3"))
// .then(successCallback, errorHandler);

  function successCallback(xhr) {
    console.log(xhr);
  };

  function errorHandler(error) {
    console.log(error);
  };


  var $ajaxOne = $.ajax( {
    type: 'GET',
    dataType: 'json',
    url: REST_API_EXAMPLE.SITE_URL + '/wp-json/wp/v2/movie?per_page=5',
  } );

  var $ajaxTwo = $.ajax( {
    type: 'GET',
    dataType: 'json',
    url: REST_API_EXAMPLE.SITE_URL + '/wp-json/wp/v2/movie?per_page=5',
  } );

  $.when([$ajaxOne, $ajaxTwo]).then(successCallback, errorHandler)

      
  })( jQuery );