angular.module('sparkle.controllers',[])

.controller('SplashCtrl',['$state','$http',function($state,$http){

	console.log("Splash Called");
	/*setTimeout(function()
                {
                    $state.go('app.home')
                },1800);*/
}])

.controller('SparkleCtrl',['$scope','$state','$ionicHistory','$ionicSideMenuDelegate','$ionicActionSheet', function($scope,$state,$ionicHistory,$ionicSideMenuDelegate,$ionicActionSheet){
	/*
        Maintaining Preview Views Histories
    */
    
    $ionicHistory.nextViewOptions({
        historyRoot: true,
        disableAnimate: true,
         expire: 300
    });

    
  
    /*
        Menu Events
        Passing State and Sending Go command on to routeConfig 
        
    */
    $scope.events = function(){
        $state.go('app.home');
        console.log('Events');
    };
    $scope.about = function(){
        $state.go('app.about');
        console.log('About Us');
        
    };
    $scope.feedback = function(){
        $state.go('app.feedback');
        console.log('Feedback Form');
    };
    $scope.requestEvent = function(){
        $state.go('app.requestEvent');
        console.log('Event Form');
    };

    $scope.requestService = function(){
        $state.go('app.offerService');
        console.log('Service Form');
    };

    $scope.chat = function(){
        $state.go('app.chat');
        console.log('Chat');
    };

    $scope.share = function(){
        //$state.go('app.search');
        console.log('Share App');
        $ionicActionSheet.show({
      titleText: 'Share App With Friends',
      buttons: [
        { text: '<i class="icon ion-social-facebook"></i> Facebook' },
        { text: '<i class="icon ion-social-twitter"></i> Twitter' },
        { text: '<i class="icon ion-social-googleplus"></i> Google+' },
      ],
      cancelText: 'Cancel',
      cancel: function() {
        console.log('CANCELLED');
      },
      buttonClicked: function(index) {
        console.log('BUTTON CLICKED', index);
        var win
        if(index==0)
        {            
            win = window.open("http://www.facebook.com/sharer/sharer.php?u=http://dreamwood.in/SparkleMedia/download/", '_blank');          
        }
        else if(index==1)
        {            
            win = window.open("https://twitter.com/share?text=http://dreamwood.in/SparkleMedia/download/", '_blank');          
        }
        else if(index==2)
        {            
            win = window.open("https://plus.google.com/share?url=http://dreamwood.in/SparkleMedia/download/", '_blank');          
        }
        win.focus();
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('DESTRUCT');
        return true;
      }
    });
      
    };
}])

.controller('HomeCtrl',['$scope','$location', '$anchorScroll','$timeout','$http','EventService','$ionicLoading','$state','$ionicHistory','$ionicPopup',function($scope,$location, $anchorScroll,$timeout,$http,EventService,$ionicLoading,$state,$ionicHistory,$ionicPopup){
 
     

    /*
        Move to requestEvent State On CLick of Compose Icon
    */
    $scope.requestEvent = function(){
        $state.go('app.requestEvent');
        console.log('Event Form');
    };
    
    /*
        Ionic Loader 
        It Loads Until EventService Return Result
    */
    $ionicLoading.show({
        template: '<img src="img/sparkleLoad.gif"><br>Loading Awesomeness',
        showBackdrop: true
    });
	

	/*
        Fetching Data From EventServie and Store Data in $scope.event variable 
        and also Hide Ionic Loading
    */
    EventService.all().then(function(result){
        $scope.events = result.data;
        console.log($scope.events);
        $ionicLoading.hide();
    },function myError(response) {
        $ionicLoading.hide();
        $ionicPopup.alert({
                      title: 'Sorry',
                      content: 'Bad Request Try Again Later'
                    }).then(function(res) {
                      ionic.Platform.exitApp();
                    });
    });


}])

.controller('AboutCtrl',['$scope','$state','$ionicHistory',function($scope,$state,$ionicHistory){
    
      

    $scope.requestEvent = function(){
        $state.go('app.requestEvent');
        console.log('Event Form');
    };

    $scope.aboutdata = [
        {
            "id":"1",
            "title":"Like Our Facebook Page",
            "link":"https://www.facebook.com/sparklemediaandentertainment",
            "icon":"icon ion-social-facebook",
            "color":"#3b5998"
        },
        {
            "id":"2",
            "title":"Follow Us on Instgram",
            "link":"Follow Us on Twitter",
            "icon":"icon ion-social-instagram-outline",
            "color":""
        },
        {
            "id":"3",
            "title":"Subscribe Our Youtube Channel",
            "link":"https://www.youtube.com/channel/UCihpZk-ru4yHe8VNrgICrdw",
            "icon":"icon ion-social-youtube",
            "color":"#bb0000"
        }
    ];
}])

