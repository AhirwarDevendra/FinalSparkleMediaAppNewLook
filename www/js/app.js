// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('sparkle', ['ionic','sparkle.controllers','sparkle.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$sceDelegateProvider) {
    
  $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);
  $stateProvider
  .state('splash',{
    url:'/splash',
    templateUrl:'templates/splash.html',
    controller:'SplashCtrl'
  })
 
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'SparkleCtrl'
  })

  .state('app.home', {
    url: "/home",
    views: {
      'menuContent' :{
        templateUrl: "templates/home.html",
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.feedback', {
      url: "/feedback",
      views: {
        'menuContent' :{
          templateUrl: "templates/feedback.html",
          controller: 'FeedbackCtrl'
        }
      }
    })
  
    .state('app.requestEvent', {
      url: "/requestEvent",
      views: {
        'menuContent' :{
          templateUrl: "templates/event-request.html",
          controller: 'RequestEventCtrl'
        }
      }
    })

    .state('app.chat', {
      url: "/chat",
      views: {
        'menuContent' :{
          templateUrl: "templates/chat.html",
          controller: 'ChatCtrl'
        }
      }
    })

  
    .state('app.about', {
      url: "/about",
      views: {
        'menuContent' :{
          templateUrl: "templates/about.html",
          controller: 'AboutCtrl'
        }
      }
    })

    .state('app.offerService', {
      url: "/offerService",
      views: {
        'menuContent' :{
          templateUrl: "templates/services.html",
          controller: 'ServicesCtrl'
        }
      }
    })

  
    .state('app.event', {
      url: "/event/:eventId",
      views: {
        'menuContent' :{
          templateUrl: "templates/events.html",
          controller: 'EventCtrl'
        }
      }
    })

  $urlRouterProvider.otherwise('/splash');
    
    //Defining Title of App Center
    //$ionicConfigProvider.navBar.alignTitle('center');

})