function registerPushwooshIOS() {
  var pushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");

  //set push notification callback before we initialize the plugin
  document.addEventListener('push-notification',
    function(event)
    {
      //get the notification payload
      var notification = event.notification;

      //display alert to the user for example
      alert(notification.aps.alert);
      
      //to view full push payload
      //alert(JSON.stringify(notification));
      
      //clear the app badge
      pushNotification.setApplicationIconBadgeNumber(0);
    }
  );

  //initialize the plugin
    pushNotification.onDeviceReady({pw_appid:"E6C7C-212AB"});

  //register for pushes
  pushNotification.registerDevice(
    function(status)
    {
      var deviceToken = status['deviceToken'];
      console.warn('registerDevice: ' + deviceToken);
      onPushwooshiOSInitialized(deviceToken);
    },
    function(status)
    {
      console.warn('failed to register : ' + JSON.stringify(status));
      //alert(JSON.stringify(['failed to register ', status]));
    }
  );
  
  //reset badges on start
  pushNotification.setApplicationIconBadgeNumber(0);
}

function onPushwooshiOSInitialized(pushToken)
{
  var pushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");
  //retrieve the tags for the device
  pushNotification.getTags(
    function(tags) {
      console.warn('tags for the device: ' + JSON.stringify(tags));
    },
    function(error) {
      console.warn('get tags error: ' + JSON.stringify(error));
    }
  );

  //example how to get push token at a later time 
  pushNotification.getPushToken(
    function(token)
    {
      console.warn('push token device: ' + token);
    }
  );

  //example how to get Pushwoosh HWID to communicate with Pushwoosh API
  pushNotification.getPushwooshHWID(
    function(token) {
      console.warn('Pushwoosh HWID: ' + token);
    }
  );

  //start geo tracking.
  //pushNotification.startLocationTracking();
};