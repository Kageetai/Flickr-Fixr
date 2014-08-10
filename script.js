angular.module('maFlickr', ['ngAnimate', 'angular-inview'])
    .controller('FlickrCtrl', ['$scope', '$http', function ($scope, $http) {
      $scope.photos = [];
      $scope.selPhoto = {};
      $scope.displayHover = false;
      $scope.page = 0;
      $scope.tag = "berlin";
      $scope.flickrAPI = "https://api.flickr.com/services/rest/?method=flickr.photos.search&nojsoncallback=1";

      $scope.loadPhotos = function (fresh) {
        console.log("loading photos, page: " + $scope.page);
        if (fresh)
          $scope.page = 0;
        else
          $scope.page++;

        $http({method: "GET", url: $scope.flickrAPI, cache: true, params: {
          format: "json",
        api_key: "3d1714538e496540659f97941fa7012a",
          page: $scope.page,
          per_page: 50,
          tags: $scope.tag
        }})
            .success(function (data, status) {
                $scope.status = status;
              $scope.photos = $scope.photos.concat(data.photos.photo);
            })
            .error(function (data, status) {
              $scope.data = data || "Request failed";
              $scope.status = status;
            });
      };

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
            photo.id + "_" + photo.secret + "_" + "q.jpg";
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