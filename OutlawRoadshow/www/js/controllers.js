angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $rootScope, $ionicPush, $ionicUser) {
  $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
    console.log('Got token', data.token, data.platform);
  });
  //Basic registration
  $scope.pushRegister = function() {
    alert('Registering...');

    $ionicPush.register({
      canShowAlert: false,
      onNotification: function(notification) {
        // Called for each notification for custom handling
        $scope.lastNotification = JSON.stringify(notification);
      }
    }).then(function(deviceToken) {
      $scope.token = deviceToken;
    });
  }
  $scope.identifyUser = function() {
    alert('Identifying');
    console.log('Identifying user');

    var user = $ionicUser.get();
    if(!user.user_id) {
      // Set your user_id here, or generate a random one
      user.user_id = $ionicUser.generateGUID()
    };

    angular.extend(user, {
      name: 'Test User',
      message: 'I come from planet Ion'
    });

    $ionicUser.identify(user);
    
  }
})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableArtists: true
  };
})


.controller('ArtistDetailCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
  //var artist = Artists.getArtist($scope.artistId);
  $http.get('http://songchant.com/outlaw/artists2.json').success(function(data) {
         console.log(data);
         $scope.artists = data;
     });
  console.log($stateParams.artistId);
   $scope.artist = $stateParams.artistId;
 }])  


.controller('ArtistsCtrl', ['$scope', '$http', function($scope, $http) {
     $http.get("http://songchant.com/outlaw/artists2.json").success(function(data) {
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



