$(function () {
  var page = 0;
  var tag = "berlin";

  search = function() {
    tag = $('#tag').val().replace(/\s/g, "") || tag;
    $("#photos").empty();
    loadPhotos(tag, true);
  };

  loadPhotos = function (tag, fresh) {
    if (fresh)
      page = 0;
    else
      page++;

    var flickrAPI = "https://api.flickr.com/services/rest/?method=flickr.photos.search&nojsoncallback=1";

    $.getJSON(flickrAPI, {
      format: "json",
      api_key: "3d1714538e496540659f97941fa7012a",
      page: page,
      per_page: 150,
      tags: tag
    }, function (response) {
      $.each(response.photos.photo, function (index, value) {
        $("<li>").append(
            $("<a>").attr("href", pictureLarge(value)).append(
                $("<img>").attr({
                  "src": pictureThumb(value),
                  "alt": value.title
                }).click(function (event) {
                  var hover = $("#hover");
                  hover.find("> img")
                      .attr("src", event.target.parentElement.href);
                  hover.find("> #caption")
                      .attr("href", flickrURL(event.target.parentElement.href))
                      .html(event.target.alt);
                  hover.fadeIn();
                  event.preventDefault();
                })
            ))
            .appendTo('#photos');
      })
    });
  };

  $(window).scroll(function () {
    tag = $('#tag').val().replace(/\s/g, "") || tag;

//    // calculate scroll height
//    var pos = window.pageYOffset;
//    var max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//
//    // load new photos when at bottom of page
//    if (max - 80 < pos)
//      loadPhotos(tag, false);

    if ($('#placeholder').visible(true)) {
      loadPhotos(tag, false);
    }
  });

  $("#hover").click(function (event) {
    var hover = $("#hover");
    hover.find("> img")
        .attr("src", "");
    hover.find("> #caption")
        .attr("href", "")
        .html("");
    hover.fadeOut();
  });

  $(window).scroll();
});

// Utility-Functions: Generieren von Flickr-URLs
// Dokumentation siehe http://www.flickr.com/services/api/misc.urls.html

// Die URL des Fotos (Thumbnail):	
function pictureThumb(photo) {
  return "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
      photo.id + "_" + photo.secret + "_" + "s.jpg";
}

// Die URL des Fotos (Mittel):	
function pictureMedium(photo) {
  return "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
      photo.id + "_" + photo.secret + "_" + "z.jpg";
}

// Die URL des Fotos (Groß):		
function pictureLarge(photo) {
  return "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
      photo.id + "_" + photo.secret + "_" + "b.jpg";
}

// Die URL zur entsprechenden Seite bei Flickr:
function flickrURL(photo) {
  return "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
}