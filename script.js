angular.module('maFlickr', ['ngAnimate'])
    .controller('FlickrCtrl', ['$scope', '$http', function ($scope, $http) {
      $scope.selPhoto = {};
      $scope.displayHover = false;
      $scope.page = 0;
      $scope.tag = "berlin";
      $scope.flickrAPI = "https://api.flickr.com/services/rest/?method=flickr.photos.search&nojsoncallback=1&api_key=3d1714538e496540659f97941fa7012a";

      $http({method: "GET", url: $scope.flickrAPI, cache: true, params: {
        format: "json",
//        api_key: "3d1714538e496540659f97941fa7012a",
        page: $scope.page,
        per_page: 150,
        tags: $scope.tag
      }})
          .success(function (data, status) {
            $scope.status = status;
            $scope.photos = data.photos.photo;
          })
          .error(function (data, status) {
            $scope.data = data || "Request failed";
            $scope.status = status;
          });

      $scope.showHover = function (photo) {
        $scope.selPhoto = photo;
        $scope.displayHover = true;
      };

      $scope.hideHover = function () {
        $scope.selPhoto = {};
        $scope.displayHover = false;
      };

      $scope.pictureThumb = function (photo) {
        if (typeof photo == 'undefined') return '';
        return "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
            photo.id + "_" + photo.secret + "_" + "s.jpg";
      };

      $scope.pictureMedium = function (photo) {
        if (typeof photo == 'undefined') return '';
        return "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
            photo.id + "_" + photo.secret + "_" + "z.jpg";
      };

      $scope.pictureLarge = function (photo) {
        if (typeof photo == 'undefined') return '';
        return "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
            photo.id + "_" + photo.secret + "_" + "b.jpg";
      };

      $scope.flickrURL = function (photo) {
        if (typeof photo == 'undefined') return '';
        return "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
      };
    }]);

//$(function () {
//  var page = 0;
//  var tag = "berlin";
//
//  search = function () {
//    tag = $('#tag').val().replace(/\s/g, "") || tag;
//    $("#photos").empty();
//    loadPhotos(tag, true);
//  };
//
//  loadPhotos = function (tag, fresh) {
//    if (fresh)
//      page = 0;
//    else
//      page++;
//
//    var flickrAPI = "https://api.flickr.com/services/rest/?method=flickr.photos.search&nojsoncallback=1";
//
//    $.getJSON(flickrAPI, {
//      format: "json",
//      api_key: "3d1714538e496540659f97941fa7012a",
//      page: page,
//      per_page: 150,
//      tags: tag
//    }, function (response) {
//      $.each(response.photos.photo, function (index, value) {
//        $("<li>").append(
//            $("<a>").attr("href", pictureLarge(value)).append(
//                $("<img>").attr({
//                  src: pictureThumb(value),
//                  alt: value.title,
//                  id: value.id,
//                  "data-owner": value.owner
//                }).click(function (event) {
//                  var hover = $("#hover");
//                  hover.find("> img")
//                      .attr("src", event.target.parentElement.href);
//                  hover.find("> #caption")
//                      .attr("href", flickrURL({ id: event.target.id, owner: event.target.attributes["data-owner"].value }))
//                      .html(event.target.alt);
//                  hover.fadeIn();
//                  event.preventDefault();
//                })
//            ))
//            .appendTo('#photos');
//      })
//    });
//  };
//
//  $(window).scroll(function () {
//    tag = $('#tag').val().replace(/\s/g, "") || tag;
//
////    // calculate scroll height
////    var pos = window.pageYOffset;
////    var max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
////
////    // load new photos when at bottom of page
////    if (max - 80 < pos)
////      loadPhotos(tag, false);
//
//    if ($('#placeholder').visible(true)) {
//      loadPhotos(tag, false);
//    }
//  });
//
//  $("#hover").click(function (event) {
//    var hover = $("#hover");
//    hover.find("> img")
//        .attr("src", "");
//    hover.find("> #caption")
//        .attr("href", "")
//        .html("");
//    hover.fadeOut();
//  });
//
////  $(window).scroll();
//});

// Utility-Functions: Generieren von Flickr-URLs
// Dokumentation siehe http://www.flickr.com/services/api/misc.urls.html

//// Die URL des Fotos (Thumbnail):
//function pictureThumb(photo) {
//  return "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
//      photo.id + "_" + photo.secret + "_" + "s.jpg";
//}
//
//// Die URL des Fotos (Mittel):
//function pictureMedium(photo) {
//  return "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
//      photo.id + "_" + photo.secret + "_" + "z.jpg";
//}
//
//// Die URL des Fotos (Groß):
//function pictureLarge(photo) {
//  return "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
//      photo.id + "_" + photo.secret + "_" + "b.jpg";
//}
//
//// Die URL zur entsprechenden Seite bei Flickr:
//function flickrURL(photo) {
//  return "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
//}