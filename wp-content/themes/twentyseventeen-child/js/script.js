(function($) {

  // Filter Checkbox.
  var $filterCheckboxes = $('input[type="checkbox"]');
  var postsPerPage = 3;
  var currentPage = 1;


  $('.reset-btn').click(function () {
    $('.genre-filter').prop('checked', false);
    $filteredResults = $('.item');
    $filteredResults.hide();
    $filteredResults.slice(0, postsPerPage).fadeIn();
    $("#loadMore").fadeIn('slow');
    currentPage = 1;
  });


  $(".item").slice(0, postsPerPage).show();

  // var $filteredResults = $('.item:hidden');
  var $filteredResults = $('.item');

  $filterCheckboxes.on('change', function() {

    var selectedFilters = {};

    $filterCheckboxes.filter(':checked').each(function() {

      if (!selectedFilters.hasOwnProperty(this.name)) {
        selectedFilters[this.name] = [];
      }

      selectedFilters[this.name].push(this.value);

    });

    // loop over the selected filter name -> (array) values pairs
    $.each(selectedFilters, function(name, filterValues) {

      // filter each .flower element
      $filteredResults = $filteredResults.filter(function() {

        var matched = false,
          currentFilterValues = $(this).data('category').split(' ');

        // loop over each category value in the current .flower's data-category
        $.each(currentFilterValues, function(_, currentFilterValue) {

          // if the current category exists in the selected filters array
          // set matched to true, and stop looping. as we're ORing in each
          // set of filters, we only need to match once

          if ($.inArray(currentFilterValue, filterValues) != -1) {
            matched = true;
            return false;
          }
        });

        // if matched is true the current .flower element is returned
        return matched;

      });
    });

    $('.item').hide().filter($filteredResults).slice(0, postsPerPage).fadeIn();
  });

  // Load More Button.

  $("#loadMore").on('click', function (e) {
      e.preventDefault();

      var start = currentPage * postsPerPage;
      var end = postsPerPage + start;
      $filteredResults.slice(start, end).fadeIn();

      if (end >= $filteredResults.length) {
          $("#loadMore").fadeOut('slow');
      }

      currentPage++;
  });

  
  


  })( jQuery );