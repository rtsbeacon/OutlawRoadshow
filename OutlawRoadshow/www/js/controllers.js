angular.module('starter.controllers', [])

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableArtists: true
  };
})

.controller('AustinDetailCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
  //var artist = Artists.getArtist($scope.artistId);
  $http.get('http://songchant.com/outlaw/austins.json').success(function(data) {
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

.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {
     $http.get("https://secure.rcomhost.com/songchant.com/outlaw/sponsors.json").success(function(data) {
         console.log(data);
         $scope.home = data;
     });
}])

.controller('ArtistsCtrl', ['$scope', '$http', function($scope, $http) {
     $http.get("http://songchant.com/outlaw/artists.json").success(function(data) {
         console.log(data);
         $scope.artists = data;
     });
}])

.controller('SponsorsCtrl', ['$scope', '$http', function($scope, $http) {
     $http.get("http://songchant.com/outlaw/sponsorsNYC.json").success(function(data) {
         console.log(data);
         $scope.sponsors = data;
     });
}])

.controller('QRCtrl', ['$scope', '$http', function($scope, $http) {
     $http.get("http://songchant.com/outlaw/QR.json").success(function(data) {
         console.log(data);
         $scope.QR = data;
     });
}])


.controller('EMAILCtrl', function($scope, $state, $ionicUser, $ionicHistory) {
            $scope.data = {};

          //  var oriData = angular.copy($scope.data);

//            $scope.resetForm = function()
  //          {
    //          $scope.data = angular.copy(oriData);
      //        $scope.mainForm.$setPristine();
        //    };

          //  $scope.isDataChanged = function()
        //    {
          //    return !angualr.equals($scope.data, oriData);
          //  };
                        
            $scope.submitEmail = function() {
            console.log("email: " + $scope.data.email + " name: " + $scope.data.firstName + " " + $scope.data.lastName);
      //      $state.go('app.schedule');
          //  };
            
         //   $scope.identifyUser = function() {
       //     console.log('Ionic User: Identifying with Ionic User service');
            
                var user = $ionicUser.get();
                if(!user.user_id) {
            // Set your user_id here, or generate a random one.
                user.user_id = $ionicUser.generateGUID()
                            };
            
            // Add some metadata to your user object.
                angular.extend(user, {
                          name: $scope.data.lastName,
                          firstName: $scope.data.firstName,
                          email: $scope.data.email,
                          bio: 'TelAvivEMAIL'
                           });

               // $scope.data = angular.copy(oriData);
               // $scope.mainForm.$setPristine();
            
            // Identify your user with the Ionic User Service
                $ionicUser.identify(user).then(function(){
                                    $scope.identified = true;
                                               $ionicHistory.nextViewOptions({
                                                                             disableBack: true
                                                                             });
                                    $state.go('app.thankyou');
                                  //       alert('Identified user ' + user.name + '\n ID ' + user.user_id);
                            });
          };

            
           // };
            
            
})



.controller('NewsCtrl', function($scope, $ionicUser) {
            
            // Identifies a user with the Ionic User service
            $scope.identifyUser = function() {
            console.log('Ionic User: Identifying with Ionic User service');
            
            var user = $ionicUser.get();
            if(!user.user_id) {
            // Set your user_id here, or generate a random one.
            user.user_id = $ionicUser.generateGUID()
            };
            
            
            // Identify your user with the Ionic User Service
            $ionicUser.identify(user).then(function(){
                                           $scope.identified = true;
                                           alert('Identified user ' + user.user_id);
                                           });
            };
            
        
            })

.controller('AustinsCtrl', ['$scope', '$http', function($scope, $http) {
     $http.get("http://songchant.com/outlaw/austins.json").success(function(data) {
         console.log(data);
         $scope.austins = data;
     });
}])





