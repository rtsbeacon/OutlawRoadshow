 function Main() {
  if(typeof(cordova)=="undefined") {
    _msgbox_confirm("This sample will only run if compiled using PhoneGap Build and run as a native app.");
     return;
  }
  document.addEventListener("deviceready" , initPushwoosh, True);
  document.addEventListener("push-notification" , notificationReceived);
}

function notificationReceived(event) {
 var message;
  message=event.notification.message;
  _msgbox_confirm("message:"  +  message);
}

function initPushwoosh() {
 var pushNotification = window.plugins.pushNotification;
  pushNotification.onDeviceReady();
  pushNotification.registerDevice({projectid:"234816071019" , appid:"E6C7C-212AB"}, initSuccess, initFail);
}

function initSuccess(status) {
  msg("push token: "  +  status);
}

function initFail(status) {
  msg(JSON.stringify("failed to register "  +  status));
}

function msg(s) {
  txtLog.text=s  +  '\n'  +  txtLog.text;
}