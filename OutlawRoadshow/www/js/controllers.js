angular.module('starter.controllers', [])

.controller('PushCtrl', function($scope, $rootScope, $ionicUser, $ionicPush) {

  // Identifies a user with the Ionic User service
  $scope.identifyUser = function() {
    console.log('Ionic User: Identifying with Ionic User service');

    var user = $ionicUser.get();
    if(!user.user_id) {
      // Set your user_id here, or generate a random one.
      user.user_id = $ionicUser.generateGUID()
    };

    // Add some metadata to your user object.
    angular.extend(user, {
      name: 'Ionitron',
      bio: 'I come from planet Ion'
    });

    // Identify your user with the Ionic User Service
    $ionicUser.identify(user).then(function(){
      $scope.identified = true;
      alert('Identified user ' + user.name + '\n ID ' + user.user_id);
    });
  };

// Registers a device for push notifications
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
     return true;
   }
   alert('Button was clicked');
 });
};

$rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
  alert("Successfully registered token " + data.token);
  console.log('Ionic Push: Got token ', data.token, data.platform);
  $scope.token = data.token;
});

})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableArtists: true
  };
})

.controller('AustinDetailCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
  //var artist = Artists.getArtist($scope.artistId);
  $http.get('http://songchant.com/outlaw/dev/austins.json').success(function(data) {
         console.log(data);
         $scope.austins = data;
     });
  console.log($stateParams.austinId);
   $scope.austin = $stateParams.austinId;
 }])  

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

.controller('NewsCtrl', ['$scope', '$http', function($scope, $http) {
     $http.get("http://songchant.com/outlaw/news.json").success(function(data) {
         console.log(data);
         $scope.news = data;
     });
}])

.controller('AustinsCtrl', ['$scope', '$http', function($scope, $http) {
     $http.get("http://songchant.com/outlaw/austins.json").success(function(data) {
         console.log(data);
         $scope.austins = data;
     });
}])





