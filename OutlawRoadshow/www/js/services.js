angular.module('starter.services', [])

 
 .factory('Artists', function($http) {
   var artists = [];
    return {
      getArtists: function(){
        return $http.get("http://songchant.com/outlaw/dev/artists.json").then(function(response){
          artists = response;
          return artists;
          console.log(artists);
        });
      },
      getArtist: function(artistId) {
        for (i = 0; i < artists.length; i++) {
          if (artists[i].id === parseInt(artistId)) {
            return artists[i];
          }
        }
        return null;
      }
    }
 })

  .factory('News', function($http) {
   var news = [];
    return {
      getNews: function(){
        return $http.get("http://songchant.com/outlaw/dev/news.json").then(function(response){
          artists = response;
          return newss;
          console.log(news);
        });
      },
      getNew: function(newId) {
        for (i = 0; i < news.length; i++) {
          if (news[i].id === parseInt(newId)) {
            return news[i];
          }
        }
        return null;
      }
    }
 });
 

 //  return {
 //   all: function() {
  //    return artists;
 //   },
 //   get: function(artistId) {
      // Simple index lookup
//      return artists[artistId];


//.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data -- ideally this will be pulled in from the push notifications -- right now this is clickable to a detail page, not sure that i want to have that functionality?  then we have to deal with a back button etc??
 // var chats = [{
//    id: 0,
//    name: 'theRSL',
//    lastText: 'free pizza at 3pm',
 //   face: 'img/outlawlogo.jpg',
//	time: '3 min ago'
//  }, {
 //   id: 4,
 //   name: 'theRSL',
  //  lastText: 'meow, this is a test to see what happens when there is much text, will it wrap or will it break?  will it go on forever and ever or cut off the text at a certain amount?  Do we want it to cut off?  or do we want Ryan to be able to ramble on and on and on in his push notifications?????',
//    face: 'img/outlawlogo.jpg',
//	time: 'a long time ago'
//  }];

//  return {
//    all: function() {
//      return chats;
//    },
//    remove: function(chat) {
//      chats.splice(chats.indexOf(chat), 1);
 //   },
  //  get: function(chatId) {
    //  for (var i = 0; i < chats.length; i++) {
      //  if (chats[i].id === parseInt(chatId)) {
  //        return chats[i];
  //      }
  //    }
  //    return null;
  //  }
 // }
//})

/**
 * A simple example service that returns some data.
 */
 

 
 
//.factory('Artists', function() {
  // Might use a resource here that returns a JSON array
 // var artists = [{
  //  id: 0,
 //   name: 'Counting Crows',
  //  notes: 'This is where the band bios will go  Counting Crows is the best band ever.  Charlie plays keys and acordion.... he is really cool.  Dan likes to have guitar solos.  Millard is a funny dude. ',
  //  face: 'img/countingcrows.jpg',
//	day: 'Fri',
//	time: '3:30pm',
//	url: 'http://www.countingcrows.com',
//	mp3: 'http://open.spotify.com/track/4quTOp1baRORMoFkmFDnyN',
//	mp3name: 'Elvis Went To Hollywood'
//  }, { 
 //   id: 1,
//    name: 'K Phillips and the Concho Pearls',
  //  notes: 'Local greats',
//    face: 'img/kphillips.jpg',
//	day: 'Fri',
//	time: '3:30pm',
//	url: 'http://kphillipsmusic.com',
//	mp3: 'http://open.spotify.com/track/3Cpcwzwp6L5f1jgCYtlo7q',
//	mp3name: 'Kats Song (What I cant have)'

//  }];


//  return {
 //   all: function() {
  //    return artists;
 //   },
 //   get: function(artistId) {
      // Simple index lookup
//      return artists[artistId];
 //   }
//  }
// });
