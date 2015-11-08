angular.module('starter', [
  'ionic','ionic.service.core','ngCordova','ionic.service.push',
  
  
  
  'ionic.service.analytics',
  'starter.controllers',
  'starter.services'
])

//this is code for ionic services
.config(['$ionicAppProvider', function($ionicAppProvider) {
 //Identify app
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
   app_id: 'a5d01814',
    // The public API key all services will use for this app
   api_key: 'b81ad25ed3c897f69b681302da3d7bcbaea13773a1673428',
        // The GCM project number
    gcm_id: '234816071019',
    dev_push: false
  });
}])



.run(function($rootScope, $ionicPlatform, $ionicAnalytics, $ionicUser, $ionicPush, $ionicPopup, $state) {
     $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
                 //   alert("Successfully registered token " + data.token);
                    console.log('Ionic Push: Got token ', data.token, data.platform);
                    $scope.token = data.token;
                    });
     $ionicPlatform.ready(function() {
    
    $ionicAnalytics.register();
    
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
                       
    $ionicPush.register({
            canShowAlert: true, //Can pushes show an alert on your screen?
            canSetBadge: true, //Can pushes update app icon badges?
            canPlaySound: true, //Can notifications play a sound?
            canRunActionsOnWake: true, //Can run actions outside the app,
            onNotification: function(notification) {
  // Handle new push notifications here
                    console.log('Ionic Push Event Received!', notification);

                    if (ionic.Platform.isAndroid()) {
                        handleAndroid(notification);
                    } else if (ionic.Platform.isIOS()) {
                        handleIOS(notification);
                   }

//Android and IOS alert popup
                   function showAlertPopup(notificationString, notificationItem) {

                        if (notificationItem && notificationString) {

                            showingPushPopup = $ionicPopup.confirm({
                                title: notificationString,
                                okText: 'View it',
                                cancelText: 'Later',
                                cancelType: 'button-clear',
                                okType: 'button-stable'
                            }).then(function(response) {
                                if (response) {

                                     $rootScope.goItem(notificationItem);
    //                                }

                               } else {
                                    //clicked cancel
                                }
                            });
                        } else if (notificationString) {

                          $ionicPopup.alert({
                                title: notificationString,
                                okType: 'button-stable'
                            }).then(function() {
                               //nothing 
                             });

                           }

                   }

  // Android Notification Received Handler
                   function handleAndroid(notification) {
                        // ** NOTE: ** You could add code for when app is in foreground or not, or coming from coldstart here too
                        //             via the console fields as shown.
                        console.log("In foreground " + notification.foreground + " Coldstart " + notification.coldstart);

                        var payload = {};

                        //Check for Payload
                        if (notification.payload && notification.payload.payload) {
                            payload = notification.payload.payload;
                        }

                        if (!notification.coldstart) {

                            if (notification.event == "message") {

                                if (data.user.enableTabSound && payload.sound) {
                                    // Using NATIVEAUDIO PLUGIN
                                    $rootScope.playNotificationSound();
                                }

                                //Show popup asking to go to item
                                if (payload.itemId) {
                                   showAlertPopup(notification.message, payload.itemId);
                               } else {
                                    showAlertPopup(notification.message);
                                }
                                
                                // There is no need to use cordova dialogs!
                                //$cordovaDialogs.alert(notification.message, "Push Notification Received");

                            } else if (notification.event == "error") {

                                //ErrorService.sendError({
                                //    message: notification.msg,
                                //    controller: "LoginService",
                                //    event: "Android Push Notification Error"
                                //});

                            }

                        } else if (notification.coldstart && payload.itemId) {

                            //Go straight to the item page
                            $rootScope.goItem(payload.itemId);

                        }

                    }

    // IOS Notification Received Handler
                   function handleIOS(notification) {
                        // The app was already open but we'll still show the alert and sound the tone received this way. If you didn't check
                        // for foreground here it would make a sound twice, once when received in background and upon opening it from clicking
                        // the notification when this code runs (weird).
                        if (notification.foreground == "1") {
                            // Play custom audio if a sound specified. Using NATIVEAUDIO PLUGIN
                            if (notification.sound) {
                                $rootScope.playNotificationSound();
                            }

                            if (notification.body) {

                                //Send to item
                                if (notification.itemId) {
                                
                                      showAlertPopup(notification.body, notification.itemId);
                                   
                                } else {
                                    showAlertPopup(notification.body);
                                }

                            }
                            
                            // Updating the badge from the foreground is unnecessary
                            // if (notification.badge) {
                            //     $cordovaPush.setBadgeNumber(notification.badge).then(function(result) {
                            //         console.log("Set badge success " + result)
                            //     }, function(err) {
                            //         console.log("Set badge error " + err)
                            //     });
                            // }
                       }
                        // Otherwise it was received in the background and reopened from the push notification. Badge is automatically cleared
                        // in this case.
                        else if (!notification.foreground && notification.itemId) {
                        
                               $rootScope.goItem(notification.itemId);

                        }
                    }


                    return true;
                }

  //  }).then(function(result) {
  //              console.log('$ionicPush.register result: ' + result)
            },
                                         {user_id: $ionicUser.generateGUID(),
                                            firstName: 'sample'
                              });





                       
  });
})


