angular.module('starter.controllers', [])


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableArtists: true
  };
})


.controller('ArtistDetailCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
  //var artist = Artists.getArtist($scope.artistId);
  $http.get('http://songchant.com/outlaw/artists.json').success(function(data) {
         console.log(data);
         $scope.artists = data;
     });
  console.log($stateParams.artistId);
   $scope.artist = $stateParams.artistId;
 }])  

.controller('ArtistsCtrl', ['$scope', '$http', function($scope, $http) {
     $http.get("http://songchant.com/outlaw/artists.json").success(function(data) {
         console.log(data);
         $scope.artists = data;
     });
}])

//.controller('ChatsCtrl', function($scope, Chats) {
//  $scope.chats = Chats.all();
//  $scope.remove = function(chat) {
//    Chats.remove(chat);
//  }
//})

//.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//  $scope.chat = Chats.get($stateParams.chatId);
//})

//.controller('ArtistsCtrl', function($scope, $stateParams, Artists) {
 // var artist = Artists.getArtist($scope.artistId);
  //$scope.artists = Artists.get($stateParams.artistId);
//})



