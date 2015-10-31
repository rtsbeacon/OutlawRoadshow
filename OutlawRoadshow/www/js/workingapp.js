// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
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



.run(function($rootScope, $ionicPlatform, $ionicAnalytics, $ionicUser, $ionicPush, $state) {
     $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
                    alert("Successfully registered token " + data.token);
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

        // user_id: device.uuid  Identify your user with the Ionic User Service
   // $ionicUser.identify(user).then(function(){
    //  alert("user identified");
    //  console.log('user identified');
    //   });
  
                       
    $ionicPush.register({
            canShowAlert: false, //Can pushes show an alert on your screen?
            canSetBadge: true, //Can pushes update app icon badges?
            canPlaySound: true, //Can notifications play a sound?
            canRunActionsOnWake: true, //Can run actions outside the app,
            onNotification: function(notification) {
                // Handle new push notifications here
                    console.log(notification);
                    if(notification["$state"]) {
                        //prompt the user to switch
                        navigator.notification.confirm("You have a message - go to it?", function(btn) {
                                        if(btn === 1) {
                                            $state.go(notification["$state"]);
                                            }
                                            },"New Message!")
                                           }
                                           return true;
                                           }
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
    .state('app.rsvp', {
               url: "/rsvp",
               views: {
               'menuContent': {
               templateUrl: "templates/rsvp.html",
               controller: 'RSVPCtrl',
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
    //controller: function ($scope, $stateParams) {
      //console.log($stateParamas),
        // $scope.artistId = $stiateParams.artistId;
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
  $urlRouterProvider.otherwise('/app/schedule');
});



// this is code for sticky dividers 

//.directive('sticky', function($ionicScrollDelegate) {
//	var options,
//		defaults = {
//		classes: {
//			animated: 'item-animated',
//			container: 'item-wrapper',
//			hidden: 'item-hidden',
//			stationaryHeader: 'item item-divider'
//		},
//		selectors: {
//			groupContainer: 'item-container',
//			groupHeader: 'item-divider',
//			stationaryHeader: 'div'
//		}
//	};
//	return {
//		restrict: 'A',
//		link: function(scope, element, attrs, ctrl) {
//
//				var items = [],
//					options = angular.extend(defaults, attrs),
//					$element = angular.element(element),
//					$fakeHeader = angular.element('<div class="' + options.classes.stationaryHeader + '"/>'),
//					$groupContainer = angular.element($element[0].getElementsByClassName(options.selectors.groupContainer));
//
//				$element.addClass('list-sticky');
//
//				angular.element($element[0].getElementsByClassName('list')).addClass(options.classes.container);
//
//				$element.prepend($fakeHeader);
//
//				angular.forEach($groupContainer, function(elem, index) {
//
//					var $tmp_list = $groupContainer.eq(index);
//						$tmp_header = angular.element($tmp_list[0].getElementsByClassName(options.selectors.groupHeader)).eq(0),
//						$tmp_listHeight = $tmp_list.prop('offsetHeight'),
//						$tmp_listOffset = $tmp_list[0].getBoundingClientRect().top ;
//
//					items.push({
//						'list': $tmp_list,
//						'header': $tmp_header,
//						'listHeight': $tmp_listHeight,
//						'headerText': $tmp_header.text(),
//						'headerHeight': $tmp_header.prop('offsetHeight'),
//						'listOffset': $tmp_listOffset,
//						'listBottom': $tmp_listHeight + $tmp_listOffset
//					});
//				});

//				$fakeHeader.text(items[0].headerText);

//				scope.checkPosition = function() {
//					var i = 0,
//						topElement, offscreenElement, topElementBottom,
//						currentTop = $ionicScrollDelegate.$getByHandle('scrollHandle').getScrollPosition().top;
//
//					while ((items[i].listOffset - currentTop) <= 0) {
//						topElement = items[i];
//						topElementBottom = -(topElement.listBottom - currentTop);
//
//						if (topElementBottom < -topElement.headerHeight) {
//							offscreenElement = topElement;
//						}

//						i++;

//						if (i >= items.length) {
//							break;
//						}
//					}

// it has been suggested that if you change if (topElement) to if (topElementBottom) this will work with ng_repeat but it didnt seem to make a difference for me.. also was not sure if they meant the one on line 210 or 217
//					if (topElement) {

//						if (topElementBottom < 0 && topElementBottom > -topElement.headerHeight) {
//							$fakeHeader.addClass(options.classes.hidden);
//							angular.element(topElement.list).addClass(options.classes.animated);
//						} else {
//							$fakeHeader.removeClass(options.classes.hidden);
//							if (topElement) {
//								angular.element(topElement.list).removeClass(options.classes.animated);
//							}
//						}
//						$fakeHeader.text(topElement.headerText);
//					} else {
  //            $fakeHeader.addClass(options.classes.hidden);
    //        }
//				}
//		}
//
//	}
//});