.controller('EventCtrl',['$scope','$location', '$anchorScroll','$timeout','$ionicModal','$ionicPlatform','$ionicHistory','$http','$stateParams','EventVideoService','EventImageService','$ionicLoading','$state','$ionicPopup',function($scope,$location, $anchorScroll,$timeout,$ionicModal,$ionicPlatform,$ionicHistory,$http,$stateParams,EventVideoService,EventImageService,$ionicLoading,$state,$ionicPopup){

     
    /*
        Move to requestEvent State On CLick of Compose Icon
    */
     $scope.requestEvent = function(){
        $state.go('app.requestEvent');
        
    };
    /*
        Run Spinner Until Server Return Result From Server
    */
    $ionicLoading.show({
        template: '<img src="img/sparkleLoad.gif"><br>Loading Your Videos',
        showBackdrop: true
    });

    //Define ng-show variable value to show and Hide Error Message
    $scope.NoDataFoundVideo = false;
    $scope.NoDataFoundImage = false;
    
    //To Getting EventID from stateParams Variable
    var EventID = $stateParams.eventId;
    
    //Get All Videos From DB
    EventVideoService.all(EventID).then(function(result){
        $scope.videos = result.data;
        
        console.log($scope.videos);
        //To Check Result is there Or Not 
        if($scope.videos.length < 1)
        {
            $scope.NoDataFoundVideo = true;
            $ionicLoading.hide();

        }
        else
        {
            $ionicLoading.hide();
        }
    
    },function myError(response) {
        $ionicLoading.hide();
        $ionicPopup.alert({
                      title: 'Sorry',
                      content: 'Bad Request Try Again Later'
                    }).then(function(res) {
                      ionic.Platform.exitApp();
                    });
    });
    
    
    /*$scope.images = EventImageService.all();
    
    if($scope.images.length < 1)
    {
        $scope.NoDataFoundImage = true;
        //$ionicLoading.hide();

    }*/
    
    EventImageService.all(EventID).then(function(result){
        $scope.images = result.data;
        
        console.log($scope.images);
        //To Check Result is there Or Not 
        if($scope.images.length < 1)
        {
            $scope.NoDataFoundImage = true;
        }
          
    });
  
    //con
  
    /*
        Popup a Modal to Show Image and Video on Transparent 
    */
    $scope.showModal = function(templateUrl) {
        $ionicModal.fromTemplateUrl(templateUrl, {
            scope: $scope,
            animation: 'slide-in-up',
            hardwareBackButtonClose: true
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
            $scope.$on('modal.hidden', function() {
                // Execute action
                $scope.clipSrc = "";
              });
          // Execute action on remove modal
          $scope.$on('modal.removed', function() {
                // Execute action
              $scope.clipSrc = "";
              });
    }
 
    // Close the modal
    $scope.closeModal = function() {
        $scope.modal.hide();
        $scope.modal.remove();
        
        if($scope.clipSrc)
            {
                $scope.clipSrc = "";
            }
    };
    
    // Show Individual Image On CLick of ig
    $scope.showImages = function(id)
    {
        //.log(EventImageService.get(id));
        $scope.OpenImage = EventImageService.get(id);
        $scope.showModal('templates/image-popover.html');
    }
    
    
    $scope.showVideo = function(id) 
    {
        // Setting Defult Values for the Src and Desc of Video 
        
        //console.log(id);
        // Show Only Video Which is CLicked
        for(var i=0; i<$scope.videos.length; i++)
        {
            if($scope.videos[i].id == id)
                {
                    console.log("found");
                    $scope.clipSrc = $scope.videos[i].link;
                    
                    
                    break;

                }
        }


        // Open Model with Specified Template
        $scope.showModal('templates/video-popover.html');
    }


}])

.controller('FeedbackCtrl', ['$scope','$state','$ionicLoading','$ionicPopup','$http','$ionicHistory',function($scope,$state,$ionicLoading,$ionicPopup,$http,$ionicHistory) {
    
      


    $scope.ShowError = false;
    
   

    /*
        Move to requestEvent State On CLick of Compose Icon
    */
    $scope.requestEvent = function(){
        $state.go('app.requestEvent');
        console.log('Event Form');
    };
    
    
    console.log('feedback called');
    
    $scope.feedback = {
        "VisitorName":"",
        "VisitorEmail":"",
        "VisitorMobile":"",
        "VisitorLocation":"",
        "VisitorDesc":""
    }
    
    $scope.addfeedback = function()
    {
        if($scope.feedback.VisitorName == "" || $scope.feedback.VisitorEmail == "" || $scope.feedback.VisitorMobile == "")
        {
            $scope.ShowError = true;
        }
        else
        {
            $scope.ShowError = false;
            console.log($scope.feedback.VisitorName+" "+$scope.feedback.VisitorEmail+" "+$scope.feedback.VisitorMobile+" "+$scope.feedback.VisitorLocation+" "+$scope.feedback.VisitorDesc);
            
            
            $ionicLoading.show(
                { template: 'Getting Your Request .... ', duration: 2000}
            );
    
            $.ajax({
                
                data:
                {
                    feedbackName:$scope.feedback.VisitorName,
                    feedbackEmail:$scope.feedback.VisitorEmail,
                    feedbackMobile:$scope.feedback.VisitorMobile,
                    feedbackMessage:$scope.feedback.VisitorDesc,
                    feedbackLocation:$scope.feedback.VisitorLocation,
                    AMDflag:"0"
                },
                url:'http://podargroup.com/SparkleMedia/setFeedback.php',
                method:'POST',
                success:function(data)
                {
                    $ionicPopup.alert({
                      title: 'Thanks&nbsp;<span class="ion-ios-checkmark" style="color:green"></span>',
                      content: 'Thank You For Your Valuable Feedback!!!'
                    }).then(function(res) {
                      console.log('Thanks');
                    console.log(data);
                        
                        $state.go('app.home');
                    });
                },
                error:function(errr){
                  $ionicPopup.alert({
                      title: 'Sorry !!!',
                      content: 'Your internet connectivity is lost. Try to connect again.'
                    }).then(function(res) {
                      console.log('Try');
                    });
                } 
                });
            
                $ionicLoading.hide();   
        }
    }
    
}])

.controller('RequestEventCtrl', ['$scope','$ionicLoading','$ionicPopup','$state','EventService','$ionicHistory',function($scope,$ionicLoading,$ionicPopup,$state,EventService,$ionicHistory) {
    
 

    $scope.ShowError = false;
    console.log('Request Event called');
    
    /*
        Run Spinner Until Service Return Result From Server
    */    
    $ionicLoading.show({
        template: '<img src="img/sparkleLoad.gif"><br>Wait a Movement',
        showBackdrop: true
    }); 
    
    /*
        Service To Get Data From Server
    */
    EventService.all().then(function(result){
        $scope.events = result.data;
        console.log($scope.events);
        $ionicLoading.hide();
    },function myError(response) {
        $ionicLoading.hide();
        $ionicPopup.alert({
                      title: 'Sorry',
                      content: 'Bad Request Try Again Later'
                    }).then(function(res) {
                      ionic.Platform.exitApp();
                    });
    });
    
    $scope.requestInput = 
        {
        "eventRequestName":"",
        "eventRequestEmail":"",
        "eventRequestMobile":"",
        "eventRequestEvent":"",
        "eventRequestMessage":"",
        "eventRequestLocation":""
    }
    
    $scope.addData = function()
    {
        console.log("Inside Add Data");
        //nsole.log($scope.requestInput.name);
        
        if($scope.requestInput.eventRequestName == "" || $scope.requestInput.eventRequestEmail == "" ||$scope.requestInput.eventRequestMobile == "" || $scope.requestInput.eventRequestEvent == "")
        {
           $scope.ShowError = true;
        }
        else
        {
            console.log($scope.requestInput.eventRequestName+$scope.requestInput.eventRequestMobile+$scope.requestInput.eventRequestEmail);
            $scope.ShowError = false;   
            $ionicLoading.show({
        template: '<img src="img/sparkleLoad.gif"><br>Wait a Movement',
        showBackdrop: true
    }); 
    
            $.ajax({
                
                data:
                {
                    requesterName:$scope.requestInput.eventRequestName,
                    requesterEmail:$scope.requestInput.eventRequestEmail,
                    requesterMobile:$scope.requestInput.eventRequestMobile,
                    requesterMessage:$scope.requestInput.eventRequestMessage,
                    requesterLocation:$scope.requestInput.eventRequestLocation,
                    requestEvent:$scope.requestInput.eventRequestEvent,
                    AMDflag:"1"
                },
                url:'http://podargroup.com/SparkleMedia/setRequestEvent.php',
                method:'POST',
                success:function(data)
                {
                    $ionicPopup.alert({
                      title: 'Thanks&nbsp;<span class="ion-ios-checkmark" style="color:green"></span>',
                      content: 'Submitted Your Request Sparkle Media Team Will Be In Touch With You Very Soon!!!'
                    }).then(function(res) {
                      console.log('Thanks');
                        console.log(data);
                        $state.go('app.home');
                    });
                },
                error:function(errr){
                  $ionicPopup.alert({
                      title: 'Sorry !!!',
                      content: 'Your internet connectivity is lost. Try to connect again.'
                    }).then(function(res) {
                      console.log('Try');
                    });
                } 
                });
            
                $ionicLoading.hide();   
        }

    }
    
}])

.controller('ServicesCtrl', ['$scope','$ionicLoading','$ionicPopup','$state','OfferService','$ionicHistory',function($scope,$ionicLoading,$ionicPopup,$state,OfferService,$ionicHistory) {

     

    $scope.ShowError = false;
    console.log('Request Service called');
    
    /*
        Run Spinner Until Service Return Result From Server
    */    
    $ionicLoading.show({
        template: '<img src="img/sparkleLoad.gif"><br>Wait a Movement',
        showBackdrop: true
    }); 
    
    /*
        Service To Get Data From Server
    */
    OfferService.all().then(function(result){
        $scope.services = result.data;
        console.log($scope.services);
        $ionicLoading.hide();
    },function myError(response) {
        $ionicLoading.hide();
        $ionicPopup.alert({
                      title: 'Sorry',
                      content: 'Bad Request Try Again Later'
                    }).then(function(res) {
                      ionic.Platform.exitApp();
                    });
    });
    
    $scope.requestInput = 
        {
        "serviceRequestName":"",
        "serviceRequestEmail":"",
        "serviceRequestMobile":"",
        "serviceRequestService":"",
        "serviceRequestMessage":"",
        "serviceRequestLocation":""
    }
    
    $scope.addData = function()
    {
        console.log("Inside Add Data");
        //nsole.log($scope.requestInput.name);
        
        if($scope.requestInput.serviceRequestName == "" || $scope.requestInput.serviceRequestEmail == "" ||$scope.requestInput.serviceRequestMobile == "" || $scope.requestInput.serviceRequestService == "")
        {
           $scope.ShowError = true;
        }
        else
        {
            console.log($scope.requestInput.serviceRequestName+$scope.requestInput.serviceRequestMobile+$scope.requestInput.eventRequestEmail);
            $scope.ShowError = false;   
            $ionicLoading.show({
        template: '<img src="img/sparkleLoad.gif"><br>Wait a Movement',
        showBackdrop: true
    }); 
    
            $.ajax({
                
                data:
                {
                    requesterName:$scope.requestInput.serviceRequestName,
                    requesterEmail:$scope.requestInput.serviceRequestEmail,
                    requesterMobile:$scope.requestInput.serviceRequestMobile,
                    requesterMessage:$scope.requestInput.serviceRequestMessage,
                    requesterLocation:$scope.requestInput.serviceRequestLocation,
                    requestService:$scope.requestInput.serviceRequestService,
                    AMDflag:"1"
                },
                url:'http://podargroup.com/SparkleMedia/setRequestService.php',
                method:'POST',
                success:function(data)
                {
                    $ionicPopup.alert({
                      title: 'Thanks&nbsp;<span class="ion-ios-checkmark" style="color:green"></span>',
                      content: 'Submitted Your Request Sparkle Media Team Will Be In Touch With You Very Soon!!!'
                    }).then(function(res) {
                      console.log('Thanks');
                        console.log(data);
                        $state.go('app.home');
                    });
                },
                error:function(errr){
                  $ionicPopup.alert({
                      title: 'Sorry !!!',
                      content: 'Your internet connectivity is lost. Try to connect again.'
                    }).then(function(res) {
                      console.log('Try');
                    });
                } 
                });
            
                $ionicLoading.hide();   
        }

    }
}])


.controller('ChatCtrl',['$scope','$state','$http','$ionicHistory',function($scope,$state,$http,$ionicHistory){



    $scope.requestEvent = function(){
        $state.go('app.requestEvent');
        
    };

    console.log("Chat Called");
    
}])