//this is code for the slide menu
.config(function($stateProvider, $urlRouterProvider, $ionicAppProvider) {
  $ionicAppProvider.identify({
  app_id: 'a5d01814',
  api_key: 'b81ad25ed3c897f69b681302da3d7bcbaea13773a1673428'
});

  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
         controller: 'NewsCtrl',
  
  })

  .state('app.schedule', {
    url: "/schedule",
    views: {
      'menuContent': {
        templateUrl: "templates/schedule.html",
		controller: 'ArtistsCtrl',
        }
      }
    })

  .state('app.news', {
    url: "/news",
    views: {
      'menuContent': {
        templateUrl: "templates/news.html",
    controller: 'NewsCtrl',
        }
      }
    })

    .state('app.qr', {
               url: "/qr",
               views: {
               'menuContent': {
               templateUrl: "templates/qr.html",
               controller: 'QRCtrl',
               }
            }
    })
    .state('app.email', {
               url: "/email",
               views: {
               'menuContent': {
               templateUrl: "templates/rsvp.html",
               controller: 'EMAILCtrl',
               }
            }
    })
   
  .state('app.home', {
        url: "/home",
        views: {
          'menuContent': {
            templateUrl: "templates/home.html",
            controller: 'HomeCtrl',
           }
        }
   })
  .state('app.thankyou', {
        url: "/thankyou",
        views: {
          'menuContent': {
            templateUrl: "templates/thankyou.html",
            controller: 'AccountCtrl',
           }
        }
   })
    .state('app.sponsors', {
    url: "/sponsors",
    views: {
      'menuContent': {
        templateUrl: "templates/sponsors.html",
    controller: 'SponsorsCtrl',
        }
      }
    })


    .state('app.artists', {
      url: "/artists",
      views: {
        'menuContent': {
          templateUrl: "templates/artists.html",
          controller: 'ArtistsCtrl',
       }
      }
    })

  .state('app.austins', {
    url: "/austins",
    views: {
      'menuContent': {
        templateUrl: "templates/austins.html",
    controller: 'AustinsCtrl',
        }
      }
    })

	.state('app.artist-detail', {
    	url: '/artists/:artistId',
  		views: {
       'menuContent': {
  	     templateUrl: 'templates/artist-detail.html',
  	     controller: 'ArtistDetailCtrl', 
		//controller: function ($scope, $stateParams) {
			//console.log($stateParamas),
        // $scope.artistId = $stiateParams.artistId;
	   //}
	}
	  }
	})

    .state('app.austin-detail', {
      url: '/austins/:austinId',
      views: {
       'menuContent': {
         templateUrl: 'templates/austin-detail.html',
         controller: 'AustinDetailCtrl', 
    //    controller: function ($scope, $stateParams) {
    //      console.log($stateParams),
     //      $scope.austinId = $stateParams.austinId;
     //}
  }
    }
  })
	
	    .state('app.stage', {
      url: "/stage",
      views: {
        'menuContent': {
          templateUrl: "templates/stage.html",
          controller: 'ArtistsCtrl',
        }
      }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

