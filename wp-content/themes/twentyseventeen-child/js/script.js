(function($) {

  console.log(REST_API_EXAMPLE);

  var xhrData = [];

  function successCallback() {

    console.log(xhrData);
    $.each(xhrData, function(key, xhr){
      
      $.each(xhr.data, function(index, post){
        // console.log(post.title.rendered);
        // document.write(post.title.rendered);
        // document.write("</br>");

      });
    })
  };

  function errorHandler(error) {
    console.log('Error: ', error);
  };


  var $ajaxOne = $.ajax({
    type: 'GET',
    dataType: 'json',
    url: REST_API_EXAMPLE.SITE_URL + '/wp-json/wp/v2/movie?page=1&per_page=5&filter[orderby]=id&order=asc',
    success: function(data, status, xhr) {
      xhrData.push({"data": data, "status": status, "xhr": xhr});
    },
  });

  var $ajaxTwo = $.ajax({
    type: 'GET',
    dataType: 'json',
    url: REST_API_EXAMPLE.SITE_URL + '/wp-json/wp/v2/movie?page=2&per_page=5&filter[orderby]=id&order=asc',
    success: function(data, status, xhr) {
      xhrData.push({"data": data, "status": status, "xhr": xhr});
    },
  });





$.when.apply($,[$ajaxOne, $ajaxTwo]).then(successCallback, errorHandler);



  })( jQuery );