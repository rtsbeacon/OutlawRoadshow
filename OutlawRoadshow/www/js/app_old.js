// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});


angular.module('stickyDividers', ['ionic'])
.directive('sticky', function($ionicScrollDelegate) {
	var options,
		defaults = {
		classes: {
			animated: 'item-animated',
			container: 'item-wrapper',
			hidden: 'item-hidden',
			stationaryHeader: 'item item-divider'
		},
		selectors: {
			groupContainer: 'item-container',
			groupHeader: 'item-divider',
			stationaryHeader: 'div'
		}
	};
	return {
		restrict: 'A',
		link: function(scope, element, attrs, ctrl) {

				var items = [],
					options = angular.extend(defaults, attrs),
					$element = angular.element(element),
					$fakeHeader = angular.element('<div class="' + options.classes.stationaryHeader + '"/>'),
					$groupContainer = angular.element($element[0].getElementsByClassName(options.selectors.groupContainer));

				$element.addClass('list-sticky');

				angular.element($element[0].getElementsByClassName('list')).addClass(options.classes.container);

				$element.prepend($fakeHeader);

				angular.forEach($groupContainer, function(elem, index) {

					var $tmp_list = $groupContainer.eq(index);
						$tmp_header = angular.element($tmp_list[0].getElementsByClassName(options.selectors.groupHeader)).eq(0),
						$tmp_listHeight = $tmp_list.prop('offsetHeight'),
						$tmp_listOffset = $tmp_list[0].getBoundingClientRect().top ;

					items.push({
						'list': $tmp_list,
						'header': $tmp_header,
						'listHeight': $tmp_listHeight,
						'headerText': $tmp_header.text(),
						'headerHeight': $tmp_header.prop('offsetHeight'),
						'listOffset': $tmp_listOffset,
						'listBottom': $tmp_listHeight + $tmp_listOffset
					});
				});

				$fakeHeader.text(items[0].headerText);

				scope.checkPosition = function() {
					var i = 0,
						topElement, offscreenElement, topElementBottom,
						currentTop = $ionicScrollDelegate.$getByHandle('scrollHandle').getScrollPosition().top;

					while ((items[i].listOffset - currentTop) <= 0) {
						topElement = items[i];
						topElementBottom = -(topElement.listBottom - currentTop);

						if (topElementBottom < -topElement.headerHeight) {
							offscreenElement = topElement;
						}

						i++;

						if (i >= items.length) {
							break;
						}
					}


					if (topElement) {

						if (topElementBottom < 0 && topElementBottom > -topElement.headerHeight) {
							$fakeHeader.addClass(options.classes.hidden);
							angular.element(topElement.list).addClass(options.classes.animated);
						} else {
							$fakeHeader.removeClass(options.classes.hidden);
							if (topElement) {
								angular.element(topElement.list).removeClass(options.classes.animated);
							}
						}
						$fakeHeader.text(topElement.headerText);
					} else {
              $fakeHeader.addClass(options.classes.hidden);
            }
				}
		}

	}
});