// here we created the module 'main'
// it will be used by the ng-app directive
var main = angular.module('main', ['ngRoute', 'ngResource', 'uiGmapgoogle-maps']);


// this is a route provider, it will replace the contents of 
// the ng-view with the contents in module1.html
// more on this later, just ignore it for now
main.config(
  function($routeProvider) {
    $routeProvider.when('/module1', {
      templateUrl: 'module1.html'
    }).when('/map', {
      templateUrl: 'map.html'
    });
  });


main.service('MarkersService', function($resource) {

  this.resource = $resource('coordinates/:coordId.json', {
    adultId: '@id'
  });


  this.markers = this.resource.query().$promise.then(function(data) {
    return data;
  });

});

main.controller('MainCtrl', function($scope, $location) {
  $scope.getClass = function(path) {
    if ($location.path().substr(0, path.length) == path) {
      return "active";
    } else {
      return "";
    }
  }
});


main.controller('MapCtrl', function($scope, MarkersService) {
  $scope.map = {
    center: {
      latitude: 50.880463,
      longitude:  4.693533
    },
    zoom: 19,
    options: {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        position: google.maps.ControlPosition.BOTTOM_CENTER
      },
      panControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      },
      disableDefaultUI: true,
      panControl: true,
      zoomControl: true,
      scaleControl: true,
      streetViewControl: false,
      overviewMapControl: false,
    },
    infoWindowWithCustomClass: {
      options: {
        disableAutoPan: false,
        boxClass: 'custom-info-window',
        alignBottom: true
      },
    }
  };



});



main.controller('EventsCtrl', function($scope, $http) {

});