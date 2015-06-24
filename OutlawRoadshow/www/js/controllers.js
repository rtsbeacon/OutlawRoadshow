angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $rootScope, $ionicUser, $ionicPush) {
  
  // Identifies a user with the Ionic User service
  $scope.identifyUser = function() {
    // Your identify code from before
  };
  
  // Registers a device for push notifications and stores its token
  $scope.pushRegister = function() {
    console.log('Ionic Push: Registering user');

    // Register with the Ionic Push service.  All parameters are optional.
    $ionicPush.register({
      canShowAlert: true, //Can pushes show an alert on your screen?
      canSetBadge: true, //Can pushes update app icon badges?
      canPlaySound: true, //Can notifications play a sound?
      canRunActionsOnWake: true, //Can run actions outside the app,
      onNotification: function(notification) {
        // Handle new push notifications here
        // console.log(notification);
        return true;
      }
    });
  };
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableArtists: true
  };
})


.controller('ArtistDetailCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
  //var artist = Artists.getArtist($scope.artistId);
  $http.get('http://songchant.com/outlaw/dev/artists.json').success(function(data) {
         console.log(data);
         $scope.artists = data;
     });
  console.log($stateParams.artistId);
   $scope.artist = $stateParams.artistId;
 }])  


.controller('ArtistsCtrl', ['$scope', '$http', function($scope, $http) {
     $http.get("http://songchant.com/outlaw/dev/artists.json").success(function(data) {
